import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Icon, Input, Button } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("must enter a firstname"),
  lastname: Yup.string().required("must enter a lastname"),
  email: Yup.string()
    .required("must enter a email")
    .email("must be a valid email address")
});

class CreateAdmins extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          fetch("http://localhost:5000/api/createAdmin", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              usertype: "admin"
            })
          })
            .then(res => res.json())
            .then(data => {
              alert("Your id is " + data.message);
              console.log(data.message);
            })
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
                  placeholder="Enter firstname"
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
                  placeholder="Enter lastname"
                  name="lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
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

export default Form.create()(CreateAdmins);
