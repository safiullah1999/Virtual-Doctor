import ChatBot from "react-simple-chatbot";
import React, { Component } from "react";
import { Button } from "antd";
import SymptomsPrediction from "./symptomsPrediction.js";
//import "./App.css";

class VirtualDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: [
        {
          id: "1",
          message:
            "Hi , nice to meet you! Do you want to get virtually diagnosed?",
          trigger: "2",
        },
        {
          id: "2",
          options: [
            { value: 1, label: "Yes", trigger: "3" },
            { value: 2, label: "No", trigger: "5" },
          ],
        },
        {
          id: "3",
          message: "Please select the symptoms from the symptom window",
          trigger: "4",
        },
        {
          id: "4",
          component: <SymptomsPrediction />,
        },
        {
          id: "5",
          message: "Have you changed your mind?",
          trigger: "6",
        },
        {
          id: "6",
          options: [{ value: 1, label: "Yes", trigger: "3" }],
        },
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <div style={{ align: "center" ,marginLeft: "330px"}}>
          <ChatBot steps={this.state.steps} />
        </div>
      </div>
    );
  }
}

export default VirtualDoctor;
