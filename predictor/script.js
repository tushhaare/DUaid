document.getElementById("predictorForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const score = parseInt(document.getElementById("cuetScore").value);
    const course = document.getElementById("course").value.trim();
    const category = document.getElementById("category").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "Loading...";

    // Your Google Sheet published as CSV URL
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTDyRT1GXI6Vks97E0Aa-6LEwbMfplDjrmJ-wzYVFZH-WSbOLdUHGajH9CuxVbQiBQanJY8lKiV4nvl/pub?output=csv";

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            const data = csvToArray(csvText);

            // Filter by course first
            const filteredByCourse = data.filter(row => row.Course && row.Course.trim() === course);

            // Map and filter by category cutoff and difference <= 5
            const eligible = filteredByCourse.map(row => {
                const cutoff = parseInt(row[category]);
                const diff = Math.abs(score - cutoff);
                return { ...row, cutoff, diff };
            }).filter(row => !isNaN(row.cutoff) && row.diff <= 5);

            eligible.sort((a, b) => a.diff - b.diff);

            if (eligible.length === 0) {
                resultDiv.innerText = "❌ No colleges found near your score. Try adjusting course or category.";
                return;
            }

            let output = `🎯 Colleges matching your score (CUET ${score}, Course: ${course}, Category: ${category}):\n\n`;
            eligible.slice(0, 5).forEach((row, i) => {
                output += `${i + 1}. ${row.College} — Cutoff: ${row.cutoff}\n`;
            });

            resultDiv.innerText = output;
        })
        .catch(err => {
            console.error(err);
            resultDiv.innerText = "Error loading data. Please try again later.";
        });
});

// Helper function: CSV string to array of objects
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
