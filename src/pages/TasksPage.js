import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TaskListe from '../components/task/TaskListe';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './CardDeploy.scss';

class TachesPage extends Component {
  state = {
    listeTachesIsDeploy: true,
  };

  collapsCard = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = this.state[name];

    this.setState({
      [name]: !value,
    });
  };

  render() {
    // redirect to signin in not connected
    const { auth, user } = this.props;

    const creator = auth.uid;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="card card-listTask text-dark mt-2">
        <div className="card-header d-flex justify-content-between">
          <h4 className="font-weight-bold">Liste des taches</h4>
          <button
            onClick={e => this.collapsCard(e)}
            name="listeTachesIsDeploy"
            className={classnames('btn-down', {
              btnDown: this.state.listeTachesIsDeploy,
              btnUp: !this.state.listeTachesIsDeploy,
            })}
          />
        </div>
        <div
          className={classnames('card-body', {
            cardDeploy: this.state.listeTachesIsDeploy,
            cardNotDeploy: !this.state.listeTachesIsDeploy,
          })}
        >
          <div className="TaskList d-flex flex-wrap align-items-center justify-content-around">
            <TaskListe creator={creator} role={user.role} />
          </div>
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

export default connect(mapStateToProps)(TachesPage);
