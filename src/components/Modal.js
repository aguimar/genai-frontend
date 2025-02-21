import React from 'react';

function Modal({ imageUrl, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Full Size" className="modal-image" />
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default Modal;
