import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import ProjectForm from './ProjectForm';
import { createProject } from '../../store/actions/projectAction';

class AddProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      startAt: '',
      deadLine: '',
      budget: '',
      cout: 0,
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
    const { name, desc, startAt, deadLine, budget, cout } = this.state;
    const { auth } = this.props;

    if (name === '') {
      this.setState({ errors: { name: 'Le nom du projet es requis' } });
      return;
    }
    if (desc === '') {
      this.setState({
        errors: { desc: 'La description du projet es requise' },
      });
      return;
    }
    if (startAt === '') {
      this.setState({
        errors: { startAt: 'La date de debut es requise' },
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
      createdAt: new Date(),
      startAt,
      deadLine,
      budget,
      cout,
      tasks: {},
      createdBy: auth.uid,
    };

    console.log('newProject >>>', newProject);

    // add the new task to firestore
    this.props.onAddProject(newProject);

    // clear the state
    this.setState({
      name: '',
      desc: '',
      startAt: '',
      deadLine: '',
      budget: '',
      cout: 0,
      errors: {},
    });
    this.props.history.push(`/projects-page`);
  };

  render() {
    // redirect to signin in not connected
    const { auth, user } = this.props;
    if (!auth.uid || user.role !== 'admin') return <Redirect to="/" />;
    return (
      <div>
        <div className="card text-dark">
          <div className="card-header" style={{ fontSize: '1.5rem' }}>
            + ajouter un projet
          </div>
          <div className="card-body " />
          <ProjectForm
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
    user: state.firebase.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddProject: proj => dispatch(createProject(proj)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProject);
