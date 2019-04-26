import React, {Component} from 'react';
import './Forum.css';
import Header from '../Forum/Header/Header.js';
import Compose from '../Forum/Compose/Compose.js';
import Search from '../Forum/Search/Search.js';
import './Forum.css';
import Axios from 'axios';
import Post from './Compose/Post/Post.js';
import {connect} from 'react-redux';

class Forum extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
        //this.updatePost = this.updatePost.bind(this);
        //this.deletePost = this.deletePost.bind(this);
        this.makePost = this.makePost.bind(this);
    }

    componentDidMount() {
      Axios.get('/api/getPosts').then(results => {this.props.postAdder(results.data)})
    }

    //updatePost(id, text) {
      //  axios.put(`/api/updatePosts?id=${id}`, {text}).then(results => {
        //  this.setState({posts: results.data});
        //});
       // }
      
        deletePost(id) {
          Axios.delete(`/api/deletePost?id=${id}`).then( results => {
            this.setState({posts: results.data});
          });
      
        }
      
        makePost(text) {
          Axios.post('/api/createPost', {text}).then( results => {
            this.setState({posts: results.data});
          });
      
        }


render() {
  console.log(this.props)
const {newPost: posts} = this.props.getPost
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.makePost}/>
          {
              posts.map(post => (
                  <Post
                  key={post.id}
                  text={post.text}
                  date={post.date}
                 // updatePostFn={this.updatePost}
                  deletePostFn={this.deletePost}
                  />

              ))
          }
        </section>
      </div>
    );
  }
}

//create mapStateToProps function
const mapStateToProps = state => state;
//you'll use this to dispatch payloads to redux
const mapDispatchToProps = dispatch => ({
  //functions added here will be available on props
  postAdder(newPost) {
    //dispatches and object with type and payload
    //numberAdder seen in props
    dispatch({
      type: "ADD_POST", //type is where we send it
      payload: newPost //payload is the data
    });
  },
  // addPost(e) {
  //   dispatch({
  //     type: "SET_POST",
  //     payload: e.target.value
  //   });
  // }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum);