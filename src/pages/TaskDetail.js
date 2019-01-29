import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import formatDuration from 'format-duration';

import * as $ from 'jquery';

import Modal from '../components/layout/modal/Modal';

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
      const { name, desc, thj, elapsTime } = this.props.task;
      return (
        <div>
          <Modal
            ModalName="ConfirmDelete"
            ModalTitle="confirme delete"
            ModalContent="Voulez vous vraiment supprimer cette tache ?"
            ModalBtnLabel="Confime"
          />
          <h2 className="mb-5 mt-4">Task detail</h2>

          <div className="card text-dark">
            <div className="card-header">
              <h4 className="font-weight-bold text-center">Nom de la tache</h4>
            </div>
            <div className="card-body">
              <h2>{name}</h2>
            </div>
          </div>

          <div className="card text-dark mt-2">
            <div className="card-header">
              <h4 className="font-weight-bold text-center">
                Description de la tache
              </h4>
            </div>
            <div className="card-body">
              <h2>{desc}</h2>
            </div>
          </div>

          <div className="card text-dark mt-2">
            <div className="card-header">
              <h4 className="font-weight-bold text-center">
                Taux Horaire journalier
              </h4>
            </div>
            <div className="card-body">
              <h2>{thj} &euro;</h2>
            </div>
          </div>

          <div className="card text-dark mt-2">
            <div className="card-header">
              <h4 className="font-weight-bold text-center">
                Temp passé sur la tache
              </h4>
            </div>
            <div className="card-body">
              <h2>{formatDuration(elapsTime)}</h2>
            </div>
          </div>

          <div className="card text-dark mt-2">
            <div className="card-header bg-darkblue">
              <h4 className="font-weight-bold text-center text-light">
                Somme Engranger
              </h4>
            </div>
            <div className="card-body">
              <h2>
                {Math.round((thj / 7) * (elapsTime / 1000 / 60 / 60), -2)}{' '}
                &euro;
              </h2>
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
