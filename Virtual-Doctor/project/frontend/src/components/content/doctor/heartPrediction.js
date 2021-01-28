import React, { Component } from "react";
import { Form, Icon, Input, Button, Tooltip, notification } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  age: Yup.number()
    .required("Must enter Age")
    .positive("Must be a valid age"),
  sex: Yup.number()
    .required("Must enter Sex")
    .test("sexTest", "Must be a valid sex code", (val) => val == 0 || val == 1),
  cp: Yup.number()
    .required("must enter a CP")
    .test("cpTest", "Must be a valid cp", (val) => val >= 0 && val <= 3),
  trestbps: Yup.number().required("must enter trestBPS"),

  chol: Yup.number().required("must enter a chol"),
  fbs: Yup.number()
    .required("must enter FBS")
    .test("fbsTest", "Must be a valid gbs", (val) => val >= 0 && val <= 1),
  restecg: Yup.number()
    .required("must enter restecg ")
    .test(
      "restecgTest",
      "Must be a valid restecg",
      (val) => val >= 0 && val <= 2
    ),
  thalach: Yup.number().required("must enter thalach "),
  exang: Yup.number()
    .required("must enter exang ")
    .test("exangTest", "Must be a valid exang", (val) => val >= 0 && val <= 1),
  oldpeak: Yup.number().required("must enter oldpeak "),
  slope: Yup.number()
    .required("must enter slope ")
    .test("slopeTest", "Must be a valid slope", (val) => val >= 0 && val <= 2),
  ca: Yup.number()
    .required("must enter ca  ")
    .test("caTest", "Must be a valid ca", (val) => val >= 0 && val <= 4),
  thal: Yup.number()
    .required("must enter thal  ")
    .test("thalTest", "Must be a valid thal", (val) => val >= 0 && val <= 3),
});

export class HeartPrediction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: 0,
      prediction: "",
    };
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
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

        <Formik
          initialValues={{
            age: null,
            sex: null,
            cp: null,
            trestbps: null,
            chol: null,
            fbs: null,
            restecg: null,
            thalach: null,
            exang: null,
            oldpeak: null,
            slope: null,
            ca: null,
            thal: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            console.log(
              JSON.stringify({
                age: parseFloat(values.age),
                sex: parseFloat(values.sex),
                cp: parseFloat(values.cp),
                trestbps: parseFloat(values.trestbps),
                chol: parseFloat(values.chol),
                fbs: parseFloat(values.fbs),
                restecg: parseFloat(values.restecg),
                thalach: parseFloat(values.thalach),
                exang: parseFloat(values.exang),
                oldpeak: parseFloat(values.oldpeak),
                slope: parseFloat(values.slope),
                ca: parseFloat(values.ca),
                thal: parseFloat(values.thal),
              })
            );

            {
              fetch("http://localhost:4000/predictHeart", {
                method: "post",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  age: parseFloat(values.age),
                  sex: parseFloat(values.sex),
                  cp: parseFloat(values.cp),
                  trestbps: parseFloat(values.trestbps),
                  chol: parseFloat(values.chol),
                  fbs: parseFloat(values.fbs),
                  restecg: parseFloat(values.restecg),
                  thalach: parseFloat(values.thalach),
                  exang: parseFloat(values.exang),
                  oldpeak: parseFloat(values.oldpeak),
                  slope: parseFloat(values.slope),
                  ca: parseFloat(values.ca),
                  thal: parseFloat(values.thal),
                }),
              })
                .then((res) => res.json())
                .then((data1) => {
                  this.setState({ prediction: data1.prediction, flag: 1 });
                  console.log(data1, "heart prediction");
                })

                .catch((err) => console.log(err));
            }
            resetForm();
            this.setState({ prediction: "", flag: 0 });
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form style={{ display: "flex" }} onSubmit={handleSubmit}>
              <div
                style={{
                  padding: 20,
                  width: 400,
                  margin: "auto",
                  border: "2px black solid",
                }}
              >
                <Form.Item
                  help={touched.age && errors.age ? errors.age : ""}
                  validateStatus={
                    touched.age && errors.age ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Age :</span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Age"
                    name="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.sex && errors.sex ? errors.sex : ""}
                  validateStatus={
                    touched.sex && errors.sex ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>
                    Sex :{" "}
                    <Tooltip title="0 - Male, 1 - Female">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Sex"
                    name="sex"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sex}
                  />
                </Form.Item>

                <Form.Item
                  help={touched.cp && errors.cp ? errors.cp : ""}
                  validateStatus={touched.cp && errors.cp ? "error" : undefined}
                >
                  <span style={{ fontSize: "14px" }}>
                    CP :{" "}
                    <Tooltip title="Range -> 0-3">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter CP"
                    name="cp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cp}
                  />
                </Form.Item>
                <Form.Item
                  help={
                    touched.trestbps && errors.trestbps ? errors.trestbps : ""
                  }
                  validateStatus={
                    touched.trestbps && errors.trestbps ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>TrestBPS :</span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter trestbps"
                    name="trestbps"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.trestbps}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.chol && errors.chol ? errors.chol : ""}
                  validateStatus={
                    touched.chol && errors.chol ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Chol :</span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter chol"
                    name="chol"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.chol}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.fbs && errors.fbs ? errors.fbs : ""}
                  validateStatus={
                    touched.fbs && errors.fbs ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>
                    FBS :{" "}
                    <Tooltip title="0 or 1">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter FBS"
                    name="fbs"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fbs}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.restecg && errors.restecg ? errors.restecg : ""}
                  validateStatus={
                    touched.restecg && errors.restecg ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>
                    RestECG :{" "}
                    <Tooltip title="Range -> 0-2">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter restECG"
                    name="restecg"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.restecg}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.thalach && errors.thalach ? errors.thalach : ""}
                  validateStatus={
                    touched.thalach && errors.thalach ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Thalach :</span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter thalach"
                    name="thalach"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.thalach}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.exang && errors.exang ? errors.exang : ""}
                  validateStatus={
                    touched.exang && errors.exang ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>
                    Exang :{" "}
                    <Tooltip title="0 or 1">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter exang"
                    name="exang"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.exang}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.oldpeak && errors.oldpeak ? errors.oldpeak : ""}
                  validateStatus={
                    touched.oldpeak && errors.oldpeak ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Oldpeak :</span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter oldpeak"
                    name="oldpeak"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.oldpeak}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.slope && errors.slope ? errors.slope : ""}
                  validateStatus={
                    touched.slope && errors.slope ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>
                    Slope :{" "}
                    <Tooltip title="Range -> 0-2">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter slope"
                    name="slope"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.slope}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.ca && errors.ca ? errors.ca : ""}
                  validateStatus={touched.ca && errors.ca ? "error" : undefined}
                >
                  <span style={{ fontSize: "14px" }}>
                    CA :{" "}
                    <Tooltip title="Range -> 0-4">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter ca"
                    name="ca"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ca}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.thal && errors.thal ? errors.thal : ""}
                  validateStatus={
                    touched.thal && errors.thal ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>
                    Thal :{" "}
                    <Tooltip title="Range -> 0-3">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter thal"
                    name="thal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.thal}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
export default Form.create()(HeartPrediction);
