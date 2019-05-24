import React, { Component } from 'react'
import { Drawer, Icon, List, Avatar } from 'antd'
import { connect } from 'react-redux'
import Axios from 'axios'
import './CommentBox.css'

class CommentBox extends Component {
  constructor () {
    super()
    this.state = {
      commentText: ''
    }
  }

  updateComments (id, comments) {
    const newComments = comments
    newComments.push({
      userName: this.props.setUser.newUser.createUsername,
      userId: this.props.setUser.newUser.email,
      commentText: this.state.commentText
    })
    Axios.post(`/api/makeComment/${id}`, {
      postId: this.props.getPost.selectedPost.id,
      commentsArr: newComments
    }).then(resp => {
      console.log(resp)
      this.props.postAdder(resp.data)
    })

    this.emptyInput()
  }

  updateCommentText (commentText) {
    this.setState({ commentText })
  }

  emptyInput = () => {
    this.setState({
      commentText: ''
    })
  }

  render () {
    const { selectedPost } = this.props.getPost
    const comments = selectedPost.comments || []

    return (
      <Drawer
        className='dialogMessage'
        title={this.props.getPost.selectedPost.subject}
        placement='bottom'
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
        height='80vh'
      >
        <section className='dialogBox'>
          <input
            placeholder='Leave a Comment...'
            className='Comment_input'
            value={this.state.commentText}
            onChange={e => this.updateCommentText(e.target.value)}
          />
          <Icon
            onClick={() => this.updateComments(selectedPost.id, comments)}
            type='plus-circle'
            theme='twoTone'
            twoToneColor='rgb(18, 179, 152'
            style={{ fontSize: '40px'}}
          />
          <Icon
            onClick={() => this.props.onClose()}
            type='close-circle'
            theme='twoTone'
            twoToneColor='rgb(18,179, 152'
            style={{ fontSize: '40px' }}
          />
        </section>
        {}
        <List
          className='comments'
          itemLayout='horizontal'
          dataSource={comments}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src='https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png' />
                }
                title={item.userName}
                description={item.commentText}
              />
            </List.Item>
          )}
        />
      </Drawer>
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
)(CommentBox)
