import React, { Component } from 'react';
import {Icon, Drawer, Avatar, Badge, Button} from 'antd';
import './Post.css';
//import {FaComment, FaThumbs_up, FaThumbs_down, FaHeart, FaEnvelope} from 'react-icons/fa';
//import {MdFace, MdSend} from 'react-icons/md';
import Edit from './Edit/Edit';
import CommentBox from './Comment/CommentBox.js';
import {connect} from 'react-redux';
import Axios from 'axios';

// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

class Post extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      showMasterMenu: false,
      postLikes: [],
      postMehs: [],
      postDislikes: [],
      count: 0,
      show: true

    };

    this.hideEdit = this.hideEdit.bind( this );
    //this.showEdit = this.showEdit.bind( this );
    this.toggleMasterMenu = this.toggleMasterMenu.bind( this );
    this.hideMasterMenu = this.hideMasterMenu.bind( this );
  }

  showEdit = () => {
    console.log('Help Me')
    this.setState({ editing: true, showMasterMenu: false });
  }

  
  hideEdit() {
    this.setState({ editing: false });
  }

  
  toggleMasterMenu() {
    this.setState({ showMasterMenu: !this.state.showMasterMenu });
  }


  hideMasterMenu() {
    if ( this.state.showMasterMenu === true ) {
      this.setState({ showMasterMenu: false });
    }
  }
onClose = () => {
    this.setState({
      visible: false
    });
  };
  setSelectedPost = () => {
    this.props.setSelectedPost(this.props.post)
    this.setState({
      visible: true
    })
  }
  //componentDidMount() {
    //Axios.get('/api/getComments').then(results => {this.props.commentAdder(results.data)})
  //}

 //updateComments(id, comments) {
   //Axios.put(`/api/makeComment/${id}`, {comments}).then(results => {this.props.commentAdder(results.data)})
//}

updateLikes(id, likes) {
  //  console.log(id, comments)
   const newLikes = likes
   newLikes.push(this.props.setUser.newUser.id)
   Axios.post(`/api/leaveLikes/${id}`, {
    //  postId: this.props.getPost.selectedPost.id,
     likesArr: newLikes
  }).then(resp => {
    console.log(resp)
    this.props.postAdder(resp.data)
    // this.props.selectedPost(resp.data)
  })
 this.updatePostLikes();
 this.increaseBadge();
}

updateMehs(id, mehs) {
  //  console.log(id, comments)
   const newMehs = mehs
   newMehs.push(this.props.setUser.newUser.id)
   Axios.post(`/api/leaveMehs/${id}`, {
    //  postId: this.props.getPost.selectedPost.id,
     mehsArr: newMehs
  }).then(resp => {
    console.log(resp)
    this.props.postAdder(resp.data)
    // this.props.selectedPost(resp.data)
  })
 this.updatePostMehs();
 this.increaseBadge();
}

updateDislikes(id, dislikes) {
  //  console.log(id, comments)
   const newDislikes = dislikes
   newDislikes.push(this.props.setUser.newUser.id)
   Axios.post(`/api/leaveDislikes/${id}`, {
    //  postId: this.props.getPost.selectedPost.id,
     DislikesArr: newDislikes
  }).then(resp => {
    console.log(resp)
    this.props.postAdder(resp.data)
    // this.props.selectedPost(resp.data)
  })
 this.updatePostDislikes();
 this.increaseBadge();
}

updatePostLikes(postLikes) {
  this.setState({postLikes})
}

updatePostMehs(postMehs) {
  this.setState({postMehs})
}

increaseBadge = () => {
  const count = this.state.count + 1;
  this.setState({ count });
}

onChange = (show) => {
  this.setState({ show });
}



  render() {
    const {selectedPost} = this.props.getPost
    const likes = selectedPost.likes || []
    //const { comments } = this.props.getPost.selectedPost
    const { editing, showMasterMenu } = this.state;
    const {text, date, deletePostFn, id, updatePostFn, createCommentFn} = this.props;
    console.log(this.state)
    console.log(this.props)
    return (
      // Main body of post
      <section className="Post__parent" onClick={ this.hideMasterMenu }>

        
        <div className="Post__master-controls">
          <button onClick={ this.toggleMasterMenu }><Icon type='edit'/></button>

       
          <div className="Post__master-menu" style={ { display: showMasterMenu ? 'flex' : 'none' } }>
            <span onClick={ this.showEdit }>Edit</span>
            <span onClick= {() => deletePostFn(id)}>Delete</span>
          </div>
        </div>

       
        <div className="Post__meta-data">
          <div className="Post__profile-picture">
          <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
          </div>

          <span className="Post__name">{this.props.subject}</span>
        {/* <span className="Post__handle">Post Handle</span> */}

          <span className="Post__date">{this.props.date}</span>
        </div>

    
        <div className="Post__content">
          {
            // This has been pulled off of this.state via destructuring
            editing
            ?
              <Edit text={text}
                    id={id}
                    hideEdit={ this.hideEdit }
                    updatePostFn={updatePostFn} />
            :
              <span className="Post__text">{text}</span>
          }
        </div>

        
        <div className="Post__user-controls">
        <div className='icons'>
        <Badge count={this.props.post.likes.length}>
        {
          this.props.post.likes.includes(this.props.setUser.newUser.id) ? 
          // <Button>
            <Icon 
              type='smile' 
              theme='twoTone' 
              twoToneColor='#DC143C' 
              style={{ fontSize: '28px'}}
           /> 
          // </Button>
           : 
          //  <Button 
          //     icon='smile'
          //     >
           <Icon 
              onClick={() => this.updateLikes(this.props.post.id, this.props.post.likes)}
              type='smile' 
              theme='twoTone' 
              twoToneColor='#DC143C' 
              style={{ fontSize: '28px'}}
            />
              // </Button>
         }
        </Badge>
        <Badge count={this.props.post.mehs.length}>
        {
          this.props.post.mehs.includes(this.props.setUser.newUser.id) ? 
          <Icon
          type='meh'
          theme='twoTone'
          twoToneColor='#FF4500'
          style={{ fontSize: '28px'}}
          />
          :
          <Icon
          onClick={() => this.updateMehs(this.props.post.id, this.props.post.mehs)}
          type='meh'
          theme='twoTone'
          twoToneColor='#FF4500'
          style={{ fontSize: '28px'}}
          />
        }
        </Badge>
        <Badge count={this.props.post.dislikes.length}>
        {
          this.props.post.dislikes.includes(this.props.setUser.newUser.id) ?
          <Icon
          type='frown'
          theme='twoTone'
          twoToneColor='#245EC1'
          style={{ fontSize: '28px'}}
          />
          :
          <Icon
          onClick={() => this.updateDislikes(this.props.post.id, this.props.post.dislikes)}
          type='frown'
          theme='twoTone'
          twoToneColor='#245EC1'
          style={{ fontSize: '28px'}}
          />
        }
        </Badge>
         <Badge count={this.props.post.comments.length}>
          <Icon 
          onClick= {() => this.setSelectedPost()}
          type='message' 
          theme='twoTone' 
          twoToneColor='24C131'
          style={{ fontSize: '28px'}}
          />
          </Badge>
        <input
        placeholder='Leave a Comment...'
          className="Comment_input"
          value={this.state.commentText}
          onChange={e => this.updateCommentText(e.target.value)}
        />
          <CommentBox className="Comment_input"
          visible={this.state.visible} 
          onClose={this.onClose} 
          updateCommentsFn={this.props.updateComments}
          />
        
          </div>
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
  )(Post);