import React, { Component } from 'react';
import uniqid from 'uniqid';
import 'bootstrap';
import * as $ from 'jquery';
import './App.scss';
import Task from './task/task';
import Modal from './modal/Modal';

class App extends Component {
  state = {
    tasks: [
      {
        id: 'task001',
        name: 'task 001',
        desc: 'descrip task 001',
        elapsTime: '00:00:00',
      },
      {
        id: 'task002',
        name: 'task 002',
        desc: 'descrip task 002',
        elapsTime: '01:02:00',
      },
      {
        id: 'task003',
        name: 'task 003',
        desc: 'descrip task 003',
        elapsTime: '00:25:03',
      },
    ],
    isAddTask: false,
  };

  addTask = args => {
    console.log('agrs1 >>>', args[0][0].value);
    console.log('agrs2 >>>', args[0][1].value);
    let taskName = args[0][0].value;
    let taskDesc = args[0][1].value;
    let newTask = {
      id: uniqid(),
      name: taskName,
      desc: taskDesc,
      elapsTime: '00:00:00',
    };
    console.log({ newTask });
    this.setState({ tasks: [...this.state.tasks, newTask] });
    $('#addForm')[0].reset();
  };

  EditTask = args => {
    console.log('edit click');
    console.log([args]);
  };

  DeleteTask = index => {
    let tasks = this.state.tasks.slice();
    tasks.splice(index, 1);
    this.setState({ tasks });
  };

  toggleModalSuppTask = e => {
    $('#ConfirmDelete').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.DeleteTask(e);
        $('#ConfirmDelete').modal('hide');
      });
  };
  toggleModalAddTask = () => {
    $('#AddTask').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.addTask($('#addForm'));
        $('#AddTask').modal('hide');
      });
    $('.ModalBtnClose')
      .off('click')
      .click(() => {
        $('#addForm')[0].reset();
      });
  };

  render() {
    let tasks;
    if (this.state.tasks.length > 0) {
      tasks = (
        <div className="taskContainer">
          {this.state.tasks.map((task, index) => {
            return (
              <Task
                key={index}
                taskId={index}
                taskName={task.name}
                taskDesc={task.desc}
                taskElapsTime={task.elapsTime}
                btnEditHandler={this.EditTask}
                btnDeleteHandler={this.toggleModalSuppTask}
              />
            );
          })}
        </div>
      );
    }
    // ---------------------------------
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
          New task
        </button>
        {tasks}
      </div>
    );
  }
}

export default App;
