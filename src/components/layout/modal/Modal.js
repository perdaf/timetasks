import React from 'react';
import './modal.scss';

const Modal = props => {
  return (
    <div
      className="modal fade"
      id={props.ModalName}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title font-weight-bold"
              id="exampleModalLabel"
              style={{ fontSize: '2rem' }}
            >
              {props.ModalTitle}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            className="modal-body text-center"
            style={{ fontSize: '1.2rem' }}
          >
            {props.ModalContent}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary ModalBtnClose"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary ModalBtnConfirm">
              {props.ModalBtnLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
