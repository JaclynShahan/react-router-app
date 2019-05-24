import React, { Component } from 'react'
import { Icon, Avatar, Popover, Button } from 'antd'
import './Header.css'
import Search from '../Search/Search.js'
import { connect } from 'react-redux'

class ForumHeader extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    let styles = {
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      marginRight: '10px'
    }
    let content = (
      <Button
        onClick={() => this.props.userAdder({})}
        className='Compose_button'
      >
        Sign Out
      </Button>
    )

    return (
      <section className='Header__parent'>
        <section className='Header__content'>
          <div className='Header__company-info'>
            <Icon type='robot' style={styles} />
            <span>Brat Chat</span>
          </div>

          <div className='Header__right'>
            <Search />

            <div className='Header__profile'>
              <Popover className='sign_out' content={content}>
                <Avatar src='https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png' />
              </Popover>
            </div>
          </div>
        </section>
      </section>
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumHeader)
