import React, {Component} from 'react';
import './Forum.css';
import Header from '../Forum/Header/Header.js';
import Compose from '../Forum/Compose/Compose.js';
import Search from '../Forum/Search/Search.js';
import './Forum.css';
import Axios from 'axios';
import Post from './Compose/Post/Post.js';
import {connect} from 'react-redux';
import Edit from './Compose/Post/Edit/Edit.js';

class Forum extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            comments: []
        }
       this.updatePost = this.updatePost.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.makePost = this.makePost.bind(this);
    }

    componentDidMount() {
      Axios.get('/api/getPosts').then(results => {this.props.postAdder(results.data)})
    }

    //updatePost(id, text) {
      //axios.put(`/api/updatePosts?id=${id}`, {text}).then(results => {
        //  this.setState({posts: results.data});
        //});
        //}
      updateComments(id, comment) {
        Axios.put(`/api/makeComment/${id}`, {comment}).then(results => {this.props.postAdder(results.data)})
      }
        updatePost(id, text, subject) {          
          Axios.put(`/api/updatePost/${id}`, {text, subject}).then(results => {this.props.postAdder(results.data)})
        }
     
        onDelete(id)  {
          Axios.delete(`/api/deletePost/${id}`).then(results => {this.props.postAdder(results.data)})
        }
        makePost(text, subject) {
          Axios.post('/api/createPost', {text, subject}).then( results => {
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
                  id={post.id}
                  text={post.text}
                  subject={post.subject}
                  date={post.date}
                  comment={post.comment}
                 updatePostFn={this.updatePost}
                  deletePostFn={this.onDelete}
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

//dispatch to props: it dispatches stuff to props. if it returns an object it puts it all back into props. it will be inside this.props