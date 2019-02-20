import React, { Component } from 'react';
import TaskForm from './TaskForm';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { editTask } from '../../store/actions/taskAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class TaskEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      startAt: '',
      deadLine: '',
      etat: '',
      dev: '',
      thj: '',
      projet: '',
      errors: {},
    };
  }

  // utilisation des deux lifeCycle didUpdate et DidMount pour mettre a jour le state...

  // pourquoi les deux ?
  // => si j'utilise l'un ou l'autre dans certains cas le this.props.task n'existe pas encore
  // et donc le state n'es pas mis a jour
  // *** a voir si cela es une bonne pratique ou non

  // Rappel: le this.props.task es obtenu en async avec firestoreConnect et mapStateToProps
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.task !== newProps.task) {
      this.setState({
        ...newProps.task,
      });
    }
  }
  componentDidMount() {
    this.setState({
      ...this.props.task,
    });
  }

  handleOnChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        // console.log('state after onChange >>> ', this.state);
      }
    );
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const {
      name,
      desc,
      startAt,
      deadLine,
      etat,
      thj,
      dev,
      projet,
    } = this.state;
    const { projects } = this.props;
    const id = this.props.match.params.id;
    let dateFinProj;
    let dateDebProj;

    if (projet !== '') {
      const thisProj = projects.filter(proj => proj.id === projet);
      dateFinProj = thisProj[0].deadLine;
      dateDebProj = thisProj[0].startAt;
      // console.log('datefinproj >>>', dateFinProj);
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
    if (startAt === '') {
      this.setState({
        errors: { startAt: 'La date de debut es requise' },
      });
      return;
    }
    if (moment(startAt).diff(moment(dateFinProj), 'days') > 0) {
      this.setState({
        errors: {
          startAt: `La date de debut es superieur à la deadline du projet ${moment(
            dateFinProj
          ).format('DD/MM/YYYY')}`,
        },
      });
      return;
    }
    if (moment(startAt).diff(moment(dateDebProj), 'days') < 0) {
      this.setState({
        errors: {
          startAt: `La date de debut es inferieur à la date de debut du projet ${moment(
            dateDebProj
          ).format('DD/MM/YYYY')}`,
        },
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
          deadLine: `La deadLine es superieur à celle du projet ${moment(
            dateFinProj
          ).format('DD/MM/YYYY')}`,
        },
      });
      return;
    }
    if (moment(deadLine).diff(moment(dateDebProj), 'days') < 0) {
      this.setState({
        errors: {
          deadLine: `La deadLine es inferieur à la date de debut du projet ${moment(
            dateFinProj
          ).format('DD/MM/YYYY')}`,
        },
      });
      return;
    }

    if (etat === '') {
      this.setState({
        etat: 'en cour',
      });
      return;
    }
    if (dev === '') {
      this.setState({
        errors: { dev: 'Le dev assigné es requise' },
      });
      return;
    }

    let newtask = {
      name,
      desc,
      startAt,
      deadLine,
      coutEstime: moment(deadLine).diff(moment(startAt), 'days') * thj,
      etat,
      thj,
      dev,
    };

    // add the new task to firestore
    this.props.onEditTask(id, newtask);

    // clear the state
    this.setState({
      name: '',
      desc: '',
      startAt: '',
      deadLine: '',
      etat: '',
      thj: '',
      errors: {},
    });
    this.props.history.push(`/task-detail/${id}`);
  };

  render() {
    // redirect to signin in not connected
    const { auth, thisUser, users } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    const dev = users.map(item => {
      return {
        name: item.lastName,
        prenom: item.firstName,
        id: item.id,
        thj: item.thj,
      };
    });
    // console.log('THISUSER >>>', thisUser);
    let isAdmin = false;
    if (thisUser.role === 'admin') {
      isAdmin = true;
    }

    if (this.props.task) {
      const { name, desc, startAt, thj, deadLine, etat } = this.props.task;
      return (
        <div>
          <div className="card">
            <div
              className="card-header text-dark"
              style={{ fontSize: '1.5rem' }}
            >
              Editer La tache
            </div>
            <div className="card-body" />
            <TaskForm
              handleOnChange={this.handleOnChange}
              handleOnSubmit={this.handleOnSubmit}
              valueName={name}
              valueDesc={desc}
              valueThj={thj}
              valueDateDeb={startAt}
              valueDeadLine={deadLine}
              valueEtat={etat}
              errors={this.state.errors}
              isAdmin={isAdmin}
              dev={dev}
            />
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
  const users = state.firestore.ordered.users;
  const projects = state.firestore.ordered.Project;
  const thisUser = state.firebase.profile;

  return {
    task: task,
    auth: state.firebase.auth,
    users: users ? users : null,
    thisUser: thisUser ? thisUser : null,
    projects: projects ? projects : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onAddTask: task => dispatch(createTask(task)),
    onEditTask: (id, args) => dispatch(editTask(id, args)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: 'Tasks' },
    { collection: 'users', orderBy: ['lastName', 'desc'] },
    { collection: 'Project', orderBy: ['createdAt', 'desc'] },
  ])
)(TaskEdit);
