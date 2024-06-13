import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const HistoricalAnalysis = ({ userId }) => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('7d');

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

  const formatData = (data) => {
    return data.map(entry => ({
      label: entry.name_crypto,
      data: entry.data.map(d => ({
        x: formatDate(d.date),
        y: parseFloat(d.price)
      }))
    }));
  };

  const formatDate = (dateString) => {
    const parts = dateString.split('-'); // Splitting date string by hyphen
    // Reordering parts to YYYY-MM-DD format
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  };

  const formatDataForChart = (data) => {
    return {
      datasets: data.map((cryptoData, index) => ({
        label: cryptoData.label,
        data: cryptoData.data,
        borderColor: getRandomColor(index),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      }))
    };
  };

  const getRandomColor = (index) => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-8 mx-auto">
          <div className="card card-bg-color text-white">
            <div className="card-body">
              <h2>Historical Analysis</h2>
              <div className="timeframe-selector">
                <label>
                  Timeframe:
                  <select value={timeframe} onChange={handleTimeframeChange}>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="6m">Last 6 months</option>
                    <option value="all">All time</option>
                  </select>
                </label>
              </div>
              <div className="chart-container mt-4">
                <Line data={formatDataForChart(data)} options={{ responsive: true }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnalysis;
