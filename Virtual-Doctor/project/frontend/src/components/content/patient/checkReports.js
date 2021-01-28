import React, { Component } from "react";
import { Collapse, Table, Button, notification } from "antd";

const { Panel } = Collapse;

export class checkReports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: "report_id",
          dataIndex: "report_id",
          width: 150,
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => this.compareByAlph(a.report_id, b.report_id),
        },
        {
          title: "haematocrit",
          dataIndex: "haematocrit",
          width: 150,
        },
        {
          title: "erythrocytes_rbc",
          dataIndex: "erythrocytes_rbc",
        },
        {
          title: "leucocytes_wbc",
          dataIndex: "leucocytes_wbc",
        },
        {
          title: "rdw_cv",
          dataIndex: "rdw_cv",
        },
        {
          title: "platelets",
          dataIndex: "platelets",
        },
        {
          title: "pdw",
          dataIndex: "pdw",
        },
        {
          title: "mpv",
          dataIndex: "mpv",
        },
      ],
      info: [],


      heartColumns: [
        {
          title: "report_id",
          dataIndex: "heart_report_id",
          width: 150,
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => this.compareByAlph(a.report_id, b.report_id),
        },
        {
          title: "age",
          dataIndex: "age",
          width: 150,
        },
        {
          title: "sex",
          dataIndex: "sex",
        },
        {
          title: "cp",
          dataIndex: "cp",
        },
        {
          title: "trestbps",
          dataIndex: "trestbps",
        },
        {
          title: "chol",
          dataIndex: "chol",
        },
        {
          title: "fbs",
          dataIndex: "fbs",
        },
        {
          title: "restecg",
          dataIndex: "restecg",
        },
        {
          title: "thalach",
          dataIndex: "thalach",
        },
        {
          title: "exang",
          dataIndex: "exang",
        },
        {
          title: "oldpeak",
          dataIndex: "oldpeak",
        },
        {
          title: "slope",
          dataIndex: "slope",
        },
        {
          title: "ca",
          dataIndex: "ca",
        },
        {
          title: "thal",
          dataIndex: "thal",
        },
        {
          title: "Action",
          key: "operation",
          // render: () => (
          //   <Button type="primary" onClick={this.getPrediction}>
          //     Get Prediction
          //   </Button>
          // ),
        },
      ],
      heartInfo: [],
      reportObj: {},
      prediction: null,
      flag: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.compareByAlph = this.compareByAlph.bind(this);
    this.getPrediction = this.getPrediction.bind(this);
  }

  getPrediction() {
    //let obj = this.state.reportObj;
    // console.log(
    //   JSON.stringify(
    //     obj
    //   ),"stringify"
    // );
    const sendReport = this.state.reportObj;
    delete sendReport["heart_report_id"];
    console.log(JSON.stringify(sendReport));
    fetch("http://localhost:4000/predictHeart", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendReport),
    })
      .then((res) => res.json())
      .then((data1) => {
        //alert(data1.prediction);
        this.setState({ prediction: data1.prediction, flag: 1 });
        // console.log(data1, "heart prediction");
      })
      .catch((err) => console.log(err));
  }


  compareByAlph(a, b) {
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  }
  onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }
  async componentDidMount() {
    //general report
    const url =
      "http://localhost:5000/api/getreportspatient" +
      "?account=" +
      this.props.userID;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      info: data,
      flag: true
    });

    // console.log(this.state.info, "not heart");

    //heart report
    fetch(
      "http://localhost:5000/api/getheartreport_all" + "?account=" + this.props.userID
    )
      .then((res) => res.json())
      .then((data1) => {
        this.setState({
          heartInfo: [...this.state.heartInfo, data1],
          reportObj: data1,
        });
        // console.log(this.state.heartInfo, "heart");
        // console.log(this.state.reportObj, "heart obj");
      })
      .catch((err) => console.log(err));
  }
  render() {
    const openNotificationWithIcon = (type) => {
      notification[type]({
        message: "Heart Report Prediction",
        description:
          this.state.prediction +
          ", (Yes -> Heart Disease, No -> No Heart Disease) ",
      });
    };

    return (
      <div>
        <div>
          {this.state.flag ? openNotificationWithIcon("warning") : undefined}
        </div>

        <div
          style={{ marginBottom: "10px", marginTop: "10px", fontSize: "16px" }}
        >
          <strong>General Report</strong>
        </div>
        <div>
          <Table
            rowKey={(record) => record.report_id}
            columns={this.state.columns}
            onChange={this.onChange}
            dataSource={this.state.info}
          />
        </div>
        <div></div>
        <div
          style={{ marginBottom: "10px", marginTop: "10px", fontSize: "16px" }}
        >
          <strong>Heart Report</strong>
        </div>


        <div>
          <Table
            rowKey={(record) => record.heart_report_id}
            columns={this.state.heartColumns}
            onChange={this.onChange}
            dataSource={this.state.heartInfo}
          />
        </div>
      </div>
    );
  }
}

export default checkReports;
