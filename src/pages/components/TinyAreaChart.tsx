import React from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const TinyAreaChart = ({ data, height }) => {
  const chartRef = React.useRef();
  const chartInstance = React.useRef(null);

  React.useEffect(() => {
    if (chartRef.current && data.length > 0) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart instance
      // Create new chart instance
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line', // Line chart type which can be used for area charts
        data: {
          labels: Array.from({ length: data.length }, (_, i) => ''),
          datasets: [
            {
              label: 'Token Balance',
              data: data,
              backgroundColor: 'rgba(206, 212, 218, 0.4)', // Color for the area under the line
              borderColor: 'rgba(206, 212, 218, 0.6)', // Line color
              borderWidth: 1,
              tension: 0.5,
              fill: 'origin', // Ensures the area under the line is filled
              pointRadius: 0, // Hide data points
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          maintainAspectRatio: false, // Adjust aspect ratio
          responsive: true, // Enable responsiveness
        },
      });



      // Set the height of the chart
      chartRef.current.style.height = `${height}px`;
    }

    return () => {
      // Clean up and destroy the chart instance on component unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, height]);



  return <canvas ref={chartRef} style={{ width: '100%', maxWidth: '100px' }} />;
};

export default TinyAreaChart;
