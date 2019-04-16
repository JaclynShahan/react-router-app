import React, { Component } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

class Login extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

userChange = (e, stateProperty) => {
    this.setState({[stateProperty]: e.target.value})
  }
render() {
return( 
    <div className="wrapper">
    <form className="signin">
        <h2 className="login-header">Log in</h2>

    <input
    className="form-control"
     placeholder="username" 
    />
    <br></br>
    <input 
    className="form-control"
    placeholder="password"
    
    />
    <br></br>
    <button
    type="submit"
    className="login"
    >Login</button>
    <h4>Don't have an account? <button className="signup">Sign Up</button></h4>
    </form>
    </div>

    )
}
}

export default Login;

