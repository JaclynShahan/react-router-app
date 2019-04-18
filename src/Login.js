import React, { Component } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { Icon } from 'antd';
import Modal from './Modal';
import DrawerForm from './DrawerForm';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
    }
showDrawer = () => {
    console.log('hi')
        this.setState({
          visible: true,
        });
      };
      onClose = () => {
        this.setState({
          visible: false,
        });
      };
userChange = (e, stateProperty) => {
    this.setState({[stateProperty]: e.target.value})
  }
render() {
    console.log(this.state)
return( 
    <div className="wrapper">
    <div className="signin">
    <form>
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
    </form>
    <h4>Don't have an account?</h4>
    <button className='signup' onClick={this.showDrawer}> Sign Up<Icon type='user-add'/></button>
    <DrawerForm visible={this.state.visible} onClose={this.onClose}/>
    </div>
    </div>
    )
}
}

export default Login;

