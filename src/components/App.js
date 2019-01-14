import React, { Component } from 'react';

import 'bootstrap';
import * as $ from 'jquery';
import './App.scss';
import Task from './task/task';
import Modal from './modal/Modal';
import { connect } from 'react-redux';
import { createTask, deleteTask, editTask } from '../store/actions/taskAction';

class App extends Component {
  // addTask = args => {
  //   console.log('agrs1 >>>', args[0][0].value);
  //   console.log('agrs2 >>>', args[0][1].value);
  //   let taskName = args[0][0].value;
  //   let taskDesc = args[0][1].value;
  //   let newTask = {
  //     id: uniqid(),
  //     name: taskName,
  //     desc: taskDesc,
  //     elapsTime: '00:00:00',
  //   };
  //   console.log({ newTask });
  //   this.setState({ tasks: [...this.state.tasks, newTask] });
  //   $('#addForm')[0].reset();
  // };

  EditTask = args => {
    console.log('edit click');
    console.log([args]);
  };

  // DeleteTask = index => {
  //   let tasks = this.state.tasks.slice();
  //   tasks.splice(index, 1);
  //   this.setState({ tasks });
  // };

  toggleModalSuppTask = e => {
    $('#ConfirmDelete').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.props.onDeleteTask(e);
        $('#ConfirmDelete').modal('hide');
      });
  };
  toggleModalAddTask = () => {
    $('#AddTask').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.props.onAddTask($('#addForm'));
        $('#addForm')[0].reset();
        $('#AddTask').modal('hide');
      });
    $('.ModalBtnClose')
      .off('click')
      .click(() => {
        $('#addForm')[0].reset();
      });
  };

  toggleModalEditTask = id => {
    // find task by id
    const res = this.props.tasks.find(task => {
      return task.id === id;
    });
    $('#taskName').val(res.name);
    $('#taskDescription').val(res.desc);

    $('#AddTask').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.props.onEditTask(id, $('#addForm'));
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
    // loop in task and show if tasks.lenght > 0
    let tasks = null;
    if (this.props.tasks.length > 0) {
      tasks = (
        <div className="taskContainer">
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
        </div>
      );
    }
    // form for the addTask modal
    let formAddTask = (
      <form id="addForm">
        <div className="form-group">
          <label>
            Task Name
            <input
              type="text"
              autoComplete="Task name"
              className="form-control"
              id="taskName"
              placeholder="Enter task name"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            task Description
            <input
              type="text"
              autoComplete="task description"
              className="form-control"
              id="taskDescription"
              placeholder="description"
            />
          </label>
        </div>
      </form>
    );

    return (
      <div className="App container">
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
          className="btn btn-primary btn-block"
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
  return { tasks: state.tasks };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: task => dispatch(createTask(task)),
    onDeleteTask: id => dispatch(deleteTask(id)),
    onEditTask: (id, args) => dispatch(editTask(id, args)),
    // onDeleteTask: id => dispatch({ type: 'DELETETASK', id }),
    // onEditTask: (id, args) => dispatch({ type: 'EDITTASK', id, args }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
