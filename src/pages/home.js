import React, { Component } from 'react';

import formatDuration from 'format-duration';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
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
    if (this.props.tasks !== prevProps.tasks) {
      this.setState({
        tasks: this.props.tasks,
      });
    }
  }

  render() {
    // redirect to signin in not connected
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

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
            );
          })}
        </React.Fragment>
      );
    }
    return (
      <div>
        <div className="card card text-dark mt-2">
          <div className="card-header">
            <h4 className="font-weight-bold">Liste des taches</h4>
          </div>
          <div className="card-body">
            <div className="row p-1">
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
  return {
    tasks: state.firestore.ordered.Tasks || [],
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(
    mapStateToProps
    // mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'Tasks', orderBy: ['createdAt', 'desc'] }])
)(Home);
