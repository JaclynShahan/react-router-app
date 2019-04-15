import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import router from './router';
import {Link} from 'react-router-dom'
import Axios from 'axios';
import Login from './Login';
import Home from './Home';
class App extends Component {
constructor() {
  super();
  this.state = {
    username: '',
    password: ''
  }
}


render() {
  return(
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
      {router} {/* RENDER THE ROUTER HERE this is your slideshow*/}
      
    </div>
  )
}

}
export default App;
