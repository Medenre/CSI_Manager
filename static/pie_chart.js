// Récupérer les données passées par Flask
const openTickets = document.getElementById('open_tickets').innerText;
const closedTickets = document.getElementById('closed_tickets').innerText;
const inProgressTickets = document.getElementById('in_progress_tickets').innerText;
const resolvedTickets = document.getElementById('resolved_tickets').innerText;

// Créer un tableau de données
let data = {
    labels: ['Ouverts', 'Fermés', 'En cours', 'Clôturés'],
    datasets: [{
        data: [openTickets, closedTickets, inProgressTickets, resolvedTickets],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0']
    }]
};

// Configuration du diagramme
let options = {
    cutout: 50,
    plugins: {
        legend: {
            display: true,
            position: "left",
            align: "center",
            labels:{
                boxHeight:20,
                maxHeight: 30,
            }        
        },
        title: {
            display: true,
            position: "top",
            text: "Tickets",
            padding: {
                top: 5,
                bottom: 10
            },
            font:{
                size:30,
            }  
        },
        textInside: {
            text: "Total: " + (parseInt(openTickets) + parseInt(closedTickets) + parseInt(inProgressTickets) + parseInt(resolvedTickets)),
            color: 'black',
            fontSize: 20
        }
    }
};

const textInsidePlugin = {
    id: 'textInside',
    afterDatasetsDraw: function (chart, _) {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
        const fontSize = options.plugins.textInside.fontSize;
        ctx.font = fontSize + 'px Arial';
        ctx.fillStyle = options.plugins.textInside.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = options.plugins.textInside.text;
        const textX = 257//Math.round(width / 2);
        const textY = 132//Math.round(height / 2);
        ctx.fillText(text, textX, textY);
    }
};

// Sélectionnez l'élément canvas
let canvas = document.getElementById('pieChart');

// Création du diagramme
const ctx = canvas.getContext('2d');
const myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options,
    plugins: [textInsidePlugin], // Appliquez le plugin spécifique ici
});
