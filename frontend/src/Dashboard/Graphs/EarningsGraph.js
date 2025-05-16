import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EarningsGraph({ revenue, profit }) {
    const chartData = {
        labels: ['Earnings'],
        datasets: [
            {
                label: 'Revenue',
                data: [revenue],
                backgroundColor: 'rgba(255, 182, 193, 0.6)', // Light pink for revenue
                borderColor: 'rgba(255, 105, 180, 1)', // Pink border for revenue
                borderWidth: 2,
            },
            {
                label: 'Profit',
                data: [profit],
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light teal for profit
                borderColor: 'rgba(54, 162, 235, 1)', // Teal border for profit
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className='flex justify-center h-full'>
            <Bar 
                data={chartData} 
                options={{
                    responsive: true,
                    indexAxis: 'y', // Change to horizontal bar chart
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Revenue vs Profit',
                        },
                    },
                }} 
            />
        </div>
    );
}

export default EarningsGraph;
