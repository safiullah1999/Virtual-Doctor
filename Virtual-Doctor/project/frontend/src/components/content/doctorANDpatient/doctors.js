import React, { Component } from "react";
import { Card, Col, Row, Button } from "antd";

export class Doctors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: []
    };

    this.appointment = this.appointment.bind(this);
  }
  async componentDidMount() {
    const url = "http://localhost:5000/api/getAllDoctors";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      info: data
    });
    console.log(this.state.info);
  }

  appointment(e) {

    let num = e.target.id;
    
    fetch("http://localhost:5000/api/bookAppointment", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              doctor_id : num,
              patient_id : this.props.userID
            })
          })
            .then(res => res.json())
            .then(data => alert(data.message))
            .catch(err => console.log(err));
  }

  render() {
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Row gutter={16}>
          {this.state.info.map(info => {
            const {
              firstname,
              lastname,
              joining_date,
              qualification,
              doctor_id
            } = info;
            const name = firstname + " " + lastname;
            return (
              <Col span={8} key={doctor_id}>
                <Card
                  title={name}
                  bordered={false}
                  style={{ width: 300, marginTop: 16 }}
                >
                  <span>Doctor ID : {doctor_id}</span>
                  <br />
                  <span>Join Date : {joining_date}</span>
                  <br />
                  <span>Qualification : {qualification}</span>
                  <br />
                 
                  <Button
                    style={{ marginTop: 5 }}
                    type="primary"
                    htmlType="submit"
                    onClick={this.appointment}
                    id={doctor_id}
                  >
                    Book Appointment
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default Doctors;
