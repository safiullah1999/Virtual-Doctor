import React, { Component } from "react";
import { Progress } from "antd";

export class ShowStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countDoctor: 0,
      countAdmin: 0,
      countPatient: 0,
      sumCount : 0
    };
  }
  async componentDidMount() {
    const url1 = "http://localhost:5000/api/getCountAdmin";
    const response1 = await fetch(url1);
    const data1 = await response1.json();
    console.log(data1,"frommmmm")
    this.setState({
      countAdmin: parseInt(data1[0].count,10)
    });

    const url2 = "http://localhost:5000/api/getCountPatient";
    const response2 = await fetch(url2);
    const data2 = await response2.json();

    this.setState({
      countPatient: parseInt(data2[0].count,10)
    });

    const url3 = "http://localhost:5000/api/getCountDoctor";
    const response3 = await fetch(url3);
    const data3 = await response3.json();

    this.setState({
        countDoctor: parseInt(data3[0].count,10)
      });

      
    this.setState({
        sumCount: Number(this.state.countPatient+this.state.countAdmin+this.state.countDoctor)
       });
      
  }
  render() {
    return (
      <div>
          <span>Admin Count</span>
        <Progress percent={this.state.countAdmin} />
        <span>Patient Count</span>
        <Progress percent={this.state.countPatient} />
        <span>Doctor Count</span>
        <Progress percent={this.state.countDoctor} />
        <span>All USERS</span>
        <Progress percent={this.state.sumCount} />
        
      </div>
    );
  }
}

export default ShowStatistics;
