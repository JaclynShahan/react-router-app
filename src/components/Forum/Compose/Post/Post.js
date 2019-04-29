import React, { Component } from 'react';
import {Icon, Drawer} from 'antd';
import './Post.css';
import {FaComment, FaThumbs_up, FaThumbs_down, FaHeart, FaEnvelope} from 'react-icons/fa';
import {MdFace, MdSend} from 'react-icons/md';
import Edit from './Edit/Edit';
import CommentBox from './Comment/CommentBox.js';

// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

class Post extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      showMasterMenu: false
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

showDrawer = () => {
    console.log("hi");
    this.setState({
      visible: true
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { editing, showMasterMenu } = this.state;
    const {text, date, deletePostFn, id, updatePostFn} = this.props;
    console.log(this.state)

    return (
      // Main body of post
      <section className="Post__parent" onClick={ this.hideMasterMenu }>

        {/* Three dots in top right corner */}
        <div className="Post__master-controls">
          <button onClick={ this.toggleMasterMenu }><Icon type='edit'/></button>

          {/* Drop-down menu. Remember that the "showMasterMenu" variable has been destructured off of this.state */}
          <div className="Post__master-menu" style={ { display: showMasterMenu ? 'flex' : 'none' } }>
            <span onClick={ this.showEdit }>Edit</span>
            <span onClick= {() => deletePostFn(id)}>Delete</span>
          </div>
        </div>

       
        <div className="Post__meta-data">
          <div className="Post__profile-picture">
            <MdFace />
          </div>

          <span className="Post__name">{this.props.subject}</span>
        {/* <span className="Post__handle">Post Handle</span> */}

          <span className="Post__date">{date}</span>
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
          <Icon type='smile' theme='twoTone' twoToneColor='#DC143C' />
         
          <Icon type='meh' theme='twoTone' twoToneColor='#FF4500'/>

          <Icon type='frown' theme='twoTone' twoToneColor='#245EC1'/>
          
          <button onClick={this.showDrawer}><Icon type='message' theme='twoTone' twoToneColor='24C131'/></button>
          <CommentBox visible={this.state.visible} onClose={this.onClose} />
          </div>
        </div>

      </section>
    )
  }
}

export default Post;