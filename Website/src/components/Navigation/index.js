import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import logo from '../../images/Logo.png';

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
  <ul className = "Top-bar"> 
          <li className = "Top-logo"> <Link to={ROUTES.HOME} className = "Top-link"> <img src = {logo} alt="My Health Radar" className = "Top-logo-image"></img> </Link> </li>
          <SignOutButton />
          <li className = "Top-options"> <Link to={ROUTES.HOME} className = "Top-link"> Profile </Link> </li>
          <li className = "Top-options"> <Link to={ROUTES.HOME} className = "Top-link"> Past Data </Link> </li>
          <li className = "Top-options"> <Link to={ROUTES.HOME} className = "Top-link"> Contact Provider </Link> </li>
          <li className = "Top-options"> <Link to={ROUTES.APPOINTMENTS} className = "Top-link"> Appointments </Link> </li>
          <li className = "Top-options"> <Link to={ROUTES.HOME} className = "Top-link"> Home </Link> </li>
  </ul>
);

const NavigationNonAuth = () => (
  <div className = "Top-bar"> 
          <li className = "Top-logo"> <Link to={ROUTES.LANDING} className = "Top-link"> <img src = {logo} alt="My Health Radar" className = "Top-logo-image"></img> </Link> </li>
          <li className = "Top-options"> <Link to={ROUTES.HOME} className = "Top-link"> Sign In </Link> </li>
  </div>
);
 
export default Navigation;