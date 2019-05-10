import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import './Search.css';



// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

class Search extends Component {
  constructor() {
    super()
    this.state = {
        searchString: ''
    }
  }
  //onSearch = () => {
  //if (this.state.searchString.length > 0) {
    //const filteredPost = this.props.getPost.newPost.filter(post => {
      //if (this.post.subject.includes(this.state.searchString) ||
       //this.post.text.includes(this.state.searchString)) {
       // return true;
      //} else {
        //return false;
     // }
    //})
    //this.props.getPost.newPost.push(filteredPost)
 // }
 //this.onSearch()
 

 //}

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" />

          <Icon 
         // onClick={this.onSearch}
          type='search'
          style={{ fontSize:'15px' , margin: '5px'}}
          />

        </div>
        
      </section>
    )
  }
}

export default Search;