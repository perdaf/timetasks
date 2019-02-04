import React, { Component } from 'react';
import TaskForm from '../layout/taskForm/TaskForm';

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
      deadLine: '',
      thj: '',
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
      this.setState(
        {
          ...newProps.task,
        },
        () => {
          console.log('Update > mise a jour des state >>> ', this.state);
        }
      );
    }
  }
  componentDidMount() {
    this.setState(
      {
        ...this.props.task,
      },
      () => {
        console.log('Mount > mise a jour des state >>> ', this.state);
      }
    );
  }

  handleOnChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log('state after onChange >>> ', this.state);
      }
    );
  };

  handleOnSubmit = e => {
    e.preventDefault();
    console.log('Submit >>>', this.state);

    const { name, desc, deadLine, thj } = this.state;
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

    let newtask = {
      name,
      desc,
      deadLine,
      thj,
    };

    // add the new task to firestore
    this.props.onEditTask(id, newtask);

    // clear the state
    this.setState({
      name: '',
      desc: '',
      deadLine: '',
      thj: '',
      errors: {},
    });
    this.props.history.push(`/task-detail/${id}`);
  };

  render() {
    // redirect to signin in not connected
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (this.props.task) {
      const { name, desc, thj, deadLine } = this.props.task;
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
              valueDeadLine={deadLine}
              errors={this.state.errors}
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
  return {
    task: task,
    auth: state.firebase.auth,
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
  firestoreConnect([{ collection: 'Tasks' }])
)(TaskEdit);
