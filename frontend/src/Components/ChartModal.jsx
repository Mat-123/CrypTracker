import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const ChartModal = ({ show, onClose, chartData }) => {
  const options = {
    plugins: {
      legend: {
        labels: {
            color: '#FFFFFF',
            font: {
                size: 18
          }
        }
      }
    }
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content card-bg-color text-white">
          <div className="modal-header">
            <h5 className="modal-title me-auto">Crypto Allocation</h5>
            <button type="button" className="btn close manage-btn" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">X</span>
            </button>
          </div>
          <div className="modal-body">
            <Doughnut data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartModal;

