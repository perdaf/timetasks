import React, { Component } from 'react';
// import Task from '../components/task/task';
import formatDuration from 'format-duration';
import { Link } from 'react-router-dom';

// import * as $ from 'jquery';

// import Modal from '../components/layout/modal/Modal';

import { connect } from 'react-redux';
// import { deleteTask, editTask } from '../store/actions/taskAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: this.props.tasks,
      newTask: {
        name: '',
        desc: '',
        elapsTime: 0,
      },
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.tasks !== prevProps.tasks) {
      this.setState({
        tasks: this.props.tasks,
      });
    }
    // console.log('componentDidUpdate > state tasks >>>', this.state.tasks);
  }

  // handleOnChange = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   this.setState({
  //     newTask: {
  //       ...this.state.newTask,
  //       [name]: value,
  //     },
  //   });
  // };
  //-------------------------------------------
  // toggleModalSuppTask = id => {
  //   $('#ConfirmDelete').modal('show');
  //   $('.ModalBtnConfirm')
  //     .off('click')
  //     .click(() => {
  //       this.props.onDeleteTask(id);
  //       $('#ConfirmDelete').modal('hide');
  //     });
  //   this.forceUpdate();
  // };

  // //-----------------------------------
  // toggleModalEditTask = id => {
  //   // find task by id
  //   const res = this.props.tasks.find(task => {
  //     return task.id === id;
  //   });
  //   $('#taskName').val(res.name);
  //   $('#taskDescription').val(res.desc);
  //   // if i dont setstate and i dont change one off them => ''
  //   this.setState({
  //     newTask: {
  //       ...this.state.newTask,
  //       name: $('#taskName').val(),
  //       desc: $('#taskDescription').val(),
  //     },
  //   });

  //   $('#AddTask').modal('show');
  //   $('.ModalBtnConfirm')
  //     .off('click')
  //     .click(() => {
  //       this.props.onEditTask(id, this.state.newTask);
  //       $('#addForm')[0].reset();
  //       $('#AddTask').modal('hide');
  //     });
  //   $('.ModalBtnClose')
  //     .off('click')
  //     .click(() => {
  //       $('#addForm')[0].reset();
  //     });
  // };
  render() {
    console.log('RENDER >>>');

    // loop in task and show if tasks.lenght > 0
    let tasks = <h2 className="text-dark text-center">Aucune tache</h2>;
    if (this.state.tasks.length > 0) {
      tasks = (
        <React.Fragment>
          {this.state.tasks.map((task, index) => {
            return (
              <Link
                to={`/task-detail/${task.id}`}
                className="list-group-item list-group-item-action mb-2"
                key={index}
              >
                <div className="row">
                  <div className="col-lg-8">
                    <h5 className="mb-1 font-weight-bold">{task.name}</h5>
                  </div>
                  <div className="col-lg text-lg-center border-right border-left">
                    <h6>{task.thj || '--'} &euro;</h6>
                  </div>
                  <div className="col-lg-2 text-lg-center">
                    <h6>{formatDuration(task.elapsTime)}</h6>
                  </div>
                </div>
              </Link>

              // <Task
              //   key={index}
              //   taskId={task.id}
              //   taskName={task.name}
              //   taskDesc={task.desc}
              //   taskElapsTime={task.elapsTime}
              //   showTaskDetail={false}
              //   btnEditHandler={this.toggleModalEditTask}
              //   btnDeleteHandler={this.toggleModalSuppTask}
              // />
            );
          })}
        </React.Fragment>
      );
    }
    return (
      <div>
        <h1 className="mb-3">Liste des taches</h1>
        <div className="card">
          <div className="card-body">
            <div className="row text-dark p-1">
              <div className="col-lg-8">
                <h5 className="mb-1 font-weight-bold">Nom</h5>
              </div>
              <div className="col-lg text-lg-center">
                <h5 className="font-weight-bold">THJ (Euro)</h5>
              </div>
              <div className="col-lg-2 text-lg-center">
                <h5 className="font-weight-bold">Temp passé</h5>
              </div>
            </div>
            <div className="list-group">{tasks}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    tasks: state.firestore.ordered.Tasks || [],
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onDeleteTask: id => dispatch(deleteTask(id)),
//     onEditTask: (id, args) => dispatch(editTask(id, args)),
//   };
// };

export default compose(
  connect(
    mapStateToProps
    // mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'Tasks' }])
)(Home);
