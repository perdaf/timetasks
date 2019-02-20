import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ProjectListe from '../components/project/ProjectListe';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './CardDeploy.scss';

class ProjectsPage extends Component {
  state = {
    listProjectsIsDeploy: true,
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

    return (
      <div className="card card-listProj text-dark mt-2">
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
          <div className="ProjectList d-flex flex-wrap align-items-center justify-content-around">
            {<ProjectListe role={user.role} />}
          </div>
          {/* <div className="list-group">{<ProjectListe role={user.role} />}</div> */}
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

export default connect(mapStateToProps)(ProjectsPage);
