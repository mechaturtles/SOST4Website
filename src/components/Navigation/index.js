import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
 
import { AuthUserContext } from '../Session';
 
const Navigation = () => (
  <div className = "no-margin">
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

//Admin should be hidden for non-admin roles
const NavigationAuth = () => (
  <div className = "Top-bar"> 
          <div className = "Top-link-logo"><p className = "Top-logo"> <Link to={ROUTES.HOME} className = "Top-no-decoration"> myHealthRadar </Link> </p></div>
          <div className = "Top-link-middle"><p className = "Top-navigation "> <Link to={ROUTES.HOME} className = "Top-no-decoration"> Appointments </Link> </p></div>
          <div className = "Top-link-middle"><p className = "Top-navigation Top-more-bottom"> <Link to={ROUTES.HOME} className = "Top-no-decoration"> Contact Provider </Link> </p></div>
          <div className = "Top-link-middle"><p className = "Top-navigation Top-more-bottom"> <Link to={ROUTES.HOME} className = "Top-no-decoration"> Past Data </Link> </p></div>
          <div className = "Top-link-middle"><p className = "Top-navigation "> <Link to={ROUTES.ADMIN} className = "Top-no-decoration "> Profile </Link> </p></div>
          <div className = "Top-link-end"> <SignOutButton /> </div>
  </div>
);

const NavigationNonAuth = () => (
  <div className = "Top-bar"> 
           <div className = "Top-link-logo"><p className = "Top-logo"> <Link to={ROUTES.LANDING} className = "Top-no-decoration"> myHealthRadar </Link> </p></div>
          <div className = "Top-link-sign-in"><p className = "Top-navigation"> <Link to={ROUTES.SIGN_IN} className = "Top-no-decoration "> Sign In </Link> </p></div>
  </div>
);
 
export default Navigation;