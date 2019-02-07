import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserListe from '../components/user/UserListe';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './CardDeploy.scss';

class UsersPage extends Component {
  state = {
    listeUserIsDeploy: true,
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

    if (!auth.uid) return <Redirect to="/signin" />;
    if (user.role === 'admin') {
      return (
        <div className="card text-dark mt-2">
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
      );
    } else {
      return (
        <div className="card card text-dark mt-2 text-center">
          <div className="card-header">
            <h4 className="font-weight-bold">Erreur</h4>
          </div>
          <div className="card-body">
            Vous devez etre ADMIN pour visualiser cette page
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

export default connect(mapStateToProps)(UsersPage);
