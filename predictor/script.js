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
            const courseFiltered = data.filter(row => row.Course && row.Course.trim() === course);

            let eligible = courseFiltered.map(row => {
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

            // If less than 3, add fallback entries below score
            if (eligible.length < 3) {
                const fallback = courseFiltered
                    .map(row => {
                        const cutoff = parseFloat(row[category]);
                        return { ...row, cutoff, diff: score - cutoff };
                    })
                    .filter(row =>
                        !isNaN(row.cutoff) &&
                        row.cutoff < score &&
                        !(gender === "Male" && row.College.includes("(W)")) &&
                        !eligible.some(e => e.College === row.College) // avoid duplicates
                    )
                    .sort((a, b) => b.cutoff - a.cutoff); // closest lower first

                eligible = [...eligible, ...fallback].slice(0, 5);
            }

            if (eligible.length === 0) {
                resultDiv.innerText = "❌ No colleges found. Try changing course or category.";
                return;
            }

            let output = "";
            eligible.forEach((row, i) => {
                output += `${i + 1}. ${row.College} — Cutoff: ${row.cutoff}\n`;
            });

            resultDiv.innerText = output;

            // Optional logging to Google Sheet
            fetch("https://script.google.com/macros/s/AKfycbxWlEhSYiybR49U-WdjAIEaACt_49N1twBRwZRzvQbOTKVvf3nf0_SwTyXUsTSxv76rJg/exec", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    score: score,
                    course: course,
                    category: category,
                    gender: gender
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        })
        .catch(err => {
            console.error(err);
            resultDiv.innerText = "⚠️ Error loading data. Try again later.";
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
