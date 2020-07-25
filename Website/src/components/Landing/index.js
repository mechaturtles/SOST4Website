import React from 'react';
import '../../index.css';
import dex from '../../images/dexcom.png';
import fit from '../../images/fitbit2.png';
import omron from '../../images/omron.png';
import signal from '../../images/radar2.png';
 
const Landing = () => (
  <div className = "Landing-body">
        <div className = "Landing-top">
          <div className = "Landing-signal"><img src = {signal} alt = '' className = "Landing-signal-fit"></img></div>
          <header className = "Landing-top-header"> Welcome to the future of <span style={{ fontWeight: "bold", color: 'white'}}>Telehealth</span></header>
        </div>    
        <div className = "Landing-first-description"> 
            <header className = "Landing-title"> <span style={{ fontWeight: "bold", paddingRight: "15px"}}>myHealthRadar </span> by ConnecTech is </header>
            <p className = "Landing-text"> A moderate amount of information about some aspect of the solution, blah blah blah more stuff more stuff more stuff more stuff more stuff. Perhaps bullet points could work here as well. </p> 
        </div>
        <div className = "Landing-second-description"> 
              <header className = "Landing-title Landing-second Landing-second-text-color"> Supported Devices </header>
              <br />
              <span className = "Landing-second-inline">  
                <div className = "Landing-images"><img src = {dex} alt = '' className = "Landing-images-fit"></img></div>
                <div className = "Landing-images"><img src = {fit} alt = '' className = "Landing-images-fit"></img></div>
                <div className = "Landing-images"><img src = {omron} alt = '' className = "Landing-images-fit"></img></div>
              </span>
        </div>
  </div>
);
 
export default Landing;