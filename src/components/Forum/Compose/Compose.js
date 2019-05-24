import React, { Component } from 'react'
import { Avatar } from 'antd'
import './Compose.css'
import Axios from 'axios'
import { connect } from 'react-redux'

class Compose extends Component {
  constructor () {
    super()

    this.state = {
      subject: '',
      text: ''
    }

    this.makePost = this.makePost.bind(this)
  }

  updateSubject (subject) {
    this.setState({ subject })
  }

  updateText (text) {
    this.setState({ text })
  }

  clearField = () => {
    this.setState({
      text: '',
      subject: ''
    })
  }
  getPost = e => {
    e.preventDefault()
    Axios.get(`/api/getPosts?text=${this.state.text}`).then(resp => {
      console.log(resp)
    })

    this.clearField()
  }
  makePost = e => {
    e.preventDefault()
    Axios.post('/api/createPost', {
      text: this.state.text,
      subject: this.state.subject,
      comments: [],
      likes: [],
      mehs: [],
      dislikes: [],
      createUsername: this.props.setUser.newUser.createUsername
    }).then(resp => {
      this.props.postAdder(resp.data)
      console.log(resp)
    })
    this.clearField()
  }

  render () {
    const { text, subject } = this.state

    return (
      <section className='Compose__parent'>
        <div className='Compose__top'>
          <div className='Compose__profile-picture'>
            <Avatar src='https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png' />
          </div>
          <input
            className='Subject__input'
            placeholder='Subject'
            value={subject}
            onChange={e => this.updateSubject(e.target.value)}
          />

          <input
            className='Compose__input'
            placeholder="What's on your mind?"
            value={text}
            onChange={e => this.updateText(e.target.value)}
          />
        </div>

        <div className='Compose__bottom'>
          <button className='Compose_button' onClick={e => this.makePost(e)}>
            Update
          </button>
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
)(Compose)
