import React, { Component } from "react";
import { Collapse, Table } from "antd";

const { Panel } = Collapse;

export class CheckPrescriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {

      columns: [
        {
          title: "Medicine Name",
          dataIndex: "med_name",
          width: 150
        },
        {
          title: "Dosage",
          dataIndex: "dosage",
          width: 150
        },
      ],
      info: [],
    };

  }
  async componentDidMount() {
    this.setState({
      info: []
    })
    const url = "http://localhost:5000/api/getPrescriptionsPatient" + "?account=" + this.props.account;
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      info: data
    });
    console.log(this.state.info, "pres");

  }
  render() {

    return (
      <div>
        <Collapse defaultActiveKey={["1"]}>
          {this.state.info.map((info, index) => {
            const { id, firstname, lastname, issue_date, prescriptions } = info; //destructuring
            console.log(prescriptions)
            const value = issue_date + 1;
            const reportName = "BY : " + firstname + " " + lastname + ", DATE : " + issue_date;
            return (
              <Panel header={reportName} key={reportName}>
                <Table
                  rowKey={record => record.med_name}
                  columns={this.state.columns}
                  dataSource={prescriptions}
                />
              </Panel>
            );
          })}
        </Collapse>
      </div>
    );
  }
}

export default CheckPrescriptions;
