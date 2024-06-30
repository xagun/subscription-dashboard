import React, { useEffect, useRef } from "react";

const Modal = ({ header, children, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return (
    <div className="modal-overlay">
      <div className="modal">
        {header && (
          <div className="modal-header">
            <h2>{header}</h2>
          </div>
        )}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
