import React, { Component } from "react";
import { Collapse, Table } from "antd";
import { Form, Input, Button } from "antd";
import { randomBytes } from "crypto";

const { Panel } = Collapse;

export class CheckPrescriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: false,
      value: "",
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
        }
      ],
      info: []
    };

    this.handle = this.handle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState(
      {
        value: e.target.value
      },
      () => console.log(this.state, this.state.value)
    );
  }

  async handle() {
    this.setState({
      flag: false,
      info: []

    });
    console.log(this.state.info, "check");

    const url =
      "http://localhost:5000/api/getPrescriptionsPatient" +
      "?account=" +
      this.state.value;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data, "check data");
    if (data !== undefined) {
      this.setState({
        info: data,
        flag: true
      });
      console.log(this.state.info);
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <form style={{ display: "flex" }}>
          <Form.Item>
            <span style={{ fontSize: "14px" }}>Enter account:</span>
            <Input
              size="default"
              placeholder="Enter Account"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handle}>
              Submit
            </Button>
          </Form.Item>
        </form>
        <div>
          {this.state.flag ? (
            <Collapse defaultActiveKey={["1"]}>
              {this.state.info.map((info, index) => {
                const {
                  id,
                  firstname,
                  lastname,
                  issue_date,
                  prescriptions
                } = info; //destructuring
                const value = issue_date + 1;
                const reportName =
                  "BY : " +
                  firstname +
                  " " +
                  lastname +
                  ", DATE : " +
                  issue_date;
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
          ) : (
              <div></div>
            )}
        </div>
      </div>
    );
  }
}


export default CheckPrescriptions;
