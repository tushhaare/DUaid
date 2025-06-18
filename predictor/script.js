document.getElementById("predictorForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const score = parseInt(document.getElementById("cuetScore").value);
    const course = document.getElementById("course").value.trim();
    const category = document.getElementById("category").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "Loading...";

    Tabletop.init({
        key: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTDyRT1GXI6Vks97E0Aa-6LEwbMfplDjrmJ-wzYVFZH-WSbOLdUHGajH9CuxVbQiBQanJY8lKiV4nvl/pubhtml",
        simpleSheet: true,
        callback: function(data) {
            const matches = data.filter(row => row.Course && row.Course.trim() === course && row[category]);

            const eligible = matches.map(row => {
                const cutoff = parseInt(row[category]);
                const diff = Math.abs(score - cutoff);
                return { ...row, cutoff: cutoff, diff: diff };
            }).filter(row => !isNaN(row.cutoff) && row.diff <= 5);

            eligible.sort((a, b) => a.diff - b.diff);

            if (eligible.length === 0) {
                resultDiv.innerText = "❌ No colleges found near your score. Try adjusting course or category.";
                return;
            }

            let output = `🎯 Colleges matching your score (CUET ${score}, Category: ${category}):\n\n`;
            eligible.slice(0, 5).forEach((row, i) => {
                output += `${i + 1}. ${row.College} — Cutoff: ${row.cutoff}\n`;
            });

            resultDiv.innerText = output;
        }
    });
});
