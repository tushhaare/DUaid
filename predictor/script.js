
document.getElementById("predictorForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const score = parseInt(document.getElementById("cuetScore").value);
    const course = document.getElementById("course").value;
    const category = document.getElementById("category").value;

    let resultText = "Prediction not available.";

    if (score > 700 && category === "SC") {
        resultText = `You have a good chance of getting ${course} at Hindu College or Hansraj.`;
    } else if (score > 600) {
        resultText = `You might get admission to mid-tier DU colleges for ${course}.`;
    } else {
        resultText = `Chances are lower. Consider off-campus or reserved seats if applicable.`;
    }

    document.getElementById("result").innerText = resultText;
});
