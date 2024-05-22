// Fonction pour définir la date actuelle dans le champ de date
function setCurrentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2); // Mois de 0-11, donc +1 et pad avec zéro
    var day = ('0' + today.getDate()).slice(-2); // Pad avec zéro
    var currentDate = year + '-' + month + '-' + day;

    document.getElementById('dateInput').value = currentDate;
}

// Appeler la fonction pour définir la date actuelle lorsque la page est chargée
window.onload = setCurrentDate;