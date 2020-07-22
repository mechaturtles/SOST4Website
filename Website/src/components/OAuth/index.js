import React, { Component } from "react";
import { Route } from "react-router-dom";
import DexcomOAuth from "./dexcom"

class OAuth extends Component {
  render() {
      return ( 
        <div>    
          Nope
          Nope
          Nope
          Nope
          Nope 
          <Route path={"/oauth/dexcom"} component={DexcomOAuth} />
        </div>
      );
  }
}

export default OAuth;

