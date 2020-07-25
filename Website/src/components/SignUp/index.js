import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';



const SignUpPage = () => (
  <div className = "Sign-in">
    <div className = "Sign-in-page">
      <div className = "Sign-in-page-text">
    <h1>SignUp</h1>
    <SignUpForm />
    </div>
  </div>
  </div>
);

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE};
  }

  // Routes to Home after successful submission
  onSubmit = event => {
    const { firstName, lastName, email, passwordOne, isAdmin } = this.state;
    const roles = {};
 
    if (isAdmin) {
      roles[ROLES.Provider] = ROLES.Provider;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .updateProfile({displayName: firstName})
          .set({
            firstName,
            lastName,
            email,
            roles,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
 
  render() {
    const {
        firstName,
        lastName,
        email,
        passwordOne,
        passwordTwo,
        isAdmin,
        error,
      } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    firstName === '' ||
    lastName === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="firstName"
          type="text"
          value = {firstName}
          onChange={this.onChange}
          placeholder={"First Name"}
        />
       <input
          name="lastName"
          type="text"
          value = {lastName}
          onChange={this.onChange}
          placeholder={"Last Name"}
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <br />
        <button disabled={isInvalid} type="submit">Sign Up</button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p className = "Sign-in-sign-up">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };