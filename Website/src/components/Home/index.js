import React, {Component} from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import GivenData from '../../constants/testingData.json';
import moment from 'moment';
import { AuthUserContext, withAuthorization } from '../Session';
import firebase from 'firebase/app';

var time = GivenData.events.map(function(e) {
  return e.systemTime;
});
var values = GivenData.events.map(function(e) {
  return e.value;
});
var coords = time.sort().map( (v,i) => ({ systemTime: moment(v).format("hh:mm a"), values: values.sort()[i] }) );

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: coords,
    };
  }
  
  render() {
    const { data: chartData } = this.state;
    console.log(firebase.auth().currentUser);
    return (
      <AuthUserContext.Consumer>
        {authUser => (
        <div className = "Home">
          <div className = "Home-header"> <header className = "Home-header-text"> Welcome, {firebase.auth().currentUser.providerData[0].email}! </header><br/>
          </div>
          <div className = "Home-sub"> <header className = "Home-sub-text"> Your dashboard for today: </header><br/>
          </div>
          <div className = "Home-body">
    
            <div className = "Body-elements">
              <div className = "Home-chart-header">
                last hour
              </div>
              <div className = "Home-chart">
                <Chart
                data={chartData}>
                  <ArgumentAxis />
                  <ValueAxis/>
                  
                  <LineSeries
                    name="Health Stats"
                    valueField="values"
                    argumentField="systemTime"
                    color="#004f04"
                  />

                  <Animation />
                </Chart>
              </div>
            </div>
          </div>
        </div>)}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);