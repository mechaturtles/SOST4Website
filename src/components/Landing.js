import React, {Component} from 'react';
import './App.css'


class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className = "Landing-top">
          <p className = "Landing-header">Telehealth made simple</p>
        </div>
        <div className = "Landing-body">
          <p className = "Landing-description"> We do cool stuff. </p>
        </div>
      </div>
    )
  }
}
 
export default LandingPage;