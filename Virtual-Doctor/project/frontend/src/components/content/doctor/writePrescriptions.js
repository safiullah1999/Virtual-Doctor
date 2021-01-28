import React, { Component } from "react";
import { AutoComplete, InputNumber, Button, Table } from "antd";
import { Input } from "antd";

export class WritePrescriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      medObject: [], //all medicines from get in obj(med_id,med_cost,med_name)
      dataSource: [], //all medicine name
      dosage: "1", //input dosage
      medicine: "", //input medicine
      account: "", //input id
      info: [], //all medicines as obj(med_name,dosage,med_id,)
      output: [],
      date: "", //issue_date
      dataFlag: false, //
      columns: [
        {
          title: "Medicine name",
          dataIndex: "med_name",
          key: "med_name"
        },
        {
          title: "Dosage",
          dataIndex: "dosage",
          key: "dosage"
        },
        {
          title: "Medicine ID",
          dataIndex: "med_id"
          //key: "age"
        }
      ]
    };
    this.onChangeDosage = this.onChangeDosage.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeID = this.onChangeID.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findWithAttr = this.findWithAttr.bind(this);
  }
  async componentDidMount() {
    const url = "http://localhost:5000/api/getAllMedicines";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      medObject: data
    });

    const arr = [];

    for (let i = 0; i < this.state.medObject.length; i++) {
      arr.push(this.state.medObject[i].med_name);
    }
    var todayDate = new Date().toISOString().slice(0, 10);

    this.setState({
      dataSource: arr,
      date: todayDate
    });
  }
  onChangeDosage(e) {
    this.setState({
      dosage: e
    });
  }
  onChangeInput(e) {
    this.setState({
      medicine: e
    });
  }
  onChangeID(e) {
    this.setState({
      account: e.target.value
    });
  }
  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return array[i]["med_id"];
      }
    }
    return -1;
  }
  handleClick(e) {
    if (this.state.medicine !== "" && this.state.account !== "") {
      const a = {};
      const b = {};

      const code = this.findWithAttr(
        this.state.medObject,
        "med_name",
        this.state.medicine
      );
      a["med_name"] = this.state.medicine;
      a["dosage"] = this.state.dosage;
      a["med_id"] = code;

      b["med_id"] = code;
      b["dosage"] = this.state.dosage;
      const array = [...this.state.info, a];
      const array1 = [...this.state.output, b];

      this.setState({
        output: array1,
        info: array,
        dataFlag: true,
        medicine: "",
        dosage: ""
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    console.log(
      "submitting ",
      this.state.output,
      this.state.date,
      this.props.userID,
      this.state.account
    );
    fetch("http://localhost:5000/api/postPrescription", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        account: this.state.account,
        doctor_id: this.props.userID,
        issue_date: this.state.date,
        Medicine: this.state.output
      })
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(err => console.log(err));


  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <AutoComplete
            style={{ width: 200, margin: "auto" }}
            dataSource={this.state.dataSource}
            placeholder="Enter Medicine"
            onChange={this.onChangeInput}
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />

          <InputNumber
            style={{ width: 200, height: "40px" }}
            min={1}
            max={10}
            defaultValue={1}
            onChange={this.onChangeDosage}
          />
          <Input
            style={{ width: 200, height: "40px" }}
            placeholder="Enter Account"
            onChange={this.onChangeID}
          />

          <Button style={{ borderWidth: "5px", marginTop: "10px" }} type="primary" onClick={this.handleClick}>
            Add
          </Button>
          <Button style={{ marginTop: "10px" }} type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
        {this.state.dataFlag ? (
          <div>
            <Table
              dataSource={this.state.info}
              columns={this.state.columns}
              rowKey={this.state.info.code}
            />
          </div>
        ) : (
            <div>no data found</div>
          )}
      </div>
    );
  }
}

export default WritePrescriptions;
