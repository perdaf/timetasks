import React, { Component } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authAction';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    authError: null,
  };

  // componentDidUpdate(prevProps) {
  //   const newProps = this.props;
  //   if (newProps.authError !== prevProps.authError) {
  //     this.setState(
  //       {
  //         authError: this.props.authError,
  //       },
  //       () => {
  //         console.log('state mise a jour >>>', this.state.authError);
  //       }
  //     );
  //   }
  // }

  handleOnChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

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

    let user = {
      email,
      password,
    };

    // auth the user
    this.props.onSignIn(user);

    //   if (authError !== null) {
    //     console.log("Message d'erreur >>>", authError);
    //   } else {
    //     console.log('authError >>>', authError);
    //     // clear the state
    //     this.setState({
    //       email: '',
    //       password: '',
    //       errors: {},
    //       authError: null,
    //     });
    //     // this.props.history.push(`/`);
    //   }
  };

  render() {
    const { authError, auth } = this.props;
    // redirect to home cause i'm already connected
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
            <div
              className="text-center mb-3"
              style={{ color: 'red', fontSize: '2rem' }}
            >
              {authError ? <p>{authError}</p> : null}
            </div>

            <div className="form-group d-flex justify-content-center">
              <input
                type="submit"
                value="Sign In"
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
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: user => dispatch(signIn(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
