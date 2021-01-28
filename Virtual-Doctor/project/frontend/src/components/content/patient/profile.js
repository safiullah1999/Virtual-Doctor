import React, { Component } from "react";
import { List } from "antd";

export class Profile extends Component {
  constructor(props) {
    super(props);
    console.log("Patient portal profile", props)
    this.state = {
      info: []
    };
    console.log(this.props.userID);
    console.log(this.props.account);
  }
  async componentDidMount() {
    const url = "http://localhost:5000/api/getPatientProfile" + "?id=" + this.props.userID;
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
                <div style={{ "width": "400px", margin: "auto", border: "2px black solid" }}>
                  <List.Item style={{ color: "#302b63" }}>ID : {item.patient_id}</List.Item>
                  <List.Item style={{ color: "#302b63" }}>firstname : {item.firstname}</List.Item>
                  <List.Item style={{ color: "#302b63" }}>lastname : {item.lastname}</List.Item>
                  <List.Item style={{ color: "#302b63" }}>age : {item.lastname}</List.Item>
                  <List.Item style={{ color: "#302b63" }}>address : {item.address}</List.Item>
                  <List.Item style={{ color: "#302b63" }}>contact : {item.contact}</List.Item>
                  <List.Item style={{ color: "#302b63" }}>gender : {item.gender}</List.Item>
                  <List.Item style={{ color: "#302b63" }}>E-Mail : {item.email}</List.Item>
                  <List.Item style={{ color: "#302b63" }}>usertype : {item.usertype}</List.Item>
                  <List.Item style={{ color: "#302b63" }}>account : {item.account}</List.Item>
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
