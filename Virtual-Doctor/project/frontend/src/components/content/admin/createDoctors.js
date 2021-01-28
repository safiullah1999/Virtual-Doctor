import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Icon, Input, Button, Select, Checkbox } from "antd";
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

class CreateDoctors extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          age: "",
          address: "",
          contact: "",
          gender: "",
          email: "",
          join_date: "",
          department_id: "",
          qualification: "",
          salary: "",
          usertype: "doctor"
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(values.join_date);

          fetch("http://localhost:5000/api/createDoctor", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              firstname: values.firstname,
              lastname: values.lastname,
              age: values.age,
              address: values.address,
              contact: values.contact,
              joining_date: new Date().toISOString().slice(0,10),
              qualification: values.qualification,
              dept_id: values.department_id,
              gender: values.gender,
              email: values.email,
              salary: values.salary,
              usertype: "doctor"
            })
          })
            .then(res => res.json())
            .then(data => alert("Your id is " + data.message))
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
            <div style={{ padding:20,width: 400, margin: "auto" ,border :"2px black solid"}}>
         
              <Form.Item
                help={
                  touched.firstname && errors.firstname ? errors.firstname : ""
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
                validateStatus={touched.age && errors.age ? "error" : undefined}
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
                <span style={{ fontSize: "14px" }}>Qualification (LATEST) :</span>
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
                  Submit
                </Button>
              </Form.Item>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

export default Form.create()(CreateDoctors);
