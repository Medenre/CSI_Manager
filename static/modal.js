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