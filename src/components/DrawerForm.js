import React, { Component } from "react";
import { Drawer, Button, Icon } from "antd";
import Axios from "axios";
import { connect } from "react-redux";

class DrawerForm extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      firstName: "",
      lastName: "",
      email: "",
      createUsername: "",
      createPassword: ""
    };
  }
  // arrayChanger = () => {
  // console.log(this.props.setUser)
  //let users = {
  //firstName: this.state.firstName,
  //lastName: this.state.lastName,
  //email: this.state.email,
  //createUsername: this.state.createUsername,
  //createPassword: this.state.createPassword
  //}
  //cannot mutate state/props-create a duplicate
  //let tempArr = this.props.setUser.newUser
  //tempArr.push(users) //pushing the text into tempArr
  //this.props.userAdder(tempArr)
  //}
  addUser = e => {
    e.preventDefault();
    Axios.post("/api/addUser", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      createUsername: this.state.createUsername,
      createPassword: this.state.createPassword
    }).then(resp => {
      this.onClear();
      this.props.userAdder(resp.data);
      alert('New User Created')
      console.log(resp);
    });
  };

  userChange = (e, stateProperty) => {
    this.setState({ [stateProperty]: e.target.value });
  };

  onClear = () => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      createUsername: "",
      createPassword: ""
    });
  };

  render() {
    console.log(this.props);
    return (
      <Drawer
        title="Create an Account"
        placement="right"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <input
          className="form-control"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={e => this.userChange(e, "firstName")}
        />
        <input
          className="form-control"
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={e => this.userChange(e, "lastName")}
        />
        <input
          className="form-control"
          placeholder="Email"
          value={this.state.email}
          onChange={e => this.userChange(e, "email")}
        />
        <input
          className="form-control"
          placeholder="Create Username"
          value={this.state.createUsername}
          onChange={e => this.userChange(e, "createUsername")}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Create Password"
          value={this.state.createPassword}
          onChange={e => this.userChange(e, "createPassword")}
        />
        <br />
        <br />

        <button onClick={e => this.addUser(e)} className="signup">
          <Icon type="check" />
          Submit
        </button>

        {
          //<button onClick={this.arrayChanger} className='signup'><Icon type='check' />SUBMIT</button>
        }
        <button onClick={() => this.props.onClose()} className="signup">
          <Icon type="close" />
          Cancel
        </button>
      </Drawer>
    );
  }
}

//create mapStateToProps function
const mapStateToProps = state => state;
//you'll use this to dispatch payloads to redux
const mapDispatchToProps = dispatch => ({
  //functions added here will be available on props
  userAdder(newUser) {
    //dispatches and object with type and payload
    //numberAdder seen in props
    dispatch({
      type: "ADD_USER", //type is where we send it
      payload: newUser //payload is the data
    });
  },
  addText(e) {
    dispatch({
      type: "SET_USER",
      payload: e.target.value
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerForm);
//be sure to add parenthesis around your component name as well
//connect takes 2 params: mapStateToProps, and object
