import React from 'react';
import '../../index.css';
 
const Landing = () => (
  <div>
        <div className = "Landing-top">
          <div className = "Landing-first-description"> 
              <header className = "Landing-title"> Title </header>
              <p className = "Landing-text"> A moderate amount of information about some aspect of the solution, include some sort of symbol directly to the left of this paragraph. Perhaps bullet points could work here as well. </p> 
          </div>
        </div>
        <div className = "Landing-second-description"> 
              <header className = "Landing-title Landing-second Landing-second-text-color"> Title </header>
          <p className = "Landing-text Landing-second-text-color"> A moderate amount of information about some aspect of the solution, include some sort of symbol directly to the left of this paragraph. Perhaps bullet points could work here as well. </p> 
        </div>
  </div>
);
 
export default Landing;