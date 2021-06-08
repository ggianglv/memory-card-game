import React from "react";
import "../styles/modal.css";

const Modal = ({ onClickClose, children, title }) => {
  return (
    <div className="modal show">
      <div className="modal-content">
        <div data-testid="title" className="modal-title">{title}</div>

        <div data-testid="children" className="content-body">{children}</div>

        <div className="content-footer">
          <div onClick={onClickClose} className="close-button">
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
