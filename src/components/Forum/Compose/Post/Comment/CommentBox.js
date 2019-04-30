import React, { Component } from 'react';
import { Drawer, Icon } from 'antd';
import {connect} from 'react-redux';
import Axios from 'axios';


class CommentBox extends Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            comment: ""
        }
    }

  

  onClear = () => {
    this.setState({
      comment: "",
    });
  };
  commentChange = (e, stateProperty) => {
    this.setState({ [stateProperty]: e.target.value });
  };
 // addComment = e => {
   // e.preventDefault();
    //Axios.post("/api/makeComment", {
      //text: this.state.text
    //}).then(resp => {
      //this.onClear();
      //this.props.postAdder(resp.data);
      //console.log(resp);
    //});
  //};
  updateComment( comment ) {
    this.setState({comment});
  }

  clearField = () => {
    this.setState({
      comment: ""
    })
  }
  getComment = e => {
    e.preventDefault();
    Axios.get(
      `/api/getComment?comment=${this.state.comment}`
    ).then(resp => {
      console.log(resp);
    });

    this.clearField();
  };
  makeComment = e  => {
    e.preventDefault();
    Axios.post("/api/makeComment", {
      comment: this.state.comment

    }).then(resp => {
      this.props.postAdder(resp.data);
      console.log(resp);
    })
   this.clearField()
  }
  updateComment(id, comment) {
    
    Axios.put(`/api/makeComment/${id}`, {comment}).then(results => {this.props.postAdder(results.data)})
  }
  
render() {
 
    return (
    
        <Drawer
        title="Leave a Comment"
        placement="bottom"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <input
          className="Comment_input"
          value={this.state.comment}
          onChange={e => this.commentChange(e, "comment")}
        />
       
      <button onClick={e => this.makeComment(e)} 
          className="signup">
          <Icon type="check" />
          Submit
        </button>
    
      <button 
        onClick={() => this.props.onClose()}
        type='primary'
         className="signup">
          <Icon type="close" />
          Cancel
        </button>
     
      </Drawer>
     
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
  )(CommentBox);