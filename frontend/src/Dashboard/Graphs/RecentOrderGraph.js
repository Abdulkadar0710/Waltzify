import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RecentOrderGraph({ data }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        // Prepare data for the chart
        const todayCount = data.orders_count.today;
        const yesterdayCount = data.orders_count.yesterday;

        setChartData({
            labels: ['Today', 'Yesterday'],
            datasets: [
                {
                    label: 'Recent Orders',
                    data: [todayCount, yesterdayCount], // Use the counts from your data
                    backgroundColor: 'rgba(255, 182, 193, 0.6)', // Light pink color
                    barThickness: 80,
                    borderColor: 'rgba(255, 105, 180, 1)', // Border color (hot pink)
                    borderWidth: 1, // Width of the border
                },
            ],
        });
    }, [data]);

    return (
        <div>
            <Bar data={chartData} />
        </div>
    );
}

export default RecentOrderGraph;

