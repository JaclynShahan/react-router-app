import React, { Component } from "react";
import { Icon } from 'antd';

class Forum extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
        <div>
        <div className='comment_block'>
        </div>
       <div className='create_new_comment'>
       </div>
       <div className='user_avatar'>
       <img src="https://lh3.googleusercontent.com/-BOAg0QFuH-M/WIreaUkGHeI/AAAAAAAAABA/WeG7oJQh5oQAvEFxfnmQzjv5WGrWGOJ2ACEwYBhgL/w140-h140-p/9ff3cf93-6b2b-4d4f-a4a7-9af756f3a3da"/>
       <div className="input_comment">
       <input 
        type="text"
        placeholder="Join the Conversation"
        />
        </div>
       </div>
       </div>

      
    );
  }
}

export default Forum;
