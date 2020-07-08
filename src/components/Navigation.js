import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import './App.css'
 
const Navigation = () => (
  <div className = "Top-bar"> 
        <Link to='/home' className = "Top-link"> <p className = "Top-logo">Medicus</p></Link>
        <Link to='/account' className = "Top-link"><p className = "Top-navigation">Account</p></Link>
        <Link to='/signin' className = "Top-link"><p className = "Top-navigation">Sign In</p></Link>
        <Link to='/' className = "Top-link"><SignOutButton /></Link>
  </div> 
);
 
export default Navigation;