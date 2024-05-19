document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;

        if (query.length > 0) {
            fetch(`/search?query=${query}`)
                .then(response => response.json())
                .then(data => {
                    resultsContainer.innerHTML = '';
                    if (data.results.length > 0) {
                        const ul = document.createElement('ul');
                        data.results.forEach(filename => {
                            const li = document.createElement('li');
                            li.textContent = filename;
                            li.addEventListener('click', () => {
                                window.location.href = `/download/${filename}`;
                            });
                            ul.appendChild(li);
                        });
                        resultsContainer.appendChild(ul);
                        resultsContainer.style.display = 'block';
                    } else {
                        resultsContainer.style.display = 'none';
                    }
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    resultsContainer.style.display = 'none';
                });
        } else {
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';
        }
    });

    document.addEventListener('click', (event) => {
        if (!resultsContainer.contains(event.target) && event.target !== searchInput) {
            resultsContainer.style.display = 'none';
        }
    });
});
