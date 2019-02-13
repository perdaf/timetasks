import React, { Component } from 'react';
import TaskForm from './TaskForm';

import moment from 'moment';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createTask } from '../../store/actions/taskAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projet: this.props.match.params.idProj
        ? this.props.match.params.idProj
        : '',
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
    const { name, desc, deadLine, dev, projet } = this.state;
    const { auth, thisUser, users, projects } = this.props;
    let dateFinProj;

    if (projet === '') {
      this.setState({
        errors: { projet: 'Le projet assigner à la tache es requis' },
      });
      return;
    }

    // on recup la deadline du projet
    if (projet !== '') {
      const thisProj = projects.filter(proj => proj.id === projet);
      dateFinProj = thisProj[0].deadLine;
    }

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
    if (moment(deadLine).diff(moment(dateFinProj), 'days') > 0) {
      this.setState({
        errors: {
          deadLine: `La date de fin es superieur a la deadline du projet ${moment(
            dateFinProj
          ).format('DD/MM/YYYY')}`,
        },
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
          projet,
          name,
          desc,
          deadLine,
          dev,
          thj: x ? x[0].thj : 0,
          coutEstime: moment(deadLine).diff(moment(), 'days') * x[0].thj,
          elapsTime: 0,
          etat: 'en cours',
          createdBy: auth.uid,
        };
        // console.log('NewTask >>>', newtask);
        // add the new task to firestore
        this.props.onAddTask(newtask);
        // redirection selon idproject ou non
        if (this.props.match.params.idProj) {
          this.props.history.push(
            `/project-detail/${this.props.match.params.idProj}`
          );
        } else {
          this.props.history.push(`/projects-page`);
        }
      });
    } else {
      let newtask = {
        projet,
        name,
        desc,
        deadLine,
        dev: auth.uid,
        thj: thisUser.thj,
        coutEstime: moment(deadLine).diff(moment(), 'days') * thisUser.thj,
        elapsTime: 0,
        etat: 'en cours',
        createdBy: auth.uid,
      };
      // console.log('NewTask >>>', newtask);
      // add the new task to firestore
      this.props.onAddTask(newtask);
      // redirection selon idproject ou non
      if (this.props.match.params.idProj) {
        this.props.history.push(
          `/project-detail/${this.props.match.params.idProj}`
        );
      } else {
        this.props.history.push(`/projects-page`);
      }
    }

    // clear the state
    this.setState({
      projet: '',
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
    const { auth, users, thisUser, projects } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    // liste des users => dev pour affichage
    const dev = users.map(item => {
      return {
        name: item.lastName,
        prenom: item.firstName,
        id: item.id,
        thj: item.thj,
      };
    });

    const projectsArr = projects.map(item => {
      return {
        name: item.name,
        id: item.id,
      };
    });

    // console.log('projectsArr >>>', projectsArr);

    let isAdmin = false;
    if (thisUser.role === 'admin') {
      isAdmin = true;
    }

    // si id du projet passer en parametre ne pas afficher select projet dans form
    const idProj = this.props.match.params.idProj;

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
            projects={projectsArr}
            idProj={idProj}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const thisUser = state.firebase.profile;
  const users = state.firestore.ordered.users;
  const projects = state.firestore.ordered.Project;
  return {
    auth: state.firebase.auth,
    thisUser: thisUser ? thisUser : null,
    users: users ? users : [],
    projects: projects ? projects : [],
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
    { collection: 'Project', orderBy: ['createdAt', 'desc'] },
  ])
)(AddTask);
