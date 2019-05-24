import React, { Component } from 'react'

import './App.css'
import router from './router'
import { Link } from 'react-router-dom'

class App extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  render () {
    console.log(window.location.pathname)
    return (
      <div>
        <div className='topnav' id='myTopnav'>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/forum'>Forum</Link>
        </div>
        {router}
      </div>
    )
  }
}
export default App
