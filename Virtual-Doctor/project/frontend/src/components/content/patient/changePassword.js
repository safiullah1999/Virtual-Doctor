import React, { Component } from "react";
import { Button } from "antd";

export class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword : "",
      newPassword : ""

    };
    this.checkPassword = this.checkPassword.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.update1 = this.update1.bind(this);
    this.update2 = this.update2.bind(this);
  }
  update1(e){
    this.setState({
      currentPassword : e.target.value
    })
  }
  update2(e){
    this.setState({
      newPassword : e.target.value
    })
  }
  checkPassword(e) {
    console.log(e)

    fetch(
      "http://localhost:5000/api/checkPasswordPatient" +
        "?id=" + this.props.userID + "&password=" + this.state.currentPassword,
    )
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        console.log(data.message);
      })
      .catch(err => console.log(err));
  }
  updatePassword(e) {
    fetch(
      "http://localhost:5000/api/updatePasswordPatient" +
        "?id=" +
        this.props.userID,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: this.state.newPassword
        })
      }
    )
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      console.log(data.message);
    })
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div style={{ margin: "auto" }}>
        <span>Enter current password : </span>
        <br />

        <input style={{ width: "250px" }} type="text" name="currentpassword" onChange={this.update1} />
        <br />
        <Button type="primary" htmlType="submit" onClick={this.checkPassword}>
          Check Password
        </Button>
        <br />
        <br />

        <span>Enter new password : </span>
        <br />

        <input style={{ width: "250px" }} type="text" name="newpassword" onChange={this.update2} />
        <br />
        <Button type="primary" htmlType="submit" onClick={this.updatePassword}>
          Submit
        </Button>
      </div>
    );
  }
}

export default ChangePassword;

{
  /* fetch(
            "http://localhost:5000/api/updatePasswordAdmin" +
              "?id=" +
              this.props.userID,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                password: values.newPassword
              })
            }
          )
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err)); */
}
