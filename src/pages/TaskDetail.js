import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import moment from 'moment';
import 'moment-duration-format';

import * as $ from 'jquery';

import Modal from '../components/layout/modal/Modal';
import Timer from '../components/timer/Timer';

import { connect } from 'react-redux';
import { deleteTask } from '../store/actions/taskAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class TaskDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
    };
  }

  toggleModalSuppTask = id => {
    $('#ConfirmDelete').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.props.onDeleteTask(id);
        $('#ConfirmDelete').modal('hide');
        this.props.history.push(`/`);
      });
  };

  render() {
    // redirect to signin in not connected
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (this.props.task) {
      const {
        name,
        desc,
        thj,
        elapsTime,
        createdAt,
        deadLine,
        createdBy,
      } = this.props.task;
      return (
        <div>
          <Modal
            ModalName="ConfirmDelete"
            ModalTitle="confirme delete"
            ModalContent="Voulez vous vraiment supprimer cette tache ?"
            ModalBtnLabel="Confime"
          />

          <div className="card text-dark mt-2">
            <div className="card-header text-center">
              <h4 className="font-weight-bold" style={{ fontSize: '2rem' }}>
                {name}
              </h4>
              <small>Created by {createdBy ? createdBy : '--'}</small>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-4">
                          <h5 className="font-weight-bold">Desc:</h5>
                        </div>
                        <div className="col-sm">{desc}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-4">
                          <h5 className="font-weight-bold">Créer le:</h5>
                        </div>
                        <div className="col-sm">
                          {(createdAt &&
                            moment(createdAt.toDate()).format('DD/MM/YYYY')) ||
                            '--'}
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-4">
                          <h5 className="font-weight-bold">Date de fin :</h5>
                        </div>
                        <div className="col-sm">
                          {(deadLine &&
                            moment(deadLine).format('DD/MM/YYYY')) ||
                            '--'}
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-4">
                          <h5 className="font-weight-bold">THJ:</h5>
                        </div>
                        <div className="col-sm">{thj} &euro;</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 text-center">
                  <div>
                    <h4 className="font-weight-bold">
                      Temp passé sur la tache :{' '}
                      {moment
                        .duration(elapsTime, 'milliseconds')
                        .format('hh:mm:ss', { trim: false })}
                    </h4>
                  </div>
                  <div>
                    <Timer taskId={this.state.id} taskElapsTime={elapsTime} />
                  </div>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-light">
                  <div>
                    <h4 className="font-weight-bold text-center py-3">
                      Somme Engranger :{' '}
                      {Math.round((thj / 7) * (elapsTime / 1000 / 60 / 60))}{' '}
                      &euro;
                    </h4>
                  </div>
                </li>
              </ul>

              <div className="d-flex justify-content-center mt-3">
                <Link
                  to={`/task-edit/${this.state.id}`}
                  className="btn btn-primary mx-3"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => this.toggleModalSuppTask(this.state.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <strong>Loading...</strong>
          <br />
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.Tasks;
  const task = tasks ? tasks[id] : null;
  return {
    task: task,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTask: id => dispatch(deleteTask(id)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'Tasks' }])
)(TaskDetail);
