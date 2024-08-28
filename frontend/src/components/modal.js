import React from 'react';
import '../styles/modal.css';

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="custom-modal-overlay" onClick={onClose}></div>
      <div className="custom-modal">
        <div className="custom-modal-content">
          <button className="custom-close-button" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default CustomModal;
