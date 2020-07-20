import React from 'react';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
 
const SignOutButton = ({ firebase }) => (
  <li className = "Top-options" onClick ={firebase.doSignOut}> <Link to={ROUTES.HOME} className = "Top-link"> Sign Out </Link> </li>
);
 
export default withFirebase(SignOutButton);