import React, { Component } from 'react';
import { Drawer, Icon } from 'antd';
import {connect} from 'react-redux';
import Axios from 'axios';


class CommentBox extends Component {
    constructor() {
        super()
        this.state = {
           // visible: false,
           comments: []
        }
    }
    componentDidMount() {
      Axios.get('/api/getComments').then(results => {this.props.commentAdder(results.data)})
    }
    //updateComent() {
      //const {text} = this.state;
     // const {id, updatePostFn, hideEdit, createCommentFn} = this.props;
      
     // updatePostFn(id, text);
  
 //   }
   updateComments(id, comments) {
     Axios.put(`/api/makeComment/${id}`, {comments}).then(results => {this.props.commentAdder(results.data)})
 }
 makeComment = e  => {
   e.preventDefault();
    Axios.post("/api/createComment", {

      comments: this.state.comments

    }).then(resp => {
      this.props.commentAdder(resp.data);
      console.log(resp);
    })
   this.clearField()
  }
  commentChange = (e, stateProperty) => {
   this.setState({ [stateProperty]: e.target.value });
  };


  clearField = () => {
    this.setState({
      comments: []
    })
  }
  
  
render() {
  const {text, date, deletePostFn, id, updatePostFn, createCommentFn} = this.props;
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
          value={this.state.comments}
          onChange={e => this.commentChange(e, "comments")}
        />
       
      <button onClick={ (e) => this.makeComment(e)} 
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
  commentAdder(newComment) {
    dispatch({
      type: "ADD_COMMENT",
      payload: newComment
    })
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