//Working on this later

import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import * as ROUTES from '../../constants/routes';
 
const BottomBar = () => (
  <div className = "Bottom-bar Shrink"> 
          <p><span><Link to={ROUTES.LANDING} className = "Bottom-link"> About Us </Link></span> <span>|</span> <span>Contact Us</span> </p>
  </div>
);
 
export default BottomBar;