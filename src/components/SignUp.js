//Referenced Robin Wieruch

import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';


import { withFirebase } from './firebase';

const SignUpPage = () => (
  <div className = "Sign-up-page">
    <header>SignUp</header>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
    email: '',
    firstName: '',
    lastName: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
  
  class SignUpFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = event => {
      const { firstName, lastName, email, passwordOne } = this.state;
      
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push('/home');
          return this.props.firebase
          .user(authUser.user.uid)
          .set({
            firstName,
            lastName,
            email,
          });
        })
        .catch(error => {
          this.setState({ error });
        });
  
      event.preventDefault();
    };
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {
      const {
        email,
        firstName,
        lastName,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const nameFirst = (this.props.history.location.state && this.props.history.location.state.nameFirst) || "";

      const nameLast = (this.props.history.location.state && this.props.history.location.state.nameLast) || "";

      const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '';
  
      return (
        <div>
        <input
          name="firstName"
          type="text"
          value = {firstName}
          defaultValue = {nameFirst}
          onChange={this.onChange}
          placeholder={"First Name"}
        />
       <input
          name="lastName"
          type="text"
          value = {lastName}
          defaultValue = {nameLast}
          onChange={this.onChange}
          placeholder={"Last Name"}
        />
        <form onSubmit={this.onSubmit}>
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
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>
  
          {error && <p>{error.message}</p>}
        </form>
        </div>
      );
    }
  }
  
  const SignUpLink = () => (
    <p>
      Don't have an account? <Link to={'/signup'}>Sign Up</Link>
    </p>
  );
  
  const SignUpForm = withRouter(withFirebase(SignUpFormBase));
  
  export default SignUpPage;
  
  export { SignUpForm, SignUpLink };