import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const HistoricalAnalysis = ({ userId }) => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('7d');
  const [showTotal, setShowTotal] = useState(true); // State for showing total or individual coins

  useEffect(() => {
    fetchHistoricalData(timeframe);
  }, [timeframe]);

  const fetchHistoricalData = async (timeframe) => {
    try {
      const response = await axios.get(`/api/v1/analysis/${timeframe}`);
      const formattedData = formatData(response.data);
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const handleShowTotalChange = (event) => {
    setShowTotal(event.target.checked);
  };

  const formatData = (data) => {
    const formattedData = data.map(entry => ({
      label: entry.name_crypto,
      data: entry.data.map(d => ({
        x: new Date(d.date).getTime(),
        y: parseFloat(d.price)
      }))
    }));

    if (showTotal) {
      const totalData = data.reduce((acc, entry) => {
        entry.data.forEach(d => {
          const date = new Date(d.date).getTime();
          const price = parseFloat(d.price);
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += price;
        });
        return acc;
      }, {});

      formattedData.push({
        label: 'Total Wallet',
        data: Object.entries(totalData).map(([date, price]) => ({ x: Number(date), y: price }))
        .sort((a, b) => a.x - b.x)
      });
    }

    return formattedData;
  };

  const formatDataForChart = (data) => {
    return {
      datasets: data.map((cryptoData, index) => ({
        label: cryptoData.label,
        data: cryptoData.data,
        borderColor: getRandomColor(index),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fill: false,
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
        tension: 0.1
      }))
    };
  };

  const getRandomColor = (index) => {
    const colors = [
      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ];
    return colors[index % colors.length];
  };

  const chartOptions = {
    responsive: true,
    aspectRatio: 3,
    plugins: {
      legend: {
        labels: {
          color: 'white' // Change legend text color to white
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        ticks: {
          color: 'white' // Change x-axis ticks color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)' // Change x-axis grid lines color to white
        }
      },
      y: {
        ticks: {
          color: 'white' // Change y-axis ticks color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)' // Change y-axis grid lines color to white
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="card card-bg-color text-white rounded-4" data-bs-theme="dark">
          <div className="card-body">
            <h2>Historical Analysis</h2>
            <div className="timeframe-selector mb-3">
              <label>
                Timeframe:
                <select value={timeframe} onChange={handleTimeframeChange} className="form-select">
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="6m">Last 6 months</option>
                  <option value="all">All time</option>
                </select>
              </label>
            </div>
            <div className="chart-container mt-5">
              <Line data={formatDataForChart(data)} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnalysis;



