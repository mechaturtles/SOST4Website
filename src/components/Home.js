import React, {Component} from 'react';
import syringe from './images/Syringe.jpg';
 
const INITIAL_STATE = {
  firstName: '',
  lastName: ''
};
 
class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onClicking = event => {
    const { firstName, lastName } = this.state; 

    this.props.history.push({
      pathname: '/signup',
      state: {
        nameFirst: firstName,
        nameLast: lastName
      }
    })}
    
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
      console.log(event.target.value);
    };

    render(){
      const {
        firstName,
        lastName,
      } = this.state;
      
      return(
  <div>
    <img src = {syringe} className = "Home-syringe-photo" alt = ""></img>
    <input className="Home-signup"
          name="firstName"
          value={firstName}
          onChange={this.onChange}
          type="text"
          placeholder="First Name"
        />
         <input
         className="Home-signup"
          name="lastName"
          value={lastName}
          onChange={this.onChange}
          type="text"
          placeholder="Last Name"
        />
      <button className="Home-signup" onClick = {this.onClicking} >Sign Up!</button>


  </div>
    )}};
 
export default HomePage;