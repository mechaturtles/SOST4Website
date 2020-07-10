import React, {Component} from 'react';
import Chart from 'chart.js';
import Data from './testingData.json';
import moment from 'moment';

import { withFirebase } from './firebase';

class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      
    };
  }
  
  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
 
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }
  
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  
  render() {

    const { users, loading } = this.state;

    var charty = document.getElementsByClassName("theOneChart")
    var mcchart = document.getElementsByClassName("theOtherChart")

    var time = Data.events.map(function(e) {
      return e.systemTime;
   });
   var values = Data.events.map(function(e) {
      return e.value;
   });;
   
    var lineGraph = new Chart(charty, {
        type: "line",
        data: {
          labels: time.sort(),
          datasets: [{
             label: 'Line Graph',
             data: values.sort(),
             backgroundColor: 'rgba(0, 119, 204, 0.3)'
          }]
       }
    })

    var coords = time.sort().map( (v,i) => ({ x: moment(v), y: values.sort()[i] }) )

    console.log(coords);

    var scatterPlot = new Chart(mcchart, {
      type: "scatter",
      data: {
        datasets: [{
           label: 'Scatter Plot',
           data: coords,
           backgroundColor: 'rgba(0, 119, 204, 0.3)'
        }]
     }
  })
    
    return (
      <div>
        <canvas className = "theOneChart"></canvas>
        <canvas className = "theOtherChart"></canvas>
        <p> Yeah the x axis is ugly </p>
            {loading && <div>Loading ...</div>}
            <UserList users={users} />
          </div>
        );
      }
    }

    const UserList = ({ users }) => (
      <ul>
        This is me testing authentication and stuff
        {users.map(user => (
          <li key={user.uid}>
            <span>
              <strong>ID: </strong> {user.uid}
            </span>
            <span>
              <strong> E-Mail: </strong> {user.email}
            </span>
            <span> 
              <strong> First Name: </strong> {user.firstName}
            </span>
            <span>
              <strong> Last Name: </strong> {user.lastName}
            </span>
          </li>
        ))}
      </ul>
    );

    export default withFirebase(AccountPage);