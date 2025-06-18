const sheetID = "YOUR_SHEET_ID_HERE";

function fetchCollegeData(score, category, course) {
  Tabletop.init({
    key: sheetID,
    simpleSheet: true,
    callback: function(data) {
      const matches = data.filter(row => row.Course === course && row[category]);
      const eligible = matches.filter(row => parseInt(score) >= parseInt(row[category]));

      let result = "";
      if (eligible.length > 0) {
        result += `Colleges you might get in ${course}:\n\n`;
        eligible.forEach(row => {
          result += `🏛 ${row.College} (Cutoff: ${row[category]})\n`;
        });
      } else {
        result = "No colleges found with your current score and category.";
      }

      document.getElementById("result").innerText = result;
    }
  });
}

document.getElementById("predictorForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const score = document.getElementById("cuetScore").value;
  const course = document.getElementById("course").value;
  const category = document.getElementById("category").value;

  fetchCollegeData(score, category, course);
});
