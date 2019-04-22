import React, { Component } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { Icon } from 'antd';
import Modal from './components/Modal';
import DrawerForm from './components/DrawerForm';
import {connect} from 'react-redux';
import './App.css';

class Home extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return (
           <div className='homePic'>
           <h2>WELCOME PARENTS!</h2>
           </div> 
        )
    }
}

export default Home;