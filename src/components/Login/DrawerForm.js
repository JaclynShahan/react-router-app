import React, { Component } from 'react'
import { Drawer, Button, Icon, notification } from 'antd'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class DrawerForm extends Component {
  constructor () {
    super()
    this.state = {
      visible: false,
      firstName: '',
      lastName: '',
      email: '',
      createUsername: '',
      createPassword: '',
      redirect: ''
    }
  }

  addUser = e => {
    e.preventDefault()
    Axios.post('/api/addUser', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      createUsername: this.state.createUsername,
      createPassword: this.state.createPassword
    }).then(resp => {
      this.onClear()
      this.props.userAdder(resp.data)
      this.openNotification()
      console.log(resp)
    })
  }

  userChange = (e, stateProperty) => {
    this.setState({ [stateProperty]: e.target.value })
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
  openNotification = () => {
    const close = () => {
      console.log(
        'Notification was closed. Either the close button was clicked or duration time elapsed.'
      )
    }
    const key = `open${Date.now()}`
    const btn = () => {
      return (
        <Button
          type='primary'
          size='small'
          onClick={() => notification.close(key)}
        />
      )
    }
    notification.open({
      message: 'User Successfully Added',
      description: (
        <Button
          type='primary'
          size='small'
          onClick={() => notification.close(key)}
        >
          Return to Site
        </Button>
      ),
      btn,
      key,
      onClose: close,
      onClick: () => {
        console.log('Notification Clicked!')
        this.setState({ redirect: <Redirect to='/forum' /> })
      }
    })
  }

  render () {
    console.log(this.props)
    return (
      <Drawer
        title='Create an Account'
        placement='right'
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
        <br />
        <br />

        <button onClick={e => this.addUser(e)} className='signup'>
          <Icon type='check' />
          Submit
        </button>

        <button
          onClick={() => this.props.onClose()}
          type='primary'
          className='signup'
        >
          <Icon type='close' />
          Cancel
        </button>
        {this.state.redirect}
      </Drawer>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  userAdder (newUser) {
    dispatch({
      type: 'ADD_USER',
      payload: newUser
    })
  },
  addText (e) {
    dispatch({
      type: 'SET_USER',
      payload: e.target.value
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerForm)
