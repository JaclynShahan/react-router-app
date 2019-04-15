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
<div>
<form>
<input
value={this.state.username}
placeholder='Username'
onChange={e => this.userChange(e, 'username')}
/>
<input 
value={this.state.password}
placeholder='Password'
onChange={e => this.userChange(e, 'password')}
/>
<button type='submit'>LOGIN</button>
</form>
        </div>
    )
};
}

export default Login;

