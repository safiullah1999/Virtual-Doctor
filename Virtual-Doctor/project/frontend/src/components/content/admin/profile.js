import React, { Component } from "react";
import { List } from "antd";

export class Profile extends Component {
  constructor(props) {
    super(props);
    console.log("Admin portal profile", props);
    this.state = {
      info: []
    };
    console.log(this.props.userID, 111);
  }
  async componentDidMount() {
    const url =
      "http://localhost:5000/api/getAdminProfile" + "?id=" + this.props.userID;
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      info: data
    });
    console.log(this.state.info);
  }
  render() {
    return (
      <div>
        {
          <List
            size="large"
            bordered
            dataSource={this.state.info}
            renderItem={item => {
              return (
                <div style={{"width" : "400px",margin:"auto",border: "2px black solid"}}>
                  <List.Item style={{color:"#302b63"}}>ID : {item.admin_id}</List.Item>
                  <List.Item style={{color:"#302b63"}}>First Name : {item.firstname}</List.Item>
                  <List.Item style={{color:"#302b63"}}>Last Name : {item.lastname}</List.Item>
                  <List.Item style={{color:"#302b63"}}>E-Mail : {item.email}</List.Item>
                  <List.Item style={{color:"#302b63"}}>Type : {item.usertype}</List.Item>
                </div>
              );
            }}
          />
        }
      </div>
    );
  }
}

export default Profile;
