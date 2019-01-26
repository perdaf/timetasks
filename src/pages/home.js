import React, { Component } from 'react';
import Task from '../components/task/task';

import * as $ from 'jquery';

import Modal from '../components/modal/Modal';

import { connect } from 'react-redux';
import { createTask, deleteTask, editTask } from '../store/actions/taskAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   tasks: [],
      newTask: {
        name: '',
        desc: '',
        elapsTime: 0,
      },
    };
  }

  handleOnChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      newTask: {
        ...this.state.newTask,
        [name]: value,
      },
    });
  };
  //-------------------------------------------
  toggleModalSuppTask = id => {
    $('#ConfirmDelete').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.props.onDeleteTask(id);
        $('#ConfirmDelete').modal('hide');
      });
  };
  // -----------------------------------------
  toggleModalAddTask = () => {
    $('#AddTask').modal('show');
    this.setState({
      newTask: {
        name: '',
        desc: '',
        elapsTime: 0,
      },
    });
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.props.onAddTask(this.state.newTask);
        $('#addForm')[0].reset();
        $('#AddTask').modal('hide');
      });
    $('.ModalBtnClose')
      .off('click')
      .click(() => {
        $('#addForm')[0].reset();
      });
  };
  //-----------------------------------
  toggleModalEditTask = id => {
    // find task by id
    const res = this.props.tasks.find(task => {
      return task.id === id;
    });
    $('#taskName').val(res.name);
    $('#taskDescription').val(res.desc);
    // if i dont setstate and i dont change one off them => ''
    this.setState({
      newTask: {
        ...this.state.newTask,
        name: $('#taskName').val(),
        desc: $('#taskDescription').val(),
      },
    });

    $('#AddTask').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.props.onEditTask(id, this.state.newTask);
        $('#addForm')[0].reset();
        $('#AddTask').modal('hide');
      });
    $('.ModalBtnClose')
      .off('click')
      .click(() => {
        $('#addForm')[0].reset();
      });
  };
  render() {
    // form for the addTask modal
    let formAddTask = (
      <form id="addForm">
        <div className="form-group">
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            autoComplete="Task name"
            className="form-control"
            name="name"
            id="taskName"
            onChange={this.handleOnChange}
            placeholder="Enter task name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskDescription">task Description</label>
          <input
            type="text"
            autoComplete="task description"
            className="form-control"
            name="desc"
            id="taskDescription"
            onChange={this.handleOnChange}
            placeholder="description"
          />
        </div>
      </form>
    );

    // loop in task and show if tasks.lenght > 0
    let tasks = null;
    if (this.props.tasks.length > 0) {
      tasks = (
        <React.Fragment>
          {this.props.tasks.map((task, index) => {
            return (
              <Task
                key={index}
                taskId={task.id}
                taskName={task.name}
                taskDesc={task.desc}
                taskElapsTime={task.elapsTime}
                btnEditHandler={this.toggleModalEditTask}
                btnDeleteHandler={this.toggleModalSuppTask}
              />
            );
          })}
        </React.Fragment>
      );
    }
    return (
      <div>
        <h1>HOME PAGE</h1>
        <Modal
          ModalName="ConfirmDelete"
          ModalTitle="confirme delete"
          ModalContent="Voulez vous vraiment supprimer cette tache ?"
          ModalBtnLabel="Confime"
        />
        <Modal
          ModalName="AddTask"
          ModalTitle="Ajouter une tache"
          ModalContent={formAddTask}
          ModalBtnLabel="Save"
        />
        <button
          className="btn btn-block bg-primary mb-3"
          onClick={() => this.toggleModalAddTask('#AddTask')}
        >
          Add New Task
        </button>
        {tasks}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.firestore.ordered.Tasks || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: task => dispatch(createTask(task)),
    onDeleteTask: id => dispatch(deleteTask(id)),
    onEditTask: (id, args) => dispatch(editTask(id, args)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'Tasks' }])
)(Home);
