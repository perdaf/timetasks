import React from 'react';
import { Redirect } from 'react-router-dom';
import Task from '../components/task/task';
import { connect } from 'react-redux';

const Home = props => {
  // redirect to signin in not connected
  const { auth, user } = props;
  console.log('USER >>>', user);
  const creator = user.lastName + ' ' + user.firstName;
  if (!auth.uid) return <Redirect to="/signin" />;

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
            <Task creator={creator} role={user.role} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Home);
