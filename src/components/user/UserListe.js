import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './user.scss';

const UserListe = props => {
  const { user, auth } = props;

  // test si le role es admin et si c nou mem 😉
  const modifIsAutoriser = (id, role) => {
    if (role === 'admin' && auth.uid !== id) return false;
    return true;
  };

  if (user.length > 0) {
    return user.map((item, index) => (
      <Link
        to={
          (modifIsAutoriser(item.id, item.role) && `/user-detail/${item.id}`) ||
          '/'
        }
        className={classnames('list-group-item list-group-item-action mb-2', {
          desactivated: !modifIsAutoriser(item.id, item.role),
        })}
        key={index}
      >
        <div className="row">
          <div className="col-lg-3">
            <h5>{item.lastName}</h5>
          </div>
          <div className="col-lg-3 text-lg-center">
            <h5>{item.firstName}</h5>
          </div>
          <div className="col-lg-3 text-lg-center">
            <h5>{item.role}</h5>
          </div>
          <div className="col-lg-3 text-lg-center">
            <h5>{item.thj} &euro;</h5>
          </div>
        </div>
      </Link>
    ));
  } else {
    return (
      <div>
        <h2 className="text-dark text-center">Aucuns utilisateur</h2>
      </div>
    );
  }
};

const mapStateToProps = state => {
  const users = state.firestore.ordered.users;
  return {
    auth: state.firebase.auth,
    user: users ? users : [],
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'users', orderBy: ['lastName', 'desc'] }])
)(UserListe);
