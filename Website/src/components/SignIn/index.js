import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import iconboy from '../../images/iconboy2.png';
 
const SignInPage = () => (
  <div className = "Sign-in Shrink">
    <div className = "Sign-in-page">
      <div className = "Sign-in-page-text">
        <header className = "Sign-in-header">Sign In</header>
        <SignInForm />
      </div>
    </div>
  </div>
);
 
const INITIAL_STATE = {
  role: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { role } = this.state;
    
    var {email, password} = '';

    if (role == [ROLES.Provider]){
      //provider account
      email = "john@provider.com";
      password = "testing";
    } else {
      //patient account
      email = "billy@techpoint.com";
      password = "testing";
    }
 
    console.log(email);
    console.log(password);
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ role: event.currentTarget.value });
  };
 
  render() {
 
    return (
      <form onSubmit={this.onSubmit}>
        <button className = "Sign-in-button" style={{backgroundColor: "var(--main-light)"}} type="submit" value={[ROLES.Provider]} onClick={this.onChange}>
          <img className = "Sign-in-icon" src = {iconboy} alt = ''></img>
          <h1 className = "Sign-in-button-text">Sign In As Provider</h1>
        </button>
        <button className = "Sign-in-button" type="submit" value={[ROLES.Patient]} onClick={this.onChange}>
          <img className = "Sign-in-icon" src = {iconboy} alt = ''></img>
          <h1 className = "Sign-in-button-text">Sign In As Patient</h1>
        </button>
      </form>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };