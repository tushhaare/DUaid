document.getElementById('search-bar').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  // Use a relative path for search.json
  fetch('./search.json') // './' ensures it works on GitHub Pages
    .then(response => {
      if (!response.ok) throw new Error('Failed to load JSON');
      return response.json(); // Parse JSON data
    })
    .then(data => {
      const results = data.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        resultsContainer.innerHTML = '<li>No results found</li>';
      } else {
        results.forEach(result => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<a href="${result.url}">${result.title}</a> - ${result.description}`;
          resultsContainer.appendChild(listItem);
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultsContainer.innerHTML = '<li>Failed to load search data</li>';
    });
});
