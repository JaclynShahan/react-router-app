import React, { Component } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { Icon } from 'antd';
import Modal from '../Login/Modal';
import DrawerForm from '../Login/DrawerForm';
import {connect} from 'react-redux';
import './Home.css';

class Home extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return (
           <div className='bg bg2 bg3 content h1 body html'>
           <h2>WELCOME PARENTS!</h2>
           </div> 
        )
    }
}

export default Home;