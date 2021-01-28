import React, { Component } from "react";
import { List } from "antd";

export class Profile extends Component {
  constructor(props) {
    super(props);
    console.log("Doctor portal profile",props)
    this.state = {
      
      info : [],
    };
    console.log(this.props.userID,111);
  }
  async componentDidMount() {



    const url = "http://localhost:5000/api/getDoctorProfile" +"?id=" +this.props.userID;
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
                  <List.Item style={{color:"#302b63"}}>ID : {item.doctor_id}</List.Item>
                  <List.Item style={{color:"#302b63"}}>First Name : {item.firstname}</List.Item>
                  <List.Item style={{color:"#302b63"}}>Last Name : {item.lastname}</List.Item>
                  <List.Item style={{color:"#302b63"}}>Type : {item.usertype}</List.Item>
                  <List.Item style={{color:"#302b63"}}>contact : {item.contact}</List.Item>
                  <List.Item style={{color:"#302b63"}}>department_id : {item.dept_id}</List.Item>
                  <List.Item style={{color:"#302b63"}}>joining_date : {item.joining_date}</List.Item>
                  <List.Item style={{color:"#302b63"}}>qualification : {item.qualification}</List.Item>
                  <List.Item style={{color:"#302b63"}}>gender : {item.gender}</List.Item>
                  <List.Item style={{color:"#302b63"}}>address : {item.address}</List.Item>
                  <List.Item style={{color:"#302b63"}}>salary : {item.salary}</List.Item>
                  
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
