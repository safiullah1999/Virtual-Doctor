import React, { Component } from "react";
import { Table } from "antd";

export class ShowBill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: "Patient ID",
          dataIndex: "patient_id",
          width: 150
        },
        {
          title: "Total Cost",
          dataIndex: "total_cost",
          width: 150
        },
        {
          title: "Bill Date",
          dataIndex: "bill_date",
          width: 150
        }
      ],
      info: []
    };
  }
  async componentDidMount() {
    const url =
      "http://localhost:5000/api/getBill" + "?id=" + this.props.userID;
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
          rowKey={record => record.bill_id}
          columns={this.state.columns}
          dataSource={this.state.info}
        />
      
      </div>
    );
  }
}

export default ShowBill;
