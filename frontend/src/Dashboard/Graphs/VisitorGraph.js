import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

const VisitorGraph = ({ visitorData }) => {
    const data = {
        labels: visitorData.labels,
        datasets: [
            {
                label: 'Visitors',
                data: visitorData.data,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: '#4caf50',
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default VisitorGraph;

