import React, {Component} from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation} from '@devexpress/dx-react-chart';
import GivenData from '../../constants/testingData.json';
import moment from 'moment';
import { AuthUserContext, withAuthorization } from '../Session';
import firebase from 'firebase/app';
import * as ROLES from '../../constants/roles';
import dex from '../../images/dex.png';
import heart from '../../images/heart.png';
import iconboy from '../../images/iconboy.png';

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
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          (authUser.role == [ROLES.Provider] ?
            (<HomeProvider/>) : (<HomePatient/>))
        }
      </AuthUserContext.Consumer>
    );
  }
}

/* Top Bar */

class TopBar extends Component{
  constructor() {
    super();
    this.state = { 
    firstName: '',
    lastName : ''
   };
  }

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;
    var comp = this;

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      comp.setState({firstName: (snapshot.val().firstName )  || ''})
      comp.setState({lastName: (snapshot.val().lastName )  || ''})
    });
  }
  
  render(){
    return(<div className = "Body-top-element">
      <div className = "Body-top-block Body-top-block-icon">
        <img className = "Home-icon-image" src = {iconboy} alt = ''></img>
      </div>
      <div className = "Body-top-block">
        <div className = "Body-top-text">
          <span>First Name: <span style={{fontWeight: 'bold'}}>{this.state.firstName}</span></span><br/>
          <span>Last Name: <span style={{fontWeight: 'bold'}}>{this.state.lastName}</span></span><br/>
          <span>DOB: <span style={{fontWeight: 'bold'}}>01/01/0001</span></span><br/>
        </div>
      </div>
      <div className = "Body-top-block">
        <div className = "Body-top-text">
          <span>Weight: <span style={{fontWeight: 'bold'}}>55 lbs</span></span><br/>
          <span>Height: <span style={{fontWeight: 'bold'}}>5'5"</span></span><br/>
          <span>BMI: <span style={{fontWeight: 'bold'}}>23 kg/m2</span></span><br/>
        </div>
      </div>
      <div className = "Body-top-block">
        <div className = "Body-top-text Body-long-text">
          <span>Health Network: <span style={{fontWeight: 'bold'}}>Advent Health</span></span><br/>
          <span>Main Provider: <span style={{fontWeight: 'bold'}}>John Johnston</span></span><br/>
        </div>
      </div>
    </div>
    );
  }
}

/* Patient Page */

class HomePatient extends Component {
  constructor() {
    super();
    this.state = { name: '' };
  }

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;
    var comp = this;

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      comp.setState({name: snapshot.val().firstName || ''})});
  }

  render() {
    return (
      <div className = "Home Shrink">
      <div className = "Home-header Shrink"> <header className = "Home-header-text Shrink"> Welcome, {this.state.name}! </header><br/>
      </div>
      <div className = "Home-sub Shrink"> <header className = "Home-sub-text Shrink"> Your dashboard for today: </header><br/>
      </div>
      <div className = "Home-body Shrink">
         <div className = "Home-body-line">
           <TopBar />
         </div>
          <div className = "Home-body-line">
            <BloodSugarChart />
            <BloodSugarTable />
          </div>  
          <div className = "Home-body-line">
            <HeartRateChart />
            <HeartRateTable />
          </div>
          <div className = "Home-body-line">
            <BloodPressureChart />
            <BloodPressureTable />
          </div>
      </div>
    </div>
    );
  }
}

const BloodPressureChart = () => (
  <div className = "Body-elements">
        <div className = "Home-chart-header Home-chart-header-2">
          Blood Pressure Over Time
        </div>
        <div className = "Home-chart-header">
          last hour
        </div>
        <div className = "Home-chart">
          <Chart
          data={coords}
          className = "Chart">
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
);

const BloodPressureTable = () => (
     <div className = "Body-elements Body-element-smaller">
       <h1 className="Home-table-header">Blood Pressure</h1>
       <table>
         <tbody>
           <tr className = "Home-table-text">
               <td className = "Home-table-text-time">Now</td>
               <td className = "Home-table-values">90&frasl;60</td>
           </tr>
           <tr className = "Home-table-text Home-table-white-cell">
               <td className = "Home-table-text-time Home-table-text-time-less-pad">Average of Last 5 Hours</td>
               <td className = "Home-table-values">140&frasl;90</td>
           </tr>
           <tr className = "Home-table-text">
               <td className = "Home-table-good Home-table-text-time">Target</td>
               <td className = "Home-table-values Home-table-good">120&frasl;80</td>
           </tr>
         </tbody>
       </table>
     </div>
);

const BloodSugarChart = () => (
  <div className = "Body-elements">
        <div className = "Home-chart-header Home-chart-header-2">
          Blood Sugar Over Time
        </div>
        <div className = "Home-chart-header">
          last hour
        </div>
        <div className = "Home-chart">
          <Chart
          data={coords}
          className = "Chart">
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
);

const BloodSugarTable = () => (
  <div className = "Body-elements Body-element-smaller">
    <h1 className="Home-table-header">Blood Sugar</h1>
    <img className = "Home-dex-image" src = {dex} alt = ''></img>
    <div className = "Home-dex-image-text">120 mg/dL</div>
    <h2 className = "Home-dex-sub">Imported from<span style={{fontWeight: "bold", paddingLeft: '6px'}}>Dexcom G6</span></h2>
  </div>
);

const HeartRateChart = () => (
  <div className = "Body-elements">
        <div className = "Home-chart-header Home-chart-header-2">
          Heart Rate Over Time
        </div>
        <div className = "Home-chart-header">
          last hour
        </div>
        <div className = "Home-chart">
          <Chart
          data={coords}
          className = "Chart">
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
);

const HeartRateTable = () => (
  <div className = "Body-elements Body-element-smaller">
    <h1 className="Home-table-header">Heart Rate</h1>
    <div className = "Home-heart"><img className = "Home-heart-image" src = {heart} alt = ''></img></div>
    <div className = "Home-dex-image-text Home-heart-text">120 bpm</div>
    <h2 className = "Home-dex-sub">Imported from<span style={{fontWeight: "bold", paddingLeft: '6px'}}>Fitbit Charge 3</span></h2>
  </div>
);

/* Provider Page */

class HomeProvider extends Component{
    state = {
      ViewPatient: false,
    }

  render(){
    return(
      this.state.ViewPatient ? null : <MainPage />
    );    
  }
};

class MainPage extends Component{ 
  constructor() {
    super();
    this.state = { name: 'User' };
  }

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;
    var comp = this;

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      comp.setState({name: snapshot.val().firstName || 'User'})});
  }

  render(){
    return(
    <div className = "Home Shrink">
      <div className = "Home-header Shrink"> 
        <header className = "Home-header-text Shrink"> Welcome, {this.state.name}! </header><br/>
      </div>
      <div className = "Home-sub Shrink"> <header className = "Home-sub-text Shrink"> Here's how your clients are doing today: </header><br/>
      </div>
      <div className = "Home-body Home-body-lite Shrink">
        <div className = "Home-body-line">
          < TopBar />
        </div>
        <div className = "Home-body-line">
          < TopBar />
        </div>
        <div className = "Home-body-line">
         < TopBar />
         </div>
      </div>
    </div>
    )}
};


const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);