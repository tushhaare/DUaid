document.getElementById('search-bar').addEventListener('input', function () {
    const query = this.value.toLowerCase(); // Get the input and convert to lowercase
    const resultsContainer = document.getElementById('results'); // Get the results container
    resultsContainer.innerHTML = ''; // Clear previous results

    // Fetch the search index
    fetch('/search.json')
        .then(response => response.json()) // Parse the JSON file
        .then(data => {
            // Filter the search index based on the query
            const results = data.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );

            // Display the results
            results.forEach(result => {
                const listItem = document.createElement('li'); // Create a list item
                listItem.innerHTML = `<a href="${result.url}">${result.title}</a> - ${result.description}`;
                resultsContainer.appendChild(listItem); // Add it to the results container
            });

            if (results.length === 0 && query) {
                resultsContainer.innerHTML = '<li>No results found</li>';
            }
        });
});
