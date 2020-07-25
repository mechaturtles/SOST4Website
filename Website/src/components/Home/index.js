import React, {Component} from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  SplineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, ValueScale } from '@devexpress/dx-react-chart';
import BillyData from '../../constants/BillyBob.json';
import FayData from '../../constants/FayWray.json';
import JackData from '../../constants/JackBlack.json';
import MarciaData from '../../constants/MarciaGarcia.json';
import MaryData from '../../constants/MarySmith.json';
import SallyData from '../../constants/SallyWalker.json';
import ScrollToTop from '../App/scrollToTop';
import moment from 'moment';
import { AuthUserContext, withAuthorization } from '../Session';
import firebase from 'firebase/app';
import * as ROLES from '../../constants/roles';
import dex from '../../images/dex.png';
import heart from '../../images/heart.png';
import iconboy from '../../images/iconboy.png';


class HomePage extends Component {
  render() {
    
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





/* Patient Page */

    /* Top Bar */

    class TopBar extends Component{
      
      render(){
        return(
        <div className = "no-margin Body-top-anti-div">
          <div className = "Body-top-block Body-top-block-icon">
            <img className = "Home-icon-image" src = {iconboy} alt = ''></img>
          </div>
          <div className = "Body-top-block">
            <div className = "Body-top-text">
              <span>First Name: <span style={{fontWeight: 'bold'}}>{this.props.dataSet.basicInfo[0].firstName}</span></span><br/>
              <span>Last Name: <span style={{fontWeight: 'bold'}}>{this.props.dataSet.basicInfo[0].lastName}</span></span><br/>
              <span>DOB: <span style={{fontWeight: 'bold'}}>{this.props.dataSet.basicInfo[0].dob}</span></span><br/>
            </div>
          </div>
          <div className = "Body-top-block Body-short-text">
            <div className = "Body-top-text">
              <span>Weight: <span style={{fontWeight: 'bold'}}>{this.props.dataSet.generalInfo[0].weight}</span></span><br/>
              <span>Height: <span style={{fontWeight: 'bold'}}>{this.props.dataSet.generalInfo[0].height}</span></span><br/>
              <span>BMI: <span style={{fontWeight: 'bold'}}>{this.props.dataSet.generalInfo[0].bmi}</span></span><br/>
            </div>
          </div>
          <div className = "Body-top-block">
            <div className = "Body-top-text">
              <span>Health Network: <span style={{fontWeight: 'bold'}}>{this.props.dataSet.generalInfo[0].network}</span></span><br/>
              <span>Main Provider: <span style={{fontWeight: 'bold'}}>{this.props.dataSet.generalInfo[0].provider}</span></span><br/>
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
        this.state = { name: ''};
      }

      componentDidMount() {
        var userId = firebase.auth().currentUser.uid;
        var comp = this;
        console.log(userId);

        firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
          console.log(snapshot.val());
            if (snapshot.val()){
                comp.setState({name: snapshot.val().firstName || ''})
              }
            }
          );
      }

      render() {
        //name hardcoded to ignore any errors
        return (
          <div className = "Home Shrink">
          <div className = "Home-header Shrink"> <header className = "Home-header-text Shrink"> Welcome, Billy! </header><br/>
          </div>
          <div className = "Home-sub Shrink"> <header className = "Home-sub-text Shrink"> Your dashboard for today: </header><br/>
          </div>
          <div className = "Home-body Shrink">
            <div className = "Home-body-line">
              <div className = "Body-top-element">
               <TopBar dataSet={BillyData}/>
              </div>
            </div>
              <div className = "Home-body-line">
                <BloodSugarChart dataSet={BillyData}/>
                <BloodSugarTable />
              </div>  
              <div className = "Home-body-line">
                <HeartRateChart dataSet={BillyData}/>
                <HeartRateTable />
              </div>
              <div className = "Home-body-line">
                <BloodPressureChart dataSet={BillyData}/>
                <BloodPressureTable />
              </div>
          </div>
        </div>
        );
      }
    }

    class BloodSugarChart extends Component{
      constructor() {
        super();
        this.state = { name: '', coords: [], dataSet: [] };
      }

