import React, { Component } from "react";
import { Table } from "antd";

export class AllScheduledAppointments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: "First Name",
          dataIndex: "firstname",
          width: 150
        },
        {
          title: "Last Name",
          dataIndex: "lastname",
          width: 150
        },
      ],
      info: []
    };
  }

  async componentDidMount() {
    const url =
      "http://localhost:5000/api/getAllScheduledAppointments" +
      "?id=" +
      this.props.userID;
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      info: data
    });
  }

  render() {
    return (
      <div>
        <Table
          rowKey={record => record.firstname}
          columns={this.state.columns}
          dataSource={this.state.info}
          pagination={{ pageSize: 25 }}
          scroll={{ y: 300 }}
        />
      </div>
    );
  }
}

export default AllScheduledAppointments;