import React, { Component } from 'react';
import { Drawer, Button, Icon } from 'antd';

class DrawerForm extends Component {
  constructor(){
    super();
   this.state = {
    
    visible: false 

  }
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
          />
          <input
          className='form-control'
          placeholder='Last Name'
          />
          <input
          className='form-control'
          placeholder='Email'
          />
          <input
          className='form-control'
          placeholder='Username'
          />
          <input
          className='form-control'
          placeholder='Password'
          />
          <br></br>
          <br></br>
          <button className='signup'><Icon type='check'/>Submit</button>

          <button onClick={() => this.props.onClose()} className='signup'><Icon type='close'/>Cancel</button>
        </Drawer>

    );
  }
} 

export default DrawerForm;