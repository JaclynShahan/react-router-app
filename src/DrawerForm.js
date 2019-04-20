import React, { Component } from 'react';
import { Drawer, Button, Icon } from 'antd';
import Axios from 'axios';

class DrawerForm extends Component {
  constructor(){
    super();
   this.state = {
    visible: false, 
    firstName: '',
    lastName: '',
    email: '',
    createUsername: '',
    createPassword: ''


  }
  }
  addUser = (e) => {
    e.preventDefault();
Axios.post('/api/addUser', {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    email: this.state.email,
    createUsername: this.state.createUsername,
    createPassword: this.state.createPassword,

}).then((resp) => {console.log(resp)})
this.onClear()
}
userChange = (e, stateProperty) => {
  this.setState({[stateProperty]: e.target.value})
}

onClear = () => {
this.setState({
  firstName: '',
  lastName: '',
  email: '',  
  createUsername: '',
  createPassword: ''
})
}

  render() {
  
    return (
      
        <Drawer
          title="Create an Account"
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <input 
          className='form-control'
          placeholder='First Name'
          value={this.state.firstName}
          onChange={e => this.userChange(e, 'firstName')}
          />
          <input
          className='form-control'
          placeholder='Last Name'
          value={this.state.lastName}
          onChange={e => this.userChange(e, 'lastName')}
          />
          <input
          className='form-control'
          placeholder='Email'
          value={this.state.email}
          onChange={e => this.userChange(e, 'email')}
          />
          <input
          className='form-control'
          placeholder='Create Username'
          value={this.state.createUsername}
          onChange={e => this.userChange(e, 'createUsername')}
          />
          <input
          type='password'
          className='form-control'
          placeholder='Create Password'
          value={this.state.createPassword}
          onChange={e => this.userChange(e, 'createPassword')}
          />
          <br></br>
          <br></br>
          <button onClick={(e) => this.addUser(e)}className='signup'><Icon type='check'/>Submit</button>

          <button onClick={() => this.props.onClose()} className='signup'><Icon type='close'/>Cancel</button>
        </Drawer>

    );
  }
} 

export default DrawerForm;