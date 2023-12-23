import React from 'react';
import './Popup.css';

const Popup = ({ onClose, onConfirm }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <span>&times;</span>
        </button>
        <p>Do you want to open the link?</p>
        <div className="button-container">
          <button className="popup-button" onClick={onConfirm}>Yes</button>
          <button className="popup-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
