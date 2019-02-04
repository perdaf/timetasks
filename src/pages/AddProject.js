import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createTask } from '../store/actions/taskAction';

class AddProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      deadLine: '',
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
    const { name, desc, thj, elapsTime, deadLine } = this.state;
    const { user } = this.props;

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
    if (deadLine === '') {
      this.setState({
        errors: { deadLine: 'La date de fin es requise' },
      });
      return;
    }

    const userName = user.lastName + ' ' + user.firstName;
    let newtask = {
      name,
      desc,
      deadLine,
      thj,
      elapsTime,
      createdBy: userName,
    };
    // add the new task to firestore
    this.props.onAddTask(newtask);

    // clear the state
    this.setState({
      name: '',
      desc: '',
      deadLine: '',
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
        <div className="card text-dark">
          <div className="card-header" style={{ fontSize: '1.5rem' }}>
            + ajouter un projet
          </div>
          <div className="card-body " />
          <h1>Add project</h1>
          {/* <TaskForm
            handleOnChange={this.handleOnChange}
            handleOnSubmit={this.handleOnSubmit}
            errors={this.state.errors}
          /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: task => dispatch(createTask(task)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProject);
