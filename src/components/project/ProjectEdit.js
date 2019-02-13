import React, { Component } from 'react';
import ProjectForm from './ProjectForm';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { editProject } from '../../store/actions/projectAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class ProjectEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      deadLine: '',
      budget: '',
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
    if (oldProps.project !== newProps.project) {
      this.setState({
        ...newProps.project,
      });
    }
  }
  componentDidMount() {
    this.setState({
      ...this.props.project,
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

    const { name, desc, deadLine, budget } = this.state;
    const id = this.props.match.params.id;

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
    if (budget === '') {
      this.setState({
        errors: { budget: 'Le budget es requis' },
      });
      return;
    }

    let newProject = {
      name,
      desc,
      deadLine,
      budget,
    };

    // add the new task to firestore
    this.props.onEditProject(id, newProject);

    // clear the state
    this.setState({
      name: '',
      desc: '',
      deadLine: '',
      budget: '',
      errors: {},
    });
    this.props.history.push(`/project-detail/${id}`);
  };

  render() {
    // redirect to signin in not connected
    const { auth, thisUser, project } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    // console.log('THISUSER >>>', thisUser);
    let isAdmin = false;
    if (thisUser.role === 'admin') {
      isAdmin = true;
    }

    if (project) {
      const { name, desc, deadLine, budget } = project;
      return (
        <div>
          <div className="card">
            <div
              className="card-header text-dark"
              style={{ fontSize: '1.5rem' }}
            >
              Editer Le projet: {name}
            </div>
            <div className="card-body" />
            <ProjectForm
              handleOnChange={this.handleOnChange}
              handleOnSubmit={this.handleOnSubmit}
              valueName={name}
              valueDesc={desc}
              valueDeadLine={deadLine}
              valueBuget={budget}
              errors={this.state.errors}
              isAdmin={isAdmin}
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
  const projects = state.firestore.data.Project;
  const project = projects ? projects[id] : null;
  const thisUser = state.firebase.profile;

  return {
    project: project,
    auth: state.firebase.auth,
    thisUser: thisUser ? thisUser : [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditProject: (id, args) => dispatch(editProject(id, args)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: 'Project' },
    { collection: 'users', orderBy: ['lastName', 'desc'] },
  ])
)(ProjectEdit);