      getTime() {
        if (this.state.dataSet.glucose){
          return this.state.dataSet.glucose.map(function(e) {
          return e.systemTime;
          });
        }
      }

      getBS() {
        if (this.state.dataSet.glucose){
          return this.state.dataSet.glucose.map(function(e) {
            return e.value;
          });
        }
      }

      componentDidMount() {
        var comp = this;
        var timeGl = [];
        var glu = [];
        
        comp.setState({dataSet: this.props.dataSet}, () => {
          timeGl = this.getTime();
          glu = this.getBS();
          var coordsFromData = timeGl.sort().map( (v,i) => ({ systemTime: moment(v).format("hh:mm a"), glu: glu.sort()[i] }) );
          comp.setState({coords: coordsFromData}, () => {
          console.log(comp.state.coords)});
        });

      }

      
      render(){
        const gluDomain = () => [0, 350];

      return(<div className = "Body-elements">
            <div className = "Home-chart-header Home-chart-header-2">
              Blood Sugar Over Time
            </div>
            <div className = "Home-chart-header">
              past few mins
            </div>
            <div className = "Home-chart">
              <Chart
              data={this.state.coords}
              className = "Chart">
                <ArgumentAxis />
                <ValueScale modifyDomain={gluDomain} />
                <ValueAxis/>
                
                <SplineSeries
                  name="Health Stats"
                  valueField="glu"
                  argumentField="systemTime"
                  color="#004f04"
                />

                <Animation />
              </Chart>
            </div>
          </div>
        )
      }
    }

    const BloodSugarTable = () => (
      <div className = "Body-elements Body-element-smaller">
        <h1 className="Home-table-header">Blood Sugar</h1>
        <br />
        <div className = "Home-dex"><img className = "Home-dex-image" src = {dex} alt = ''></img></div>
        <div className = "Home-dex-image-text">120 mg/dL</div>
        <h2 className = "Home-dex-sub">Imported from<span style={{fontWeight: "bold", paddingLeft: '6px'}}>Dexcom G6</span></h2>
      </div>
    );

    const BloodPressureTable = () => (
        <div className = "Body-elements Body-element-smaller">
          <h1 className="Home-table-header">Blood Pressure</h1>
          <table>
            <tbody>
              <tr className = "Home-table-text">
                  <td className = "Home-table-text-time">Now</td>
                  <td className = "Home-table-values">180&frasl;90</td>
              </tr>
              <tr className = "Home-table-text Home-table-white-cell">
                  <td className = "Home-table-text-time Home-table-text-time-less-pad">Average of Last 5 Days</td>
                  <td className = "Home-table-values">140&frasl;85</td>
              </tr>
              <tr className = "Home-table-text">
                  <td className = "Home-table-good Home-table-text-time">Target</td>
                  <td className = "Home-table-values Home-table-good">120&frasl;80</td>
              </tr>
            </tbody>
          </table>
        </div>
    );

    class BloodPressureChart extends Component{
      constructor() {
        super();
        this.state = { name: '', coords: [], dataSet: [] };
      }

      getTime() {
        if (this.state.dataSet.bloodPressure){
          return this.state.dataSet.bloodPressure.map(function(e) {
          return e.systemTime;
          });
        }
      }

      getSys() {
        if (this.state.dataSet.bloodPressure){
          return this.state.dataSet.bloodPressure.map(function(e) {
            return e.systolic;
          });
        }
      }

      getDia() {
        if (this.state.dataSet.bloodPressure){
          return this.state.dataSet.bloodPressure.map(function(e) {
            console.log(e.diastolic);
            return e.diastolic;
          });
        }
      }

