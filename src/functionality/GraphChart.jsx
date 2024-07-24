import React, { useState, useContext } from 'react';
import Chart from 'react-apexcharts';
import { ProductContext } from '../context/ProductContext';

function GraphChart() {
    const { history } = useContext(ProductContext);
    const [timeRange, setTimeRange] = useState('week'); // Default time range is a week

    // Helper function to calculate start date based on selected time range
    const calculateStartDate = (range) => {
        const today = new Date();
        let startDate = new Date(today);
        if (range === 'week') {
            startDate.setDate(today.getDate() - 7);
        } else if (range === 'month') {
            startDate.setMonth(today.getMonth() - 1);
        } else if (range === 'year') {
            startDate.setFullYear(today.getFullYear() - 1);
        }
        return startDate;
    };

    const today = new Date();
    const startDate = calculateStartDate(timeRange);

    // Filter history to include only entries from the selected time range
    const filteredHistory = history.filter(entry => {
        const entryDate = new Date(entry.$createdAt);
        return entryDate >= startDate && entryDate <= today;
    });

    // Extract dates, sales quantities, and withdrawals from filtered history
    const data = filteredHistory.map(entry => ({
        date: new Date(entry.$createdAt).toLocaleDateString(), // Assuming each entry has a '$createdAt' field
        quantity: entry.quantity, // Assuming each entry has a 'quantity' field
        isWithdrawal: entry.quantity < 0 // Flag to determine if it's a withdrawal
    }));

    // Prepare series data for each day in the selected time range
    const seriesData = [];
    const timestamps = [];
    const days = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
    for (let i = days - 1; i >= 0; i--) {
        const currentDate = new Date(today);
        currentDate.setDate(currentDate.getDate() - i);
        const currentDateString = currentDate.toLocaleDateString();

        timestamps.push(currentDate.getTime());

        // Find entries for current date and sum quantities
        let additionsTotal = 0;
        let withdrawalsTotal = 0;
        data.forEach(entry => {
            if (entry.date === currentDateString) {
                if (entry.quantity > 0) {
                    additionsTotal += entry.quantity;
                } else {
                    withdrawalsTotal += Math.abs(entry.quantity);
                }
            }
        });

        seriesData.push({
            x: currentDate.getTime(),
            additions: additionsTotal,
            withdrawals: withdrawalsTotal
        });
    }

    const options = {
        chart: {
            type: 'line',
            height: 350,
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false // Hide the default toolbar
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Product Quantity History',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            type: 'datetime', // Use 'datetime' type for x-axis with timestamps
            categories: timestamps, // Use extracted timestamps as categories
        },
        yaxis: {
            title: {
                text: 'Quantity'
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        colors: ['#41B883', '#F56C6C']
    };

    const series = [
        {
            name: 'Additions',
            data: seriesData.map(day => ({ x: day.x, y: day.additions }))
        },
        {
            name: 'Withdrawals',
            data: seriesData.map(day => ({ x: day.x, y: day.withdrawals }))
        }
    ];

    return (
        <div>
            <div>
                <label>Filter by: </label>
                <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                </select>
            </div>
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
}

export default GraphChart;