import React, { Component } from 'react';
import TaskForm from './TaskForm';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createTask } from '../../store/actions/taskAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      deadLine: '',
      dev: this.props.auth.uid,
      thj: '',
      etat: '',
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
    const { name, desc, deadLine, dev } = this.state;
    const { auth, thisUser, users } = this.props;

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

    if (dev === '') {
      this.setState({
        errors: { dev: "La selection d'un dev es requis" },
      });
      return;
    }

    if (deadLine === '') {
      this.setState({
        errors: { deadLine: 'La date de fin es requise' },
      });
      return;
    }

    const getUser = id => {
      return new Promise(resolve => {
        resolve(users.filter(user => user.id === id));
      });
    };

    if (dev !== auth.uid) {
      getUser(dev).then(x => {
        let newtask = {
          name,
          desc,
          deadLine,
          dev,
          thj: x ? x[0].thj : 0,
          elapsTime: 0,
          etat: 'en cour',
          createdBy: auth.uid,
        };
        console.log('NewTask >>>', newtask);
        // add the new task to firestore
        this.props.onAddTask(newtask);
        this.props.history.push(`/`);
      });
    } else {
      let newtask = {
        name,
        desc,
        deadLine,
        dev: auth.uid,
        thj: thisUser.thj,
        elapsTime: 0,
        etat: 'en cour',
        createdBy: auth.uid,
      };
      console.log('NewTask >>>', newtask);
      // add the new task to firestore
      this.props.onAddTask(newtask);
      this.props.history.push(`/`);
    }

    // clear the state
    this.setState({
      name: '',
      desc: '',
      deadLine: '',
      dev: '',
      thj: '',
      elapsTime: 0,
      errors: {},
    });
    // this.props.history.push(`/`);
  };

  render() {
    // redirect to signin in not connected
    const { auth, users, thisUser } = this.props;

    const dev = users.map(item => {
      return {
        name: item.lastName,
        prenom: item.firstName,
        id: item.id,
        thj: item.thj,
      };
    });

    if (!auth.uid) return <Redirect to="/signin" />;

    let isAdmin = false;
    if (thisUser.role === 'admin') {
      isAdmin = true;
    }

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
            dev={dev}
            crea={true}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const thisUser = state.firebase.profile;
  const users = state.firestore.ordered.users;
  return {
    auth: state.firebase.auth,
    thisUser: thisUser ? thisUser : null,
    users: users ? users : [],
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
  firestoreConnect([
    { collection: 'Tasks', orderBy: ['createdAt', 'desc'] },
    { collection: 'users', orderBy: ['lastName', 'desc'] },
  ])
)(AddTask);
