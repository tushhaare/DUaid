document.getElementById("predictorForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const score = parseFloat(document.getElementById("cuetScore").value);
    const course = document.getElementById("course").value.trim();
    const category = document.getElementById("category").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "Loading...";

    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTDyRT1GXI6Vks97E0Aa-6LEwbMfplDjrmJ-wzYVFZH-WSbOLdUHGajH9CuxVbQiBQanJY8lKiV4nvl/pub?output=csv";

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            const data = csvToArray(csvText);

            const filteredByCourse = data.filter(row => row.Course && row.Course.trim() === course);

            const eligible = filteredByCourse.map(row => {
                const cutoff = parseFloat(row[category]);
                const diff = Math.abs(score - cutoff);
                return { ...row, cutoff, diff };
            }).filter(row =>
                !isNaN(row.cutoff) &&
                row.cutoff >= (score - 10) &&
                row.cutoff <= (score + 10) &&
                !(gender === "Male" && row.College.includes("(W)"))
            );

            eligible.sort((a, b) => a.diff - b.diff);

            if (eligible.length > 0) {
                let output = "";
                eligible.slice(0, 5).forEach((row, i) => {
                    output += `${i + 1}. ${row.College} — Cutoff: ${row.cutoff}\n`;
                });
                resultDiv.innerText = output;
                return;
            }

            // Fallback for closest lower match
            const fallback = filteredByCourse
                .map(row => {
                    const cutoff = parseFloat(row[category]);
                    const diff = score - cutoff;
                    return { ...row, cutoff, diff };
                })
                .filter(row =>
                    !isNaN(row.cutoff) &&
                    row.cutoff <= score &&
                    !(gender === "Male" && row.College.includes("(W)"))
                )
                .sort((a, b) => b.cutoff - a.cutoff);

            if (fallback.length > 0) {
                const nearest = fallback[0];
                resultDiv.innerText = `⚠️ No close match in ±10 range.\nClosest below your score:\n${nearest.College} — Cutoff: ${nearest.cutoff}`;
                return;
            }

            resultDiv.innerText = "❌ No colleges found. Try adjusting course, category or check your details.";
        })
        .catch(err => {
            console.error(err);
            resultDiv.innerText = "Error loading data. Please try again later.";
        });
});

// CSV parser
function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter).map(h => h.trim());
    const rows = str.slice(str.indexOf("\n") + 1).split("\n").filter(r => r.trim() !== "");

    return rows.map(row => {
        const values = row.split(delimiter);
        return headers.reduce((obj, header, i) => {
            obj[header] = values[i] ? values[i].trim() : "";
            return obj;
        }, {});
    });
}
