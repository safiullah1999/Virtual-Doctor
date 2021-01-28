import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  user: Yup.string().required("must enter ID"),
  usertype: Yup.string()
    .required("must enter a usertype")
    .test(
      "check user",
      "must be a doctor or patient",
      val => val === "doctor" || val === "patient"
    )

});

export class DeleteUser extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
      
        <Formik
          initialValues={{
            user: "",
            usertype: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            if (values.usertype === "patient") {
              fetch("http://localhost:5000/api/deletePatient" + "?id=" + values.user, {
                method: "DELETE",
                
              })
              .then(res => res.json())
              .then(data => alert(data.a))
              .catch(err => console.log(err));
            }
            if (values.usertype === "doctor") {
                fetch("http://localhost:5000/api/deleteDoctor" + "?id=" + values.user, {
                method: "DELETE",
               
              })
              .then(res => res.json())
              .then(data => alert(data.a))
              .catch(err => console.log(err));
            }
            

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
                  help={touched.user && errors.user ? errors.user : ""}
                  validateStatus={
                    touched.user && errors.user ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>UserID :</span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter userID"
                    name="user"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user}
                  />
                </Form.Item>
                <Form.Item
                  help={
                    touched.usertype && errors.usertype ? errors.usertype : ""
                  }
                  validateStatus={
                    touched.usertype && errors.usertype ? "error" : undefined
                  }
                >
                  <span style={{ fontSize: "14px" }}>User Type :</span>

                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter usertype"
                    name="usertype"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.usertype}
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

export default DeleteUser;
