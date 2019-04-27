import React, { Component } from 'react';
import { Icon } from 'antd';
import './Compose.css';
import Axios from 'axios';
import {connect} from 'react-redux';

// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

  class Compose extends Component {
    constructor() {
      super();
      
      this.state = {
        text: ''
      };
  
      this.makePost = this.makePost.bind( this );
    }
  
    updateText( text ) {
      this.setState({ text });
    }
    clearField = () => {
      this.setState({
        text: ""
      })
    }
    getPost = e => {
      e.preventDefault();
      Axios.get(
        `/api/getPosts?text=${this.state.text}`
      ).then(resp => {
        console.log(resp);
      });
  
      this.clearField();
    };
    makePost = e  => {
      e.preventDefault();
      Axios.post("/api/createPost", {
        text: this.state.text

      }).then(resp => {
        this.props.postAdder(resp.data);
        console.log(resp);
      })
     this.clearField()
    }

   
    render() {
      // Destructuring
      const { text } = this.state;
      const {createPostFn} = this.props;
  
      return (
        <section className="Compose__parent">
          <div className="Compose__top">
  
            <div className="Compose__profile-picture">
              <Icon type='robot'/>
            </div>
  
            {/* This is where you type the message for your new post */}
            <input className="Compose__input"
                   placeholder="What's on your mind?"
                   value={ text }
                   onChange={ ( e ) => this.updateText( e.target.value ) } />
  
          </div>
  
          <div className="Compose__bottom">
            <button className='Compose_button' onClick={e => this.makePost(e) }>Update</button>
          </div>
        </section>
      )
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
  addPost(e) {
    dispatch({
      type: "SET_POST",
      payload: e.target.value
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose);
//be sure to add parenthesis around your component name as well
//connect takes 2 params: mapStateToProps, and object