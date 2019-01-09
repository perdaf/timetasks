import React, { Component } from 'react';
import '../scss/App.scss';
import Task from './task/task';

class App extends Component {
  state = {
    tasks: [
      { name: 'task 001', desc: 'descrip task 001', elapsTime: '00:00:00' },
      { name: 'task 002', desc: 'descrip task 002', elapsTime: '01:02:00' },
      { name: 'task 003', desc: 'descrip task 003', elapsTime: '00:25:03' },
    ],
    isAddTask: false,
  };

  addTaskClick = () => {
    let addTask = this.state.isAddTask;
    this.setState({ isAddTask: !addTask });
    console.log('add task click', this.state.isAddTask);
  };

  render() {
    let tasks = (
      <div className="taskContainer">
        {this.state.tasks.map(task => {
          return (
            <Task
              key={task.name}
              taskName={task.name}
              taskDesc={task.desc}
              taskElapsTime={task.elapsTime}
            />
          );
        })}
      </div>
    );

    return (
      <div className="App container">
        <button
          className="btn btn-primary btn-block"
          onClick={this.addTaskClick}
        >
          New task
        </button>
        {tasks}
      </div>
    );
  }
}

export default App;
