import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import router from './router';
import {Link} from 'react-router-dom'
import Axios from 'axios';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
class App extends Component {
constructor() {
  super();
  this.state = {
    username: '',
    password: ''
  }
}


render() {
  console.log(window.location.pathname)
  return(
    <div>
      <div className="topnav" id="myTopnav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/forum">Forum</Link>
      </div>
      {router} {/* RENDER THE ROUTER HERE this is your slideshow*/}
      
    </div>
  )
}

}
export default App;
