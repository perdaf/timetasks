import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import formatDuration from 'format-duration';
import moment from 'moment';

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
    if (this.props.task) {
      const { name, desc, thj, elapsTime, createdAt } = this.props.task;
      return (
        <div>
          <Modal
            ModalName="ConfirmDelete"
            ModalTitle="confirme delete"
            ModalContent="Voulez vous vraiment supprimer cette tache ?"
            ModalBtnLabel="Confime"
          />

          <div className="card text-dark mt-2">
            <div className="card-header">
              <h4 className="font-weight-bold text-center">Task Detail</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="font-weight-bold">Nom:</h5>
                        </div>
                        <div className="col-sm">
                          <p>{name}</p>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="font-weight-bold">Desc:</h5>
                        </div>
                        <div className="col-sm">{desc}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="font-weight-bold">Créer le:</h5>
                        </div>
                        <div className="col-sm">
                          {(createdAt &&
                            moment(createdAt.toDate()).format('L')) ||
                            '--'}
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="font-weight-bold">THJ:</h5>
                        </div>
                        <div className="col-sm">{thj} &euro;</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 text-center d-flex flex-column justify-content-between align-items-center">
                  <div>
                    <h4 className="font-weight-bold">
                      Temp passé sur la tache : {formatDuration(elapsTime)}
                    </h4>
                  </div>
                  <div>
                    <Timer taskId={this.state.id} taskElapsTime={elapsTime} />
                  </div>
                  <div>
                    <h4 className="font-weight-bold">
                      Somme Engranger :{' '}
                      {Math.round((thj / 7) * (elapsTime / 1000 / 60 / 60), -2)}{' '}
                      &euro;
                    </h4>
                  </div>
                </div>
              </div>

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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onAddTask: task => dispatch(createTask(task)),
    onDeleteTask: id => dispatch(deleteTask(id)),
    // onEditTask: (id, args) => dispatch(editTask(id, args)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'Tasks' }])
)(TaskDetail);
