import React, { Component } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { Icon } from 'antd';
import Modal from './Modal';
import DrawerForm from './DrawerForm';
import {connect} from 'react-redux';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            email: '',
            password: '',
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
 getUser = (e) => {
        e.preventDefault();
    Axios.get(`/api/getUser?email=${this.state.email}&password=${this.state.password}`).then((resp) => {console.log(resp)
    })

    this.onClear()
}

changeUser = (e, stateProperty) => {
    this.setState({[stateProperty]: e.target.value})
  }

onClear = () => {
  this.setState({
      email: '',
      password: '',
    
  })
}
render() {
    console.log(this.state)
    console.log(this.props)
return( 
    <div className="wrapper">
    <div className="signin">
    <form>
        <h2 className="login-header">Log in</h2>
    
    <Icon type='user'/>
    <input
    className="form-control"
     placeholder="Email" 
     value={this.state.email}
     onChange={e => this.changeUser(e, 'email')}
    />
    <br></br>
    <br></br>
    <Icon type='lock'/>
    <input
    type='password'
    className="form-control"
    placeholder="password"
    value={this.state.password}
    onChange={e => this.changeUser(e, 'password')} 
    />
    <br></br>
    <br></br>
    
    <button
    onClick={(e) => this.getUser(e)}
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

