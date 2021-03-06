import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authAction';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    thj: '',
    errors: {},
  };

  handleOnChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { email, password, firstName, lastName, thj } = this.state;

    if (email === '') {
      this.setState({ errors: { email: "L'email es requis" } });
      return;
    }
    if (password === '') {
      this.setState({
        errors: { password: 'Le mot de passe es requise' },
      });
      return;
    }
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
    if (thj === '') {
      this.setState({
        thj: 0,
      });
      return;
    }

    let newUser = {
      email,
      password,
      firstName,
      lastName,
      thj,
    };
    console.log('le nouvel utilisateur es >>>', newUser);
    // add the new task to firestore
    this.props.onSignUp(newUser);
  };

  render() {
    // redirect to home cause i'm already connected
    console.log('this props >>>', this.props);
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div>
        <div className="card">
          <div className="card-header text-dark" style={{ fontSize: '1.5rem' }}>
            Sign in
          </div>
          <div className="card-body" />
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group text-dark px-4">
              <label htmlFor="UserEmail">Email</label>
              <input
                type="email"
                autoComplete="User email"
                className={classnames('form-control', {
                  'is-invalid': this.state.errors.email,
                })}
                name="email"
                id="UserEmail"
                onChange={this.handleOnChange}
                placeholder="Enter your email..."
              />
              {this.state.errors.email && (
                <div className="invalid-feedback">
                  {this.state.errors.email}
                </div>
              )}
            </div>
            <div className="form-group text-dark px-4">
              <label htmlFor="UserPassword">Password</label>
              <input
                type="password"
                autoComplete="User password"
                className={classnames('form-control', {
                  'is-invalid': this.state.errors.password,
                })}
                name="password"
                id="UserPassword"
                onChange={this.handleOnChange}
                placeholder="Enter your password..."
              />
              {this.state.errors.password && (
                <div className="invalid-feedback">
                  {this.state.errors.password}
                </div>
              )}
            </div>
            <div className="form-group text-dark px-4">
              <label htmlFor="UserLastName">Name</label>
              <input
                type="text"
                autoComplete="User last name"
                className={classnames('form-control', {
                  'is-invalid': this.state.errors.lastName,
                })}
                name="lastName"
                id="UserLastName"
                onChange={this.handleOnChange}
                placeholder="Enter your name..."
              />
              {this.state.errors.lastName && (
                <div className="invalid-feedback">
                  {this.state.errors.lastName}
                </div>
              )}
            </div>
            <div className="form-group text-dark px-4">
              <label htmlFor="UserPassword">firstname</label>
              <input
                type="text"
                autoComplete="User firstName"
                className={classnames('form-control', {
                  'is-invalid': this.state.errors.firstName,
                })}
                name="firstName"
                id="UserFirstName"
                onChange={this.handleOnChange}
                placeholder="Enter your first name..."
              />
              {this.state.errors.firstName && (
                <div className="invalid-feedback">
                  {this.state.errors.firstName}
                </div>
              )}
            </div>
            <div className="form-group text-dark px-4">
              <label htmlFor="UserPassword">Votre taux horaire journalié</label>
              <input
                type="text"
                autoComplete="User thj"
                className="form-control"
                name="thj"
                id="Userthj"
                onChange={this.handleOnChange}
                placeholder="Entrer votre taux horaire journalié..."
              />
            </div>

            <div
              className="text-center mb-3"
              style={{ color: 'red', fontSize: '2rem' }}
            >
              {authError ? <p>{authError}</p> : null}
            </div>

            <div className="form-group d-flex justify-content-center">
              <input
                type="submit"
                value="Sign Up"
                className="btn btn-primary mb-3"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log('mapstateToProps > states >>>', state);
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: newUser => dispatch(signUp(newUser)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
