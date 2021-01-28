import React, { Component } from "react";
import { Collapse, Table } from "antd";
import { Form, Input, Button } from "antd";

const { Panel } = Collapse;

export class checkReports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: false,
      value: "",
      columns: [
        {
          title: "haematocrit",
          dataIndex: "haematocrit",
          width: 150
        },
        {
          title: "erythrocytes_rbc",
          dataIndex: "erythrocytes_rbc"
        },
        {
          title: "leucocytes_wbc",
          dataIndex: "leucocytes_wbc"
        },
        {
          title: "rdw_cv",
          dataIndex: "rdw_cv"
        },
        {
          title: "platelets",
          dataIndex: "platelets"
        },
        {
          title: "pdw",
          dataIndex: "pdw"
        },
        {
          title: "mpv",
          dataIndex: "mpv"
        },
      ],
      info: [],
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

    });

    const url = "http://localhost:5000/api/getreportspatient" + "?account=" + this.state.value;
    const response = await fetch(url);
    const data = await response.json();

    const s = []
    for (var i = 0; i < data.length; i++) {
      s.push(Object.values(data[i]))
    }

    console.log(s, "sadasdasdasd");

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
            <span style={{ fontSize: "14px" }}>Enter Account:</span>
            <Input
              size="default"
              placeholder="Enter Account"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handle}>
              Search
            </Button>
          </Form.Item>
        </form>
        <div>
          {this.state.flag ? (
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="General Report" key="{report_id}">
                {/* <Button>for prediction</Button> */}
                <Table
                  // rowKey={record => heart_report_id}
                  columns={this.state.columns}
                  dataSource={this.state.info}
                />
              </Panel>
            </Collapse>

            // <Collapse defaultActiveKey={["1"]}>
            //   {this.state.info.map((info, index) => {
            //     const { report_id } = info;
            //     const reportName = "Report : " + report_id;
            //     return (
            //       <Panel header={reportName} key={report_id}>
            //         {/* <Button>for prediction</Button> */}
            //         <Table
            //           rowKey={record => record.report_id}
            //           columns={this.state.columns}
            //           dataSource={this.state.info}
            //         />
            //       </Panel>
            //     );
            //   })}
            // </Collapse>
          ) : (
              <div></div>
            )}
        </div>
      </div>
    );
  }
}

export default checkReports;
