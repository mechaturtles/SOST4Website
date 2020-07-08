import React from 'react';
 
import { withFirebase } from './firebase';
 
const SignOutButton = ({ firebase }) => (
  <p className = "Top-navigation" onClick={firebase.doSignOut}>
    Sign Out
  </p>
);
 
export default withFirebase(SignOutButton);