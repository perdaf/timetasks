import React, { Component } from 'react';
import './modal.scss';

export default class Modal extends Component {
  render() {
    return (
      <div
        className="modal fade"
        id={this.props.ModalName}
        tabIndex="-1"
        role="dialog"
        // aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {this.props.ModalTitle}
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
            <div className="modal-body">{this.props.ModalContent}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary ModalBtnClose"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary ModalBtnConfirm">
                {this.props.ModalBtnLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
