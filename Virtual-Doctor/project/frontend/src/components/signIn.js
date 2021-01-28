import React, { Component } from "react";
import "../components/signIn.css";
import { updateUser } from "../redux/actions.js";
import { connect } from "react-redux";
import { Button, Icon } from "antd";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      userID: "", //"D190001"//A190001,P190001
      userPassword: "", //"1234",
      userType: "",
      account: "",
      info: [],
      flag: false,
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(
      "http://localhost:5000/api/login" +
      "?id=" +
      this.state.userID +
      "&password=" +
      this.state.userPassword
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            userType: data.type,
            account: data.account,
          },
          () => {
            console.log("account", data)
            this.props.updateUser(this.state.userID, this.state.userType, this.state.account);
          }
        );
      })
      .catch((err) => console.log(err));

    // sav userID and push history

    setTimeout(() => {
      if (this.state.userType === "admin") {
        setTimeout(() => {
          this.props.history.push("/admin");
        }, 500);
      } else if (this.state.userType === "doctor") {
        setTimeout(() => {
          this.props.history.push("/doctor");
        }, 500);
      } else if (this.state.userType === "patient") {
        setTimeout(() => {
          this.props.history.push("/patient");
        }, 500);
      } else {
        console.log(this.state);
      }
    }, 350);
  }
  handleChangeInput(e) {
    console.log(e.target.value);
    this.setState({
      userID: e.target.value,
    });
  }
  handleChangePassword(e) {
    console.log(e.target.value);
    this.setState({
      userPassword: e.target.value,
    });
  }
  render() {
    return (
      <div
        className="container"
        id="container"
        style={{ margin: "auto", marginTop: 30 }}
      >
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>

            <input
              type="input"
              placeholder="ID"
              onChange={this.handleChangeInput}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={this.handleChangePassword}
            />

            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              <Icon type="login" />
              Login
            </Button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <h1>Hello, User!</h1>
              <p>please login with your personal info</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data, type, account) => dispatch(updateUser(data, type, account)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
