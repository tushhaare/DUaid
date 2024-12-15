console.log("JavaScript is loaded!");

// Add a simple test for interaction
document.getElementById('search-bar').addEventListener('input', function () {
  console.log("Input value:", this.value);
  document.getElementById('results').innerHTML = `<li>Searching for: ${this.value}</li>`;
});
