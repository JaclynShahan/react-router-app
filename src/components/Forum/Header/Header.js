import React, { Component } from "react";
import { Icon } from 'antd';
import './Header.css';
import Search from '../Search/Search.js';

class ForumHeader extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    let styles = {
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      marginRight: '10px'
    }
    return (
        <section className="Header__parent">
        <section className="Header__content">

        
          <div className="Header__company-info">
            <Icon type='robot' style={styles}/>
            <span>Brat Chat</span>
          </div>

          <div className="Header__right">
            <Search />

            <div className="Header__profile">
              <Icon type='robot' />
            </div>
          </div>

        </section>
      </section>

      
    );
  }
}

export default ForumHeader;
