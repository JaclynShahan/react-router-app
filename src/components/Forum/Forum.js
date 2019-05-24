import React, { Component } from 'react'
import './Forum.css'
import Header from '../Forum/Header/Header.js'
import Compose from '../Forum/Compose/Compose.js'
import './Forum.css'
import Axios from 'axios'
import Post from './Compose/Post/Post.js'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Forum extends Component {
  constructor () {
    super()
    this.state = {
      posts: []
    }
    this.updatePost = this.updatePost.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.makePost = this.makePost.bind(this)
  }

  componentDidMount () {
    Axios.get('/api/getPosts').then(results => {
      this.props.postAdder(results.data)
    })
  }

  updatePost (id, text, subject) {
    Axios.put(`/api/updatePost/${id}`, { text, subject }).then(results => {
      this.props.postAdder(results.data)
    })
  }

  onDelete (id) {
    Axios.delete(`/api/deletePost/${id}`).then(results => {
      this.props.postAdder(results.data)
    })
  }
  makePost (text, subject) {
    Axios.post('/api/createPost', { text, subject }).then(results => {
      this.setState({ posts: results.data })
    })
  }

  render () {
    console.log(this.props)
    const { newPost: posts, searchPosts } = this.props.getPost

    return (
      <div className='App__parent'>
        <Header />

        <section className='App__content'>
          <Compose createPostFn={this.makePost} />
          {searchPosts.length > 0
            ? searchPosts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                text={post.text}
                subject={post.subject}
                date={post.date}
                updatePostFn={this.updatePost}
                deletePostFn={this.onDelete}
                post={post}
              />
            ))
            : posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                text={post.text}
                subject={post.subject}
                date={post.date}
                updatePostFn={this.updatePost}
                deletePostFn={this.onDelete}
                post={post}
              />
            ))}
          {this.props.setUser.newUser.email ? '' : <Redirect to='/login' />}
        </section>
      </div>
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum)
