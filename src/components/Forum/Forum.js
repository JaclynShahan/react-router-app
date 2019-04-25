import React, {Component} from 'react';
import './Forum.css';
import Header from '../Forum/Header/Header.js';
import Compose from '../Forum/Compose/Compose.js';
import Search from '../Forum/Search/Search.js';

class Forum extends Component {
    constructor() {
        super()
        this.state = {

        }
    }


render() {

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          
        </section>
      </div>
    );
  }
}

export default Forum;