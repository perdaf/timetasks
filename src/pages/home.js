import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import './CardDeploy.scss';

class Home extends Component {
  state = {};

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
    const { auth /*user*/ } = this.props;

    // const creator = auth.uid;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div>
        <div className="row">
          <div className="col-8">
            <h4>Chart</h4>
          </div>
          <div className="col-4">
            <h4>Notification</h4>
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

export default connect(mapStateToProps)(Home);
