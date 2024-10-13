function showContent() {
    const paperSelect = document.getElementById("paperSelect").value;
    const driveFrame = document.getElementById("driveFrame");
    const loadingMessage = document.getElementById("loadingMessage");

    if (paperSelect === "") {
        alert("Please select a paper.");
    } else {
        // Show loading message and hide the iframe while loading
        loadingMessage.style.display = "block";
        driveFrame.style.display = "none";

        // Simulate loading and set iframe source
        setTimeout(() => {
            loadingMessage.style.display = "none";
            driveFrame.src = paperSelect;
            driveFrame.style.display = "block";
        }, 500); // Simulated delay (500ms)
    }
}
