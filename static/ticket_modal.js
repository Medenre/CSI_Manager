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
                    <div class="d-flex">
                        <div class="p-2 w-50">
                            <h4 class="mb-4">Ticket #${ticket.id}</h4>
                            <p><strong>Utilisateur:</strong> ${ticket.username}</p>
                            <p><strong>Localisation:</strong> ${ticket.location}</p>
                            <p><strong>Sujet:</strong> ${ticket.title}</p>
                            <p><strong>Date:</strong> ${ticket.date}</p>
                            <p><strong>Statut:</strong> ${ticket.status}</p>
                            <p><strong>Description:</strong> ${ticket.description}</p>
                        </div>
                        
                        <div class="p-2 w-75">
                            <p><strong>Solution:</strong>
                            <textarea class="form-control" aria-label="With textarea"></textarea>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des détails du ticket:', error);
                document.querySelector('#ticketModal .modal-body').innerHTML = 'Une erreur est survenue lors du chargement des détails du ticket.';
            });
    }

    // Utilisation de la délégation d'événements pour gérer les clics sur les lignes de tous les onglets
    tabContent.addEventListener('click', function(event) {
        // Vérifier si le clic est sur un en-tête de colonne ou un élément à l'intérieur
        if (event.target.closest('th')) {
            // Le clic est sur un en-tête ou un élément à l'intérieur, ne rien faire ici
            // La logique de tri sera gérée par votre autre script
            return;
        }
        
        const row = event.target.closest('tr');
        
        // Si ce n'est pas une ligne de ticket (par exemple, un clic dans le thead), on sort
        if (!row || row.closest('thead')) return;

        // Empêcher la propagation de l'événement
        event.stopPropagation();
        
        const ticketId = row.cells[0].textContent; // Supposant que l'ID est dans la première cellule
        loadTicketDetails(ticketId);
    });
});