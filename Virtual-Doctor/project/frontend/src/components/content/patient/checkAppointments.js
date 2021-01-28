import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";

///appointments in sorted order descending to ascending

export class CheckAppointments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: "Appointment id",
          dataIndex: "appointment_id",
          width: 150
        },
        {
          title: "Date",
          dataIndex: "appointment_date",
          width: 150
        },
        {
          title: "Doctor ID",
          dataIndex: "by_doctor_id"
        }
      ],
      info: []
    };
  }
  async componentDidMount() {
    const url =
      "http://localhost:5000/api/getAppointmentsPatient" +
      "?id=" +
      this.props.userID;
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
        <Table
          rowKey={record => record.appointment_id}
          columns={this.state.columns}
          dataSource={this.state.info}
          pagination={{ pageSize: 25 }}
          scroll={{ y: 300 }}
        />
      </div>
    );
  }
}

export default CheckAppointments;
