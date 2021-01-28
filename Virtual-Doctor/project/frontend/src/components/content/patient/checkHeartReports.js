import React, { Component } from "react";
import { Collapse, Table } from "antd";
import { Form, Input, Button } from "antd";

const { Panel } = Collapse;

export class checkHeartReports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flag: false,
            value: "",
            columns: [
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


        const url = "http://localhost:5000/api/getheartreport_all" + "?account=" + this.state.value;
        const response = await fetch(url);
        const data = await response.json();
        console.log("data:", data);
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
            for (var i = 0; i < this.state.info.length; i++) {

                console.log(this.state.info[i])
            }
        }

    }
    render() {
        console.log(this.state);
        return (
            <div>
                <form style={{ display: "flex" }}>
                    <Form.Item>
                        <h4>Enter your account to get your report:<strong>{this.props.account}</strong></h4>
                        <span style={{ fontSize: "14px" }}>Enter Account:</span>
                        <Input
                            size="default"
                            placeholder="Enter Account"
                            onChange={this.handleChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.handle}>
                            Get Heart Reports
            </Button>
                    </Form.Item>
                </form>
                <div>
                    {this.state.flag ? (
                        <Collapse defaultActiveKey={["1"]}>
                            <Panel header="Heart Report" key="{heart_report_id}">
                                {/* <Button>for prediction</Button> */}
                                <Table
                                    // rowKey={record => heart_report_id}
                                    columns={this.state.columns}
                                    dataSource={this.state.info}
                                />
                            </Panel>
                        </Collapse>
                    ) : (
                            <div></div>
                        )}
                </div>
            </div>
        );
    }
}

export default checkHeartReports;
