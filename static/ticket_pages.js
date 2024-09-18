document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPageSelect = document.getElementById('itemsPerPage');
    const paginationContainer = document.getElementById('pagination');
    const ticketTable = document.querySelector('.tab-pane.active table');
    let currentPage = 1;
    let itemsPerPage = 100; // Définir à 100 par défaut

    function updatePagination() {
        const rows = Array.from(ticketTable.querySelectorAll('tbody tr'));
        const totalPages = Math.ceil(rows.length / itemsPerPage);

        // Afficher les éléments de la page actuelle
        rows.forEach((row, index) => {
            row.style.display = (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) ? '' : 'none';
        });

        // Mettre à jour les boutons de pagination
        paginationContainer.innerHTML = '';
        
        // Ajouter les boutons de page
        const maxVisiblePages = 7;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            paginationContainer.appendChild(createPageButton(1));
            if (startPage > 2) {
                paginationContainer.appendChild(createEllipsis());
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationContainer.appendChild(createPageButton(i));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationContainer.appendChild(createEllipsis());
            }
            paginationContainer.appendChild(createPageButton(totalPages));
        }
    }

    function createPageButton(pageNumber) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (pageNumber === currentPage) {
            li.classList.add('active');
        }
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = pageNumber;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = pageNumber;
            updatePagination();
        });
        li.appendChild(a);
        return li;
    }

    function createEllipsis() {
        const li = document.createElement('li');
        li.classList.add('page-item', 'disabled');
        const span = document.createElement('span');
        span.classList.add('page-link');
        span.textContent = '...';
        li.appendChild(span);
        return li;
    }

    itemsPerPageSelect.addEventListener('change', function() {
        itemsPerPage = parseInt(this.value);
        currentPage = 1;
        updatePagination();
    });

    // Définir la valeur par défaut du select à 100
    itemsPerPageSelect.value = '100';

    updatePagination();
});