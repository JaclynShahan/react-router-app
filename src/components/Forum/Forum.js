import React, {Component} from 'react';
import './Forum.css';
import Header from '../Forum/Header/Header.js';
import Compose from '../Forum/Compose/Compose.js';
import Search from '../Forum/Search/Search.js';
import './Forum.css';
import axios from 'axios';
import Post from './Compose/Post/Post.js';

class Forum extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    componentDidMount() {
        axios.get('/api/getPost').then(results => {this.setState({posts: results.data})})
    }
    updatePost(id, text) {
        axios.put(`/api/updatePosts?id=${id}`, {text}).then(results => {
          this.setState({posts: results.data});
        });
        }
      
        deletePost(id) {
          axios.delete(`/api/posts?id=${id}`).then( results => {
            this.setState({posts: results.data});
          });
      
        }
      
        createPost(text) {
          axios.post('/api/posts', {text}).then( results => {
            this.setState({posts: results.data});
          });
      
        }


render() {
const {posts} = this.state
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
              posts.map(post => (
                  <Post
                  key={post.id}
                  text={post.text}
                  date={post.date}
                  updatePostFn={this.updatePost}
                  deletePostFn={this.deletPost}
                  />

              ))
          }
        </section>
      </div>
    );
  }
}

export default Forum;