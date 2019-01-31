import React, { Component } from 'react';
import classnames from 'classnames';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
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
    console.log("l'utilisateur es >>>", user);
    // add the new task to firestore
    // this.props.onAddTask(newtask);

    // clear the state
    this.setState({
      email: '',
      password: '',
      errors: {},
    });
    this.props.history.push(`/`);
  };

  render() {
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

export default SignIn;
