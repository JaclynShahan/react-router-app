import React, { Component } from 'react'
import { Icon, Avatar, Badge } from 'antd'
import './Post.css'

import Edit from './Edit/Edit'
import CommentBox from './Comment/CommentBox.js'
import { connect } from 'react-redux'
import Axios from 'axios'

class Post extends Component {
  constructor () {
    super()

    this.state = {
      editing: false,
      showMasterMenu: false,
      postLikes: [],
      postMehs: [],
      postDislikes: [],
      count: 0,
      show: true
    }

    this.hideEdit = this.hideEdit.bind(this)

    this.toggleMasterMenu = this.toggleMasterMenu.bind(this)
    this.hideMasterMenu = this.hideMasterMenu.bind(this)
  }

  showEdit = () => {
    console.log('Help Me')
    this.setState({ editing: true, showMasterMenu: false })
  }

  hideEdit () {
    this.setState({ editing: false })
  }

  toggleMasterMenu () {
    this.setState({ showMasterMenu: !this.state.showMasterMenu })
  }

  hideMasterMenu () {
    if (this.state.showMasterMenu === true) {
      this.setState({ showMasterMenu: false })
    }
  }
  onClose = () => {
    this.setState({
      visible: false
    })
  }
  setSelectedPost = () => {
    this.props.setSelectedPost(this.props.post)
    this.setState({
      visible: true
    })
  }

  updateLikes (id, likes) {
    const newLikes = likes
    newLikes.push(this.props.setUser.newUser.email)
    Axios.post(`/api/leaveLikes/${id}`, {
      likesArr: newLikes
    }).then(resp => {
      console.log(resp)
      this.props.postAdder(resp.data)
    })
    this.updatePostLikes()
    this.increaseBadge()
  }

  updateMehs (id, mehs) {
    const newMehs = mehs
    newMehs.push(this.props.setUser.newUser.email)
    Axios.post(`/api/leaveMehs/${id}`, {
      mehsArr: newMehs
    }).then(resp => {
      console.log(resp)
      this.props.postAdder(resp.data)
    })
    this.updatePostMehs()
    this.increaseBadge()
  }

  updateDislikes (id, dislikes) {
    const newDislikes = dislikes
    newDislikes.push(this.props.setUser.newUser.email)
    Axios.post(`/api/leaveDislikes/${id}`, {
      DislikesArr: newDislikes
    }).then(resp => {
      console.log(resp)
      this.props.postAdder(resp.data)
    })
    this.updatePostDislikes()
    this.increaseBadge()
  }

  updatePostLikes (postLikes) {
    this.setState({ postLikes })
  }

  updatePostMehs (postMehs) {
    this.setState({ postMehs })
  }

  updatePostDislikes (postDislikes) {
    this.setState({ postDislikes })
  }

  increaseBadge = () => {
    const count = this.state.count + 1
    this.setState({ count })
  }

  onChange = show => {
    this.setState({ show })
  }

  render () {
    const { selectedPost } = this.props.getPost
    const likes = selectedPost.likes || []

    const { editing, showMasterMenu } = this.state
    const { text, deletePostFn, id, updatePostFn } = this.props
    console.log(this.state)
    console.log(this.props)
    return (
      <section className='Post__parent' onClick={this.hideMasterMenu}>
        <div className='Post__master-controls'>
          <button onClick={this.toggleMasterMenu}>
            <Icon type='edit' />
          </button>

          <div
            className='Post__master-menu'
            style={{ display: showMasterMenu ? 'flex' : 'none' }}
          >
            <span onClick={this.showEdit}>Edit</span>
            <span onClick={() => deletePostFn(id)}>Delete</span>
          </div>
        </div>

        <div className='Post__meta-data'>
          <div className='Post__profile-picture'>
            <Avatar style={{ backgroundColor: '#87d068' }} icon='user' />
          </div>

          <span className='Post__name'>{this.props.subject}</span>
        </div>

        <div className='Post__content'>
          {editing ? (
            <Edit
              text={text}
              id={id}
              hideEdit={this.hideEdit}
              updatePostFn={updatePostFn}
            />
          ) : (
            <span className='Post__text'>{text}</span>
          )}
        </div>

        <div className='Post__user-controls'>
          <div className='icons'>
            <Badge count={this.props.post.likes.length}>
              {this.props.post.likes.includes(
                this.props.setUser.newUser.email
              ) ? (
                <Icon
                    type='smile'
                    theme='twoTone'
                    twoToneColor='#DC143C'
                    style={{ fontSize: '28px' }}
                  />
                ) : (
                  <Icon
                    onClick={() =>
                      this.updateLikes(this.props.post.id, this.props.post.likes)
                    }
                    type='smile'
                    theme='twoTone'
                    twoToneColor='#DC143C'
                    style={{ fontSize: '28px' }}
                  />
                )}
            </Badge>
            <Badge count={this.props.post.mehs.length}>
              {this.props.post.mehs.includes(
                this.props.setUser.newUser.email
              ) ? (
                <Icon
                    type='meh'
                    theme='twoTone'
                    twoToneColor='#FF4500'
                    style={{ fontSize: '28px' }}
                  />
                ) : (
                  <Icon
                    onClick={() =>
                      this.updateMehs(this.props.post.id, this.props.post.mehs)
                    }
                    type='meh'
                    theme='twoTone'
                    twoToneColor='#FF4500'
                    style={{ fontSize: '28px' }}
                  />
                )}
            </Badge>
            <Badge count={this.props.post.dislikes.length}>
              {this.props.post.dislikes.includes(
                this.props.setUser.newUser.email
              ) ? (
                <Icon
                    type='frown'
                    theme='twoTone'
                    twoToneColor='#245EC1'
                    style={{ fontSize: '28px' }}
                  />
                ) : (
                  <Icon
                    onClick={() =>
                      this.updateDislikes(
                        this.props.post.id,
                        this.props.post.dislikes
                      )
                    }
                    type='frown'
                    theme='twoTone'
                    twoToneColor='#245EC1'
                    style={{ fontSize: '28px' }}
                  />
                )}
            </Badge>
            <Badge count={this.props.post.comments.length}>
              <Icon
                onClick={() => this.setSelectedPost()}
                type='message'
                theme='twoTone'
                twoToneColor='24C131'
                style={{ fontSize: '28px' }}
              />
            </Badge>

            <CommentBox
              className='dialogBox'
              visible={this.state.visible}
              onClose={this.onClose}
              updateCommentsFn={this.props.updateComments}
            />
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  postAdder (newPost) {
    dispatch({
      type: 'ADD_POST',
      payload: newPost
    })
  },
  setSelectedPost (selectedPost) {
    dispatch({
      type: 'SELECT_POST',
      payload: selectedPost
    })
  },
  addPost (e) {
    dispatch({
      type: 'SET_POST',
      payload: e.target.value
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
