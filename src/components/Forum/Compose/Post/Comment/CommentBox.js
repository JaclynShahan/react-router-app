import React, { Component } from 'react';
import { Drawer, Icon, List, Avatar } from 'antd';
import {connect} from 'react-redux';
import Axios from 'axios';
import './CommentBox.css';
import {MdFace} from 'react-icons/md';

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
        className="Comment_header"
        title="Leave a Comment"
        placement="bottom"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
        height="80vh"
      >
      <section className="Comment_content">
        <input
          className="Comment_input"
          value={this.state.commentText}
          onChange={e => this.updateCommentText(e.target.value)}
        />
        {
       //   comments.map(comment => (
         //   <div>
           //   <span>{comment.userName}</span>
             // {comment.commentText}
            //</div>
        //))
        }
         <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={item => (
         <List.Item>
         <List.Item.Meta
          
        avatar={<Avatar src="https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png" />}
          title={item.userName}
          description={item.commentText}
        />
      </List.Item>
    )}
  />
    
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
     </section>
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