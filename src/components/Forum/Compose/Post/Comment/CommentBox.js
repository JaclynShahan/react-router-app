import React, { Component } from 'react';
import { Drawer, Icon } from 'antd';
import {connect} from 'react-redux';
import Axios from 'axios';


class CommentBox extends Component {
    constructor() {
        super()
        this.state = {
           // visible: false,
        commentText: ""
        }
    }
   // componentDidMount() {
     // Axios.get('/api/getComments').then(results => {this.props.commentAdder(results.data)})
   // }
    //updateComent() {
      //const {text} = this.state;
     // const {id, updatePostFn, hideEdit, createCommentFn} = this.props;
      
     // updatePostFn(id, text);
  
 //   }
   updateComments(id, comments) {
    //  console.log(id, comments)
     const newComments = comments
     newComments.push({
       userName: this.props.setUser.newUser.createUsername,
       userId: this.props.setUser.newUser.id,
       commentText: this.state.commentText
     })
     Axios.post(`/api/makeComment/${id}`, {
       postId: this.props.getPost.selectedPost.id,
       commentsArr: newComments
    }).then(resp => {
      console.log(resp)
      this.props.postAdder(resp.data)
      // this.props.selectedPost(resp.data)
    })
   
    this.emptyInput()
}

 //makeComment = e  => {
   //e.preventDefault();
    //Axios.post("/api/createComment", {

      //comments: this.state.comments

    //}).then(resp => {
      //this.props.commentAdder(resp.data);
      //console.log(resp);
    //})
   //this.clearField()
  //}
 
  updateCommentText( commentText ) {
    this.setState({ commentText });
  }


  emptyInput = () => {
    this.setState({
      commentText: ""
    })
  }
  
  
render() {
  const {selectedPost} = this.props.getPost
  const comments = selectedPost.comments || []
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
          value={this.state.commentText}
          onChange={e => this.updateCommentText(e.target.value)}
        />
        {
          comments.map(comment => (
            <div>
              <span>{comment.userName}</span>
              {comment.commentText}
            </div>
        ))
        }
    
      <button onClick={ () => this.updateComments(selectedPost.id, comments)} 
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
  setSelectedPost(selectedPost) {
    dispatch({
      type: "SELECT_POST",
      payload: selectedPost
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