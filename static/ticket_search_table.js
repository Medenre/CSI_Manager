document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    


    const searchInput = document.getElementById('searchInput');
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th.sortable');
    let currentSort = { column: 'date', direction: 'desc' };

    // Fonction de recherche
    searchInput.addEventListener('input', function(event) {
        const searchText = event.target.value.toLowerCase();
        filterTickets(searchText);
    });

    function filterTickets(searchText) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(function(row) {
            const ticketData = row.textContent.toLowerCase();
            row.style.display = ticketData.includes(searchText) ? '' : 'none';
        });
    }

    // Fonction de tri
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.sort;
            const direction = currentSort.column === column && currentSort.direction === 'asc' ? 'desc' : 'asc';
            sortTable(column, direction);
            updateSortIcons(header, direction);
            currentSort = { column, direction };
        });
    });

    function sortTable(column, direction) {
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const sortedRows = rows.sort((a, b) => {
            let aValue, bValue;
            if (column === 'date') {
                const aDate = a.querySelector(`td:nth-child(${getColumnIndex(column)})`).dataset.date;
                const bDate = b.querySelector(`td:nth-child(${getColumnIndex(column)})`).dataset.date;
                aValue = parseDate(aDate);
                bValue = parseDate(bDate);
            } else {
                aValue = a.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
                bValue = b.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
            }
            
            if (column === 'date') {
                return direction === 'desc' ? bValue - aValue : aValue - bValue;
            } else {
                return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        });
        table.querySelector('tbody').append(...sortedRows);
    }

    function parseDate(dateString) {
        const [day, month, year] = dateString.split('-');
        return new Date(year, month - 1, day);
    }

    function getColumnIndex(column) {
        return Array.from(headers).findIndex(header => header.dataset.sort === column) + 1;
    }

    function updateSortIcons(clickedHeader, direction) {
        headers.forEach(header => {
            header.querySelector('.icon-arrow').textContent = '↕';
        });
        clickedHeader.querySelector('.icon-arrow').textContent = direction === 'asc' ? '↑' : '↓';
    }

    // Tri initial par date (le plus récent en premier)
    sortTable('date', 'desc');
    updateSortIcons(document.querySelector('th[data-sort="date"]'), 'desc');

});
