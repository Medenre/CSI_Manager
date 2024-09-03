document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    const tabContent = document.getElementById('ticketTabContent');
    const modal = new bootstrap.Modal(document.getElementById('ticketModal'));

    // Fonction pour charger les détails du ticket
    function loadTicketDetails(ticketId) {
        document.querySelector('#ticketModal .modal-body').innerHTML = `Chargement des détails pour le ticket ${ticketId}...`;
        modal.show();
        
        fetch(`/ticket/${ticketId}`)
            .then(response => response.json())
            .then(ticket => {
                document.querySelector('#ticketModal .modal-body').innerHTML = `
                    <h4>Ticket #${ticket.id}</h4>
                    <p><strong>Utilisateur:</strong> ${ticket.username}</p>
                    <p><strong>Localisation:</strong> ${ticket.location}</p>
                    <p><strong>Sujet:</strong> ${ticket.title}</p>
                    <p><strong>Date:</strong> ${ticket.date}</p>
                    <p><strong>Statut:</strong> ${ticket.status}</p>
                    <p><strong>Description:</strong> ${ticket.description}</p>
                `;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des détails du ticket:', error);
                document.querySelector('#ticketModal .modal-body').innerHTML = 'Une erreur est survenue lors du chargement des détails du ticket.';
            });
    }

    // Utilisation de la délégation d'événements pour gérer les clics sur les lignes de tous les onglets
    tabContent.addEventListener('click', function(event) {
        const row = event.target.closest('tr');
        if (!row) return; // Clic en dehors d'une ligne

        // Empêcher la propagation de l'événement pour éviter d'interférer avec d'autres éléments
        event.stopPropagation();
        
        const ticketId = row.cells[0].textContent; // Supposant que l'ID est dans la première cellule
        loadTicketDetails(ticketId);
    });
});