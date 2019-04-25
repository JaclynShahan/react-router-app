import React, { Component } from 'react';
import {Icon} from 'antd';
import './Post.css';

import Edit from './Edit/Edit';

// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

class Post extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      showMasterMenu: false
    };

    this.hideEdit = this.hideEdit.bind( this );
    this.showEdit = this.showEdit.bind( this );
    this.toggleMasterMenu = this.toggleMasterMenu.bind( this );
    this.hideMasterMenu = this.hideMasterMenu.bind( this );
  }

  showEdit() {
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

  render() {
    const { editing, showMasterMenu } = this.state;
    const {text, date, deletePostFn, id, updatePostFn} = this.props;
    

    return (
      // Main body of post
      <section className="Post__parent" onClick={ this.hideMasterMenu }>

        {/* Three dots in top right corner */}
        <div className="Post__master-controls">
          <button onClick={ this.toggleMasterMenu }>MasterControls</button>

          {/* Drop-down menu. Remember that the "showMasterMenu" variable has been destructured off of this.state */}
          <div className="Post__master-menu" style={ { display: showMasterMenu ? 'flex' : 'none' } }>
            <span onClick={ this.showEdit }>Edit</span>
            <span onClick= {() => deletePostFn(id)}>Delete</span>
          </div>
        </div>

       
        <div className="Post__meta-data">
          <div className="Post__profile-picture">
            <Icon type='robot'/>
          </div>

          <span className="Post__name">Post Name</span>
          <span className="Post__handle">Post Handle</span>

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
          <Icon type='like' />
          <Icon type='dislike' />
          <Icon type='message' />
        </div>

      </section>
    )
  }
}

export default Post;