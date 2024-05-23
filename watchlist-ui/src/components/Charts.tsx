import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Tooltip, CategoryScale, BarElement } from 'chart.js';
import { Stock } from '../interfaces';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, CategoryScale, BarElement);

const StockChart:React.FC<({stockData:Stock[]})> = ({ stockData }) => {
    const options = {
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };

  const watchlist = stockData.map((stock)=>stock.symbol);
  const chartData = {
    labels: watchlist,
    datasets: [
      {
        label: 'Current Price', 
        data: stockData.map((stock) => stock.currentPrice), 
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Change',
        data: stockData.map((stock) => stock.change),
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return (
    <Bar data={chartData}  options={options}/>
  );
};

export default StockChart;