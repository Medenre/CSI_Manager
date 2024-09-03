document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPageSelect = document.getElementById('itemsPerPage');
    const paginationContainer = document.getElementById('pagination');
    const ticketTable = document.querySelector('.tab-pane.active table');
    let currentPage = 1;
    let itemsPerPage = 10;

    function updatePagination() {
        const rows = Array.from(ticketTable.querySelectorAll('tbody tr'));
        const totalPages = Math.ceil(rows.length / itemsPerPage);

        // Afficher les éléments de la page actuelle
        rows.forEach((row, index) => {
            row.style.display = (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) ? '' : 'none';
        });

        // Mettre à jour les boutons de pagination
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            if (i === currentPage) {
                li.classList.add('active');
            }
            const a = document.createElement('a');
            a.classList.add('page-link');
            a.href = '#';
            a.textContent = i;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                updatePagination();
            });
            li.appendChild(a);
            paginationContainer.appendChild(li);
        }
    }

    itemsPerPageSelect.addEventListener('change', function() {
        itemsPerPage = parseInt(this.value);
        currentPage = 1;
        updatePagination();
    });

    updatePagination();
});