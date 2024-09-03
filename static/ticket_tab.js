// Gestion des onglets
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('#ticketTabs .nav-link');
    const tabContents = document.querySelectorAll('#ticketTabContent .tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les onglets et contenus
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('show', 'active'));
            
            // Ajouter la classe active à l'onglet cliqué et au contenu correspondant
            this.classList.add('active');
            const target = document.querySelector(this.getAttribute('href'));
            target.classList.add('show', 'active');
        });
    });
});