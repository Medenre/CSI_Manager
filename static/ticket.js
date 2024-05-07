document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.form-control');

    searchBar.addEventListener('input', function(event) {
        const searchText = event.target.value.toLowerCase();
        filterTickets(searchText);
    });
});
        function filterTickets(searchText) {
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach(function(row) {
            const ticketData = row.textContent.toLowerCase();
            if (ticketData.includes(searchText)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }