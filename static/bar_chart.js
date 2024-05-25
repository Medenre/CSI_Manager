// Récupérer les données des tickets par mois passées par Flask pour le graphique à barres
const ticketsByMonth = JSON.parse(document.getElementById('tickets_by_month').innerText);

// Vérifier si les données sont correctement récupérées
console.log(ticketsByMonth);

// Définir les couleurs alternées pour les barres
const barColors = Object.values(ticketsByMonth).map((_, index) => index % 2 === 0 ? '#36A2EB' : '#4BC0C0');

// Vérifier les couleurs générées
console.log(barColors);

// Configuration du graphique à barres
const barData = {
    labels: Object.keys(ticketsByMonth),
    datasets: [{
        label: 'Nombre de tickets',
        data: Object.values(ticketsByMonth),
        backgroundColor: barColors
    }]
};

// Vérifier les données du graphique
console.log(barData);

const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Nombre de tickets par mois',
            font: {
                size: 20
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// Sélectionnez l'élément canvas pour le graphique à barres
let barCanvas = document.getElementById('barChart');
let barCtx = barCanvas.getContext('2d');

// Création du graphique à barres
const myBarChart = new Chart(barCtx, {
    type: 'bar',
    data: barData,
    options: barOptions
});
