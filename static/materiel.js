// AJOUTER DU MATERIEL

// Récupérer le modal
var modal = document.getElementById('addMaterialModal');
      
// Récupérer le bouton qui ouvre le modal
var btn = document.getElementById("addMaterialButton");

// Récupérer l'élément span qui ferme le modal
var span = document.getElementById("btn_close");

// Quand l'utilisateur clique sur le bouton, ouvrir le modal
btn.onclick = function() {
    modal.style.display = "block";
}

// Quand l'utilisateur clique sur <span> (x), fermer le modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quand l'utilisateur clique n'importe où en dehors du modal, fermer le modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// UPDATE MATERIEL
document.addEventListener('DOMContentLoaded', function() {
    const modifMaterialButton = document.getElementById('modifMaterialButton');

    // Ajoutez un gestionnaire d'événements clic au bouton de modification
    modifMaterialButton.addEventListener('click', function() {
        // Récupérez la ligne sélectionnée (avec le radio check)
        const selectedRow = document.querySelector('input[name="selectedRow"]:checked');

        if (selectedRow) {
            // Récupérez les données de la ligne sélectionnée
            const row = selectedRow.closest('tr');
            const id = row.cells[1].textContent;
            const designation = row.cells[2].textContent;
            const marque = row.cells[3].textContent;
            const modele = row.cells[4].textContent;
            const mac = row.cells[5].textContent;
            const ip = row.cells[6].textContent;
            const network = row.cells[7].textContent;
            const location = row.cells[8].textContent;
            const username = row.cells[9].textContent;

            // Remplissez les champs du formulaire dans le modal avec ces données
            document.getElementById('materialId2').textContent = id;
            document.getElementById('materialId').value = id;
            document.getElementById('materialName').value = designation;
            document.getElementById('materialMarque').value = marque;
            document.getElementById('materialModele').value = modele;
            document.getElementById('materialMac').value = mac;
            document.getElementById('materialIp').value = ip;
            document.getElementById('materialNetwork').value = network;
            document.getElementById('materialLocation').value = location;
            document.getElementById('materialUsername').value = username;

            // Ouvrez le modal
            const myModal = new bootstrap.Modal(document.getElementById('modifMaterialModal'));
            myModal.show();
        } else {
            // Aucune ligne sélectionnée, affichez un message d'erreur ou faites autre chose
            console.log('Aucune ligne sélectionnée.');
        }
    });
});


