import React, { Component } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { Icon } from 'antd';
import Modal from './Modal';

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
    
    <Icon type='user'/>
    <input
    className="form-control"
     placeholder="username" 
    />
    <br></br>
    <br></br>
    <Icon type='lock'/>
    <input
    className="form-control"
    placeholder="password"
    
    />
    <br></br>
    <br></br>
    <button
    type="submit"
    className="login"
    >Login</button>
    <h4>Don't have an account?</h4><button  className='signup'><Modal onDelete={this.onDelete} adduser={this.props.addUser}/>Sign Up<Icon type='user-add'/> </button>
    </form>
    </div>

    )
}
}

export default Login;

