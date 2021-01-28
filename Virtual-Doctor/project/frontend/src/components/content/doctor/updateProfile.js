import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Icon, Input, Button } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("must enter a firstname"),
  lastname: Yup.string().required("must enter a lastname"),
  age: Yup.number().required("must enter a age"),
  address: Yup.string().required("must enter a address"),
  contact: Yup.number().required("must enter a contact"),
  gender: Yup.string().required("must enter a gender"),
  email: Yup.string()
    .required("must enter a email")
    .email("must be a valid email address"),
  department_id: Yup.string()
    .required("must enter a number")
    .test(
      "range",
      "Must be a valid department id",
      val => val >= "Dp190001" && val <= "Dp190004"
    ),
  qualification: Yup.string().required("must enter latest qualification"),
  salary: Yup.number().required("must enter a salary")
});

export class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: [
        {
          firstname: "",
          lastname: "",
          age: "",
          address: "",
          contact: "",
          gender: "",
          email: "",
          dept_id: "",
          qualification: "",
          salary: ""
        }
      ],
      flag: false
    };
  }

  async componentDidMount() {
    const url =
      "http://localhost:5000/api/getDoctorProfile" + "?id=" + this.props.userID;
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      info: data,
      flag: true
    });
    console.log(this.state.info, "infooooo");
  }

  render() {
    return (
      <div>
        {console.log(this.state.info, "info123")}
        <Formik
          enableReinitialize
          //initialValues={this.state.info[0]}
          initialValues={{
            firstname: this.state.info[0].firstname,
            lastname: this.state.info[0].lastname,
            age: this.state.info[0].age,
            address: this.state.info[0].address,
            contact: this.state.info[0].contact,
            gender: this.state.info[0].gender,
            email: this.state.info[0].email,
            department_id: this.state.info[0].dept_id,
            qualification: this.state.info[0].qualification,
            salary: this.state.info[0].salary
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            fetch("http://localhost:5000/api/postDoctorRequest", {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                doctor_id: this.props.userID,
                firstname: values.firstname,
                lastname: values.lastname,
                age: values.age,
                address: values.address,
                contact: values.contact,
                qualification: values.qualification,
                dept_id: values.department_id,
                gender: values.gender,
                email: values.email,
                salary: values.salary
              })
            })
              .then(res => res.json())
              .then(data => alert(data.message))
              .catch(err => console.log(err));

            resetForm();
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
            isSubmitting
          }) => (
            <form style={{ display: "flex" }} onSubmit={handleSubmit}>
              <div
                style={{
                  padding: 20,
                  width: 400,
                  margin: "auto",
                  border: "2px black solid"
                }}
              >
                <Form.Item
                  help={
                    touched.firstname && errors.firstname
                      ? errors.firstname
                      : ""
                  }
                  validateStatus={
                    touched.firstname && errors.firstname ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Firstname :</span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Firstname"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                </Form.Item>
                <Form.Item
                  help={
                    touched.lastname && errors.lastname ? errors.lastname : ""
                  }
                  validateStatus={
                    touched.lastname && errors.lastname ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Lastname :</span>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Lastname"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                </Form.Item>
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
                  help={touched.address && errors.address ? errors.address : ""}
                  validateStatus={
                    touched.address && errors.address ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Address :</span>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Address"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.contact && errors.contact ? errors.contact : ""}
                  validateStatus={
                    touched.contact && errors.contact ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Contact Number :</span>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Contact Number"
                    name="contact"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contact}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.gender && errors.gender ? errors.gender : ""}
                  validateStatus={
                    touched.gender && errors.gender ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Gender :</span>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Gender"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.email && errors.email ? errors.email : ""}
                  validateStatus={
                    touched.email && errors.email ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Email :</span>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </Form.Item>
                <Form.Item
                  help={
                    touched.department_id && errors.department_id
                      ? errors.department_id
                      : ""
                  }
                  validateStatus={
                    touched.department_id && errors.department_id
                      ? "error"
                      : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Department ID :</span>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Department ID"
                    name="department_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department_id}
                  />
                </Form.Item>
                <Form.Item
                  help={
                    touched.qualification && errors.qualification
                      ? errors.qualification
                      : ""
                  }
                  validateStatus={
                    touched.qualification && errors.qualification
                      ? "error"
                      : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>
                    Qualification (LATEST) :
                  </span>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Qualification"
                    name="qualification"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.qualification}
                  />
                </Form.Item>
                <Form.Item
                  help={touched.salary && errors.salary ? errors.salary : ""}
                  validateStatus={
                    touched.salary && errors.salary ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>Salary :</span>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Salary"
                    name="salary"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.salary}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    Update
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

export default Form.create()(UpdateProfile);
