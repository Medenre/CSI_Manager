        // Récupérer les données passées par Flask
        let openTickets = parseInt("{{ open_tickets }}");
        let closedTickets = parseInt("{{ closed_tickets }}");
        let inProgressTickets = parseInt("{{ in_progress_tickets }}");
        let resolvedTickets = parseInt("{{ resolved_tickets }}");

        // Créer un tableau de données
        let data = {
            labels: ['Ouverts', 'Fermés', 'En cours', 'Clôturés'],
            datasets: [{
                data: [openTickets, closedTickets, inProgressTickets, resolvedTickets],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        };

        // Configuration du diagramme
        let options = {
            cutoutPercentage: 70, // Pourcentage du rayon intérieur (0-100)
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let dataset = data.datasets[tooltipItem.datasetIndex];
                        let total = dataset.data.reduce((previousValue, currentValue, currentIndex, array) => {
                            return previousValue + currentValue;
                        });
                        let currentValue = dataset.data[tooltipItem.index];
                        let percentage = Math.floor(((currentValue / total) * 100) + 0.5);         
                        return percentage + "%";
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
            
        };

        // Sélectionnez l'élément canvas
        let canvas = document.getElementById('pieChart');

        // Modifiez la taille du canvas
        canvas.width = 400; // Nouvelle largeur
        canvas.height = 350; // Nouvelle hauteur

        // Création du diagramme
        let ctx = canvas.getContext('2d');
        let myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });