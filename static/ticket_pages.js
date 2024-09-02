document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table');
    const tbody = document.getElementById('ticketTableBody');
    const pagination = document.getElementById('pagination');
    const itemsPerPageSelect = document.getElementById('itemsPerPage');
    const searchInput = document.getElementById('searchInput');
    let currentPage = 1;
    let itemsPerPage = parseInt(itemsPerPageSelect.value);
    let filteredRows = [];

    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const rows = tbody.querySelectorAll('tr');
        
        rows.forEach((row, index) => {
            if (filteredRows.length > 0) {
                row.style.display = filteredRows.includes(row) && index >= start && index < end ? '' : 'none';
            } else {
                row.style.display = index >= start && index < end ? '' : 'none';
            }
        });

        updatePagination();
    }

    function updatePagination() {
        const rowCount = filteredRows.length > 0 ? filteredRows.length : tbody.querySelectorAll('tr').length;
        const pageCount = Math.ceil(rowCount / itemsPerPage);
        pagination.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${currentPage === i ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                showPage(currentPage);
            });
            pagination.appendChild(li);
        }
    }

    itemsPerPageSelect.addEventListener('change', function() {
        itemsPerPage = parseInt(this.value);
        currentPage = 1;
        showPage(currentPage);
    });

    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const rows = tbody.querySelectorAll('tr');
        filteredRows = Array.from(rows).filter(row => 
            row.textContent.toLowerCase().includes(searchText)
        );
        currentPage = 1;
        showPage(currentPage);
    });
    showPage(currentPage);
});