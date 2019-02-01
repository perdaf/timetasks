import React, { Component } from 'react';
import TaskForm from '../components/layout/taskForm/TaskForm';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createTask } from '../store/actions/taskAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      thj: 0,
      elapsTime: 0,
      errors: {},
    };
  }
  handleOnChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { name, desc, thj, elapsTime } = this.state;

    if (name === '') {
      this.setState({ errors: { name: 'Le nom de la tache es requis' } });
      return;
    }
    if (desc === '') {
      this.setState({
        errors: { desc: 'La description de la tache es requise' },
      });
      return;
    }

    let newtask = {
      name,
      desc,
      thj,
      elapsTime,
    };
    // add the new task to firestore
    this.props.onAddTask(newtask);

    // clear the state
    this.setState({
      name: '',
      desc: '',
      thj: 0,
      elapsTime: 0,
      errors: {},
    });
    this.props.history.push(`/`);
  };

  render() {
    // redirect to signin in not connected
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div>
        <div className="card">
          <div className="card-header text-dark" style={{ fontSize: '1.5rem' }}>
            + ajouter une tache
          </div>
          <div className="card-body" />
          <TaskForm
            handleOnChange={this.handleOnChange}
            handleOnSubmit={this.handleOnSubmit}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: task => dispatch(createTask(task)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'Tasks' }])
)(AddTask);
