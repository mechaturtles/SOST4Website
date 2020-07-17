import React from 'react';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
 
const SignOutButton = ({ firebase }) => (
  <p className = "Top-navigation" onClick = {firebase.doSignOut}> <Link to={ROUTES.HOME} className = "Top-no-decoration"> Sign Out </Link> </p>
);
 
export default withFirebase(SignOutButton);