      componentDidMount() {
        var comp = this;
        var timeBP = [];
        var systolic = [];
        var diastolic = [];
        
        comp.setState({dataSet: this.props.dataSet}, () => {
          timeBP = this.getTime();
          systolic = this.getSys();
          diastolic = this.getDia();
          var coordsFromData = timeBP.sort().map( (v,i) => ({ systemTime: moment(v).format("MMM DD"), sys: systolic.sort()[i], dia: diastolic.sort()[i]  }) );
          comp.setState({coords: coordsFromData}, () => {
          console.log(comp.state.coords)});
        });

      }

      
      render(){
      const bpDomain = () => [40, 190];

      return(<div className = "Body-elements">
            <div className = "Home-chart-header Home-chart-header-2">
              Blood Pressure Over Time
            </div>
            <div className = "Home-chart-header">
              past day
            </div>
            <div className = "Home-chart">
              <Chart
              data={this.state.coords}
              className = "Chart">
                <ArgumentAxis />
                <ValueScale modifyDomain={bpDomain} />
                <ValueAxis/>
                
                <SplineSeries
                  name="Systolic"
                  valueField="sys"
                  argumentField="systemTime"
                  color="#C03221"
                />

                <SplineSeries
                  name="Diastolic"
                  valueField="dia"
                  argumentField="systemTime"
                  color="#819CA9"
                />

                <Animation />
              </Chart>
            </div>
          </div>
        )
      }
    }

    class HeartRateChart extends Component{
      constructor() {
        super();
        this.state = { name: '', coords: [], dataSet: [] };
      }

      getTime() {
        if (this.state.dataSet.bloodPressure){
          return this.state.dataSet.bloodPressure.map(function(e) {
          return e.systemTime;
          });
        }
      }

      getHr() {
        if (this.state.dataSet.bloodPressure){
          return this.state.dataSet.heartRate.map(function(e) {
            return e.value;
          });
        }
      }

      componentDidMount() {
        var comp = this;
        var timeHr = [];
        var hr = [];
        
        comp.setState({dataSet: this.props.dataSet}, () => {
          timeHr = this.getTime();
          hr = this.getHr();
          var coordsFromData = timeHr.sort().map( (v,i) => ({ systemTime: moment(v).format("hh:mm a"), hr: hr.sort()[i] }) );
          comp.setState({coords: coordsFromData}, () => {
          console.log(comp.state.coords)});
        });

      }

      
      render(){
        const hrDomain = () => [0, 220];

      return(<div className = "Body-elements">
            <div className = "Home-chart-header Home-chart-header-2">
              Heart Rate Over Time
            </div>
            <div className = "Home-chart-header">
              past hour
            </div>
            <div className = "Home-chart">
              <Chart
              data={this.state.coords}
              className = "Chart">
                <ArgumentAxis />
                <ValueScale modifyDomain={hrDomain} />
                <ValueAxis/>
                
                <SplineSeries
                  name="Health Stats"
                  valueField="hr"
                  argumentField="systemTime"
                  color="#29434e"
                />

                <Animation />
              </Chart>
            </div>
          </div>
        )
      }
    }

    const HeartRateTable = () => (
      <div className = "Body-elements Body-element-smaller">
        <h1 className="Home-table-header">Heart Rate</h1>
        <div className = "Home-heart"><img className = "Home-heart-image" src = {heart} alt = ''></img></div>
        <div className = "Home-dex-image-text Home-heart-text"><span style={{fontSize: '25px', whiteSpace: 'nowrap'}}>60 bpm</span></div>
        <h2 className = "Home-dex-sub Home-heart-sub">Imported from<span style={{fontWeight: "bold", paddingLeft: '6px'}}>Fitbit Charge 3</span></h2>
      </div>
    );

    class HealthInsights extends Component{
      render(){
      return(
      <div className = "no-margin Body-top-anti-div">
          <div className = "Home-insights-block">
            <div className = "Home-insights-text">
              <span style={{marginLeft: '30px', marginRight: '30px'}}>Glucose: <span style={{fontWeight: 'bold', color: '#60ac5d'}}>{this.props.dataSet.insights[0].glucose}</span></span><br/>
              <span style={{marginLeft: '30px', marginRight: '30px'}}>Heart Rate: <span style={{fontWeight: 'bold', color: '#60ac5d'}}>{this.props.dataSet.insights[0].heartRate}</span></span><br/>
              <span style={{marginLeft: '30px', marginRight: '30px'}}>Blood Pressure: <span style={{fontWeight: 'bold', color: '#C03221'}}>{this.props.dataSet.insights[0].bloodPressure}</span></span><br/>
            </div>
          </div>
        </div>
        )
      }
    }














/* Provider Page */


