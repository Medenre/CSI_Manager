// quickchart-js https://github.com/typpo/quickchart-js

const QuickChart = require('quickchart-js');

const chart = new QuickChart();

chart.setWidth(500)
chart.setHeight(300);
chart.setVersion('2.9.4');

chart.setConfig({
  type: 'doughnut',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [50, 60, 70, 180, 190],
      },
    ],
  },
  options: {
    plugins: {
      datalabels: {
        display: true,
        backgroundColor: '#ccc',
        borderRadius: 3,
        font: {
          color: 'red',
          weight: 'bold',
        },
      },
      doughnutlabel: {
        labels: [
          {
            text: '550',
            font: {
              size: 20,
              weight: 'bold',
            },
          },
          {
            text: 'total',
          },
        ],
      },
    },
  },
});

// Print the chart URL
console.log(chart.getUrl());

// Get the image...
const image = await chart.toBinary();

// Or write it to a file
chart.toFile('chart.png');