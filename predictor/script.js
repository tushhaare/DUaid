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

           fetch("https://api.airtable.com/v0/yxB42dVfd0aXFj/cuet_data", {
        method: "POST",
        headers: {
            "Authorization": "patsOAw0H925qdpDU.65a340b2bf5f406dcf9acfaefb700fd010d0e7ff45e5cedf175e6c900e7d628b",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fields: {
                "Name": name,
                "Score": score,
                "Course": course,
                "Category": category,
                "Gender": gender
            }
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("✅ Saved to Airtable:", data);
        alert("Your data has been submitted successfully!");
    })
    .catch(error => {
        console.error("❌ Error saving to Airtable:", error);
        alert("Something went wrong. Try again later.");
    });
});
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