    class HomeProvider extends Component{
      constructor() {
        super();
        this.state = { ViewPatient: false, Patient: [] };
      }

      triggerAddTripState = (dataSet) => {
        console.log(dataSet);
        this.setState({
          ...this.state,
          Patient: dataSet,
          ViewPatient: !this.state.ViewPatient
          })
      }


      render(){
        return(
          this.state.ViewPatient ? <PatientPage addTrip = {this.triggerAddTripState} dataSet = {this.state.Patient}/> : <MainPage addTrip = {this.triggerAddTripState} />
        );    
      }
    };

    class MainPage extends Component{ 
      constructor() {
        super();
        this.state = { name: '' };
      }

      componentDidMount() {
        var userId = firebase.auth().currentUser.uid;
        var comp = this;

       // firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
         // comp.setState({name: snapshot.val().firstName || 'User'})});
      }

      render(){
        return(
        <ScrollToTop>
        <div className = "Home Shrink">
          <div className = "Home-header Shrink"> 
            <header className = "Home-header-text Shrink"> Welcome, John! </header><br/>
          </div>
          <div className = "Home-sub Shrink"> <header className = "Home-sub-text Shrink"> Here's how your clients are doing today: </header><br/>
          </div>
          <div className = "Home-body Home-body-ex-lite Shrink">
            <div className = "Home-body-line">
              <div className = "Body-top-element" onClick={() => this.props.addTrip(BillyData)}> 
               < TopBar dataSet={BillyData} className = "Home-provider-click" />
              </div>
            </div>
            <div className = "Home-body-line">
              <div className = "Body-top-element" onClick={() => this.props.addTrip(FayData)}> 
                < TopBar dataSet={FayData} className = "Home-provider-click"/>
              </div>
            </div>
            <div className = "Home-body-line">
              <div className = "Body-top-element" onClick={() => this.props.addTrip(JackData)}> 
                < TopBar dataSet={JackData}/>
              </div>
            </div>
            <div className = "Home-body-line">
              <div className = "Body-top-element" onClick={() => this.props.addTrip(MarciaData)}> 
                < TopBar dataSet={MarciaData}/>
              </div>
            </div>
            <div className = "Home-body-line">
              <div className = "Body-top-element" onClick={() => this.props.addTrip(MaryData)}> 
                < TopBar dataSet={MaryData}/>
              </div>
            </div>
            <div className = "Home-body-line">
            <div className = "Body-top-element" onClick={() => this.props.addTrip(SallyData)}> 
                < TopBar dataSet={SallyData}/>
              </div>
            </div>
          </div>
        </div>
        </ScrollToTop>
        )}
    };

    class PatientPage extends Component {
      componentDidMount() {
        var user = this.props.userData;
        var comp = this;
      }

      render() {
        return (
          <ScrollToTop>
          <div className = "Home Shrink">
          <div className = "Home-body Home-body-lil-big Shrink">
              <div className = "Home-body-line">
                <div className = "Home-top-button" onClick={() => this.props.addTrip([])}>
                  <h1>Go Back</h1>
                </div>
              </div>
              <div className = "Home-body-line">
                  <div className = "Body-top-element">
                    <TopBar dataSet={this.props.dataSet}/>
                  </div>
              </div>
              <div className = "Home-body-line">
                  <div className = "Body-top-element">
                    <HealthInsights dataSet={this.props.dataSet}/>
                  </div>
              </div>
              <div className = "Home-body-line">
                <BloodSugarChart dataSet={this.props.dataSet}/>
                <BloodSugarTable dataSet={this.props.dataSet}/>
              </div>  
              <div className = "Home-body-line">
                <HeartRateChart dataSet={this.props.dataSet}/>
                <HeartRateTable dataSet={this.props.dataSet}/>
              </div>
              <div className = "Home-body-line">
                <BloodPressureChart dataSet={this.props.dataSet}/>
                <BloodPressureTable dataSet={this.props.dataSet}/>
              </div>
          </div>
        </div>
        </ScrollToTop>
        );
      }
    };


const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);