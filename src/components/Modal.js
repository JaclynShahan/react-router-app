import React, { Component } from 'react';
import { Modal as Antmodal, Icon, Button } from 'antd';

class Modal extends Component {
    constructor() {
        super()
        this.setState= {
            visible: false,
            username: '',
            password: ''
        }
    }
    onclear = () => {
        this.setState({
            username: '',
            password: ''
        })
    }
    onOk = () => {
        var user = {
            username: this.state.username,
           password: this.state.password
        }
        this.props.addUser(this.props.userIndex, user)
        this.setState({visible: false})
    }
    onCancel = () => {
        this.setState({visible: false});
    }
    handleUser = (e, stateProperty) => {
        this.setState({[stateProperty]: e.target.value})
    }
    render() {
        return(
          <div>
             <Antmodal
             width='90vw'
             okText={<span>SAVE<Icon type='check'/></span>}
             onOk={this.onOk}
             onCancel={this.onCancel}
             cancelText={<span>CANCEL<Icon type='stop'/></span>}
             visible={this.state.visible}
           >
           <input
           placeholder='First Name'
           />
             </Antmodal>
          </div>  
        )
    }
}

export default Modal;