import { Checkbox } from "antd";
import React, { Component } from "react";
import { Button, notification, Modal } from "antd";

// import "./symptomsPrediction

export default class SymptomsPrediction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      notificationFlag: 0,
      symptoms: [
        "back_pain",
        "constipation",
        "abdominal_pain",
        "diarrhoea",
        "mild_fever",
        "yellow_urine",
        "yellowing_of_eyes",
        "acute_liver_failure",
        "fluid_overload",
        "swelling_of_stomach",
        "swelled_lymph_nodes",
        "malaise",
        "blurred_and_distorted_vision",
        "phlegm",
        "throat_irritation",
        "redness_of_eyes",
        "sinus_pressure",
        "runny_nose",
        "congestion",
        "chest_pain",
        "weakness_in_limbs",
        "fast_heart_rate",
        "pain_during_bowel_movements",
        "pain_in_anal_region",
        "bloody_stool",
        "irritation_in_anus",
        "neck_pain",
        "dizziness",
        "cramps",
        "bruising",
        "obesity",
        "swollen_legs",
        "swollen_blood_vessels",
        "puffy_face_and_eyes",
        "enlarged_thyroid",
        "brittle_nails",
        "swollen_extremeties",
        "excessive_hunger",
        "extra_marital_contacts",
        "drying_and_tingling_lips",
        "slurred_speech",
        "knee_pain",
        "hip_joint_pain",
        "muscle_weakness",
        "stiff_neck",
        "swelling_joints",
        "movement_stiffness",
        "spinning_movements",
        "loss_of_balance",
        "unsteadiness",
        "weakness_of_one_body_side",
        "loss_of_smell",
        "bladder_discomfort",
        "foul_smell_of urine",
        "continuous_feel_of_urine",
        "passage_of_gases",
        "internal_itching",
        "toxic_look_(typhos)",
        "depression",
        "irritability",
        "muscle_pain",
        "altered_sensorium",
        "red_spots_over_body",
        "belly_pain",
        "abnormal_menstruation",
        "dischromic _patches",
        "watering_from_eyes",
        "increased_appetite",
        "polyuria",
        "family_history",
        "mucoid_sputum",
        "rusty_sputum",
        "lack_of_concentration",
        "visual_disturbances",
        "receiving_blood_transfusion",
        "receiving_unsterile_injections",
        "coma",
        "stomach_bleeding",
        "distention_of_abdomen",
        "history_of_alcohol_consumption",
        "blood_in_sputum",
        "prominent_veins_on_calf",
        "palpitations",
        "painful_walking",
        "pus_filled_pimples",
        "blackheads",
        "scurring",
        "skin_peeling",
        "silver_like_dusting",
        "small_dents_in_nails",
        "inflammatory_nails",
        "blister",
        "red_sore_around_nose",
        "yellow_crust_ooze",
      ],
      userSymptoms: [],
      prediction: "",
      check: ["back_pain", "constipation"],
    };
  }

  addSymptoms = (e) => {
    var flag = 0;
    for (let i = 0; i < this.state.userSymptoms.length; i++) {
      if (this.state.userSymptoms[i] === e.target.defaultValue) {
        this.state.userSymptoms.splice(i, 1);
        flag = 1;
        console.log("splice");
        break;
      }
    }

    if (flag === 0) {
      this.state.userSymptoms.push(e.target.defaultValue);
      console.log("push");
    }
    console.log(this.state.userSymptoms);
  };
  check = (e) => {
    // console.log(e.target.className);
    // console.log(e.target.value);
    e.target.classList.replace("b1", "b2");
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    fetch("http://localhost:4000/predictDisease", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symptoms: this.state.userSymptoms,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          prediction: data.prediction,
          notificationFlag: 1,
        });
        // alert(data.prediction);
        console.log(this.state.prediction);
      })
      .catch((err) => console.log(err));

    this.setState({
      visible: false,
      notificationFlag: 0,
    });
  };

  handleCancel = (e) => {
    console.log(e.target);
    this.setState({
      visible: false,
      notificationFlag: 0,
    });
  };
  render() {
    const openNotificationWithIcon = (type) => {
      notification[type]({
        message: "Symptoms Prediction",
        description:
          "According to your symptoms, the predicted disease is " +
          this.state.prediction,
      });
    };

    return (
      <div>
        <div>
          {this.state.notificationFlag
            ? openNotificationWithIcon("warning")
            : undefined}
        </div>

        <Button type="primary" onClick={this.showModal}>
          Select Symptoms
        </Button>
        <Modal
          title="Select Symptoms"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.symptoms.map((info) => {
            let temp = info;
            info = info.replace(/_/g, " ");
            info = info[0].toUpperCase() + info.slice(1);

            return (
              <Checkbox
                key={temp}
                style={{
                  color: "red",
                  margin: "5px",
                  align: "center",
                  display: "block",
                }}
                className="grid"
                onChange={this.addSymptoms}
                defaultValue={temp}
              >
                {info}
              </Checkbox>
            );
          })}
        </Modal>
      </div>
    );
  }
}
