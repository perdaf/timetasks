import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TaskListe from '../components/task/TaskListe';
import UserListe from '../components/user/UserListe';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './home.scss';

class Home extends Component {
  state = {
    listeUserIsDeploy: false,
    listeTachesIsDeploy: false,
    listProjectsIsDeploy: false,
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
    if (user.role === 'admin') {
      return (
        <div>
          <div className="row">
            <div className="col-sm">
              <div className="card card text-dark mt-2">
                <div className="card-header d-flex justify-content-between">
                  <h4 className="font-weight-bold">Liste des utilisateurs</h4>
                  <button
                    onClick={e => this.collapsCard(e)}
                    name="listeUserIsDeploy"
                    className={classnames('btn-down', {
                      btnDown: this.state.listeUserIsDeploy,
                      btnUp: !this.state.listeUserIsDeploy,
                    })}
                  />
                </div>
                <div
                  className={classnames('card-body', {
                    cardDeploy: this.state.listeUserIsDeploy,
                    cardNotDeploy: !this.state.listeUserIsDeploy,
                  })}
                >
                  <div className="row p-1">
                    <div className="col-lg-3">
                      <h5 className="mb-1 font-weight-bold">Nom</h5>
                    </div>
                    <div className="col-lg-3 text-lg-center">
                      <h5 className="font-weight-bold">Prénom</h5>
                    </div>
                    <div className="col-lg-3 text-lg-center">
                      <h5 className="font-weight-bold">Role</h5>
                    </div>
                    <div className="col-lg-3 text-lg-center">
                      <h5 className="font-weight-bold">thj</h5>
                    </div>
                  </div>
                  <div className="list-group">
                    <UserListe />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <div className="card card text-dark mt-2">
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
                  <div className="list-group">
                    <TaskListe creator={creator} role={user.role} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card card text-dark mt-2">
                <div className="card-header d-flex justify-content-between">
                  <h4 className="font-weight-bold">Liste des projets</h4>
                  <button
                    onClick={e => this.collapsCard(e)}
                    name="listProjectsIsDeploy"
                    className={classnames('btn-down', {
                      btnDown: this.state.listProjectsIsDeploy,
                      btnUp: !this.state.listProjectsIsDeploy,
                    })}
                  />
                </div>
                <div
                  className={classnames('card-body', {
                    cardDeploy: this.state.listProjectsIsDeploy,
                    cardNotDeploy: !this.state.listProjectsIsDeploy,
                  })}
                >
                  <div className="row p-1">
                    <div className="col-lg-8">
                      <h5 className="mb-1 font-weight-bold">Nom</h5>
                    </div>
                    <div className="col-lg text-lg-center">
                      <h5 className="font-weight-bold">deadLine</h5>
                    </div>
                  </div>
                  <div className="list-group">
                    {/* <TaskListe creator={creator} role={user.role} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
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
              <div className="list-group">
                <TaskListe creator={creator} role={user.role} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Home);
