import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';

import * as $ from 'jquery';

import Modal from '../layout/modal/Modal';

import { connect } from 'react-redux';
import { editUser } from '../../store/actions/userAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {
        lastName: '',
        firstName: '',
        role: '',
        thj: '',
      },
      errors: {},
    };
  }
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.user !== newProps.user) {
      this.setState(
        {
          user: {
            ...newProps.user,
          },
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
        user: {
          ...this.props.user,
        },
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
        user: {
          ...this.state.user,
          [name]: value,
        },
      },
      () => {
        console.log('state after onChange >>> ', this.state);
      }
    );
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, thj, role } = this.state.user;

    if (lastName === '') {
      this.setState({
        errors: { lastName: 'Le nom es requise' },
      });
      return;
    }
    if (firstName === '') {
      this.setState({
        errors: { firstName: 'Le prenom es requise' },
      });
      return;
    }
    if (thj === '' || thj === undefined) {
      this.setState({
        user: {
          ...this.state.user,
          thj: 0,
        },
      });
      return;
    }

    let newUser = {
      firstName,
      lastName,
      thj,
      role,
    };
    console.log('utilisateur es >>>', newUser);
    // add the new task to firestore
    if (this.state.user) {
      this.props.onUpdateUser(this.state.id, newUser);
    }

    // reset state
    this.setState({
      user: {
        lastName: '',
        firstName: '',
        role: '',
        thj: '',
      },
      errors: {},
    });

    this.props.history.push('/');
  };

  toggleModalSuppUser = id => {
    $('#ConfirmDelete').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        // this.props.onDeleteTask(id);
        $('#ConfirmDelete').modal('hide');
        this.props.history.push(`/`);
      });
  };

  render() {
    // redirect to signin in not connected
    const { auth, user, thisUser } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    const { errors } = this.state;

    // check if the current user is admin
    const isAdmin = () => {
      if (thisUser.role === 'admin') return true;
      return false;
    };

    const renderSelect = role => {
      if (isAdmin()) {
        if (user.id === auth.uid) {
          return null;
        } else {
          return (
            <div className="form-group text-dark px-4 font-weight-bold">
              <label htmlFor="role">Role :</label>
              <select
                type="text"
                autoComplete="User role"
                className="form-control"
                name="role"
                id="role"
                onChange={this.handleOnChange}
                placeholder="Enter le role (admin, user)"
                defaultValue={role}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
          );
        }
      }
    };

    if (user) {
      const { lastName, firstName, thj, role } = user;
      return (
        <div>
          <Modal
            ModalName="ConfirmDelete"
            ModalTitle="confirme delete"
            ModalContent="Voulez vous vraiment supprimer cet utilisateur ?"
            ModalBtnLabel="Confime"
          />

          <div className="card text-dark mt-2">
            <div className="card-header text-center">
              <h4 className="font-weight-bold" style={{ fontSize: '2rem' }}>
                user detail
              </h4>
            </div>
            <div className="card-body text-dark">
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group text-dark px-4 font-weight-bold">
                  <label htmlFor="Name">Nom :</label>
                  <input
                    type="text"
                    autoComplete="User name"
                    className={classnames('form-control', {
                      'is-invalid': errors.lastName,
                    })}
                    name="lastName"
                    id="userName"
                    onChange={this.handleOnChange}
                    placeholder="Enter le nom"
                    defaultValue={lastName}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>

                <div className="form-group text-dark px-4 font-weight-bold">
                  <label htmlFor="FirstName">Prénom :</label>
                  <input
                    type="text"
                    autoComplete="User lastname"
                    className={classnames('form-control', {
                      'is-invalid': errors.firstName,
                    })}
                    name="firstName"
                    id="FirstName"
                    onChange={this.handleOnChange}
                    placeholder="Enter le prénom"
                    defaultValue={firstName}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>

                <div className="form-group text-dark px-4 font-weight-bold">
                  <label htmlFor="thj">THJ :</label>
                  <input
                    type="text"
                    autoComplete="User thj"
                    className="form-control"
                    name="thj"
                    id="thj"
                    onChange={this.handleOnChange}
                    placeholder="Enter le taux horaire journalier"
                    defaultValue={thj}
                  />
                </div>
                {renderSelect(role)}
                <div className="form-group d-flex justify-content-center">
                  <input
                    type="submit"
                    value="Enregistrer"
                    className="btn btn-primary mb-3 mr-3"
                  />
                  {isAdmin() && (
                    <input
                      type="button"
                      className="btn btn-danger mb-3 mx-3"
                      value="Supprimer"
                      onClick={() => this.toggleModalSuppUser(this.state.id)}
                    />
                  )}

                  <input
                    type="button"
                    className="btn btn-info mb-3 ml-3"
                    value="Annuler"
                    onClick={() => this.props.history.goBack()}
                  />
                </div>
              </form>
            </div>
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
  const users = state.firestore.ordered.users;
  //   const user = users ? users.filter(user => user.id === id)[0] : null;
  return {
    auth: state.firebase.auth,
    user: users ? users.filter(user => user.id === id)[0] : null,
    thisUser: state.firebase.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onDeleteUser: id => dispatch(deleteUser(id)),
    onUpdateUser: (id, user) => dispatch(editUser(id, user)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'users', orderBy: ['lastName', 'desc'] }])
)(UserDetail);
