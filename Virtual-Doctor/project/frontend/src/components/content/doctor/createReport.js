import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Icon, Input, Button } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    account: Yup.string()
        .required("must enter a account"),
    haematocrit: Yup.number()
        .required("must enter a haematocrit"),
    erythrocytes_rbc: Yup.number()
        .required("must enter a erythrocytes_rbc"),
    leucocytes_wbc: Yup.number()
        .required("must enter a leucocytes_wbc"),
    rdw_cv: Yup.number()
        .required("must enter a rdw_cv"),
    platelets: Yup.number()
        .required("must enter a platelets"),
    pdw: Yup.number()
        .required("must enter a pdw"),
    mpv: Yup.number()
        .required("must enter a mpv"),

});


class CreateReport extends Component {
    render() {

        return (
            <Formik
                initialValues={{
                    account: "",
                    haematocrit: "",
                    erythrocytes_rbc: "",
                    leucocytes_wbc: "",
                    rdw_cv: "",
                    platelets: "",
                    pdw: "",
                    mpv: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    console.log(values);
                    fetch(
                        "http://localhost:5000/api/postreportspatient",
                        {
                            method: "post",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                account: values.account,
                                haematocrit: values.haematocrit,
                                erythrocytes_rbc: values.erythrocytes_rbc,
                                leucocytes_wbc: values.leucocytes_wbc,
                                rdw_cv: values.rdw_cv,
                                platelets: values.platelets,
                                pdw: values.pdw,
                                mpv: values.mpv,
                                usertype: "report"
                            })
                        }
                    )
                        .then(res => res.json())
                        .then(data => alert("Your id is " + data.message))
                        .catch(err => console.log(err));

                    resetForm();
                    setSubmitting(false);

                }}
            >
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting }) => (
                        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                            <div style={{ padding: 20, width: 400, margin: "auto", border: "2px black solid" }}>
                                <Form.Item
                                    help={touched.account && errors.account ? errors.account : ""}
                                    validateStatus={touched.account && errors.account ? "error" : undefined}
                                >
                                    <span style={{ fontSize: "14px" }}>Account :</span>

                                    <Input
                                        prefix={
                                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        placeholder="Enter account"
                                        name="account"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.account}
                                    />
                                </Form.Item>
                                <Form.Item
                                    help={touched.haematocrit && errors.haematocrit ? errors.haematocrit : ""}
                                    validateStatus={touched.haematocrit && errors.haematocrit ? "error" : undefined}
                                >
                                    <span style={{ fontSize: "14px" }}>Haematocrit :</span>

                                    <Input
                                        prefix={
                                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        placeholder="Enter haematocrit"
                                        name="haematocrit"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.haematocrit}
                                    />
                                </Form.Item>
                                <Form.Item
                                    help={touched.erythrocytes_rbc && errors.erythrocytes_rbc ? errors.erythrocytes_rbc : ""}
                                    validateStatus={touched.erythrocytes_rbc && errors.erythrocytes_rbc ? "error" : undefined}
                                >
                                    <span style={{ fontSize: "14px" }}>Erythrocytes_rbc :</span>
                                    <Input
                                        prefix={
                                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        placeholder="Enter erythrocytes_rbc"
                                        name="erythrocytes_rbc"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.erythrocytes_rbc}
                                    />
                                </Form.Item>
                                <Form.Item
                                    help={touched.leucocytes_wbc && errors.leucocytes_wbc ? errors.leucocytes_wbc : ""}
                                    validateStatus={touched.leucocytes_wbc && errors.leucocytes_wbc ? "error" : undefined}
                                >
                                    <span style={{ fontSize: "14px" }}>leucocytes_wbc :</span>
                                    <Input
                                        prefix={
                                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        placeholder="Enter leucocytes_wbc"
                                        name="leucocytes_wbc"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.leucocytes_wbc}
                                    />
                                </Form.Item>
                                <Form.Item
                                    help={touched.rdw_cv && errors.rdw_cv ? errors.rdw_cv : ""}
                                    validateStatus={touched.rdw_cv && errors.rdw_cv ? "error" : undefined}
                                >

                                    <span style={{ fontSize: "14px" }}>Rdw_cv :</span>
                                    <Input
                                        prefix={
                                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        placeholder="Enter rdw_cv"
                                        name="rdw_cv"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.rdw_cv}
                                    />
                                </Form.Item>
                                <Form.Item
                                    help={touched.platelets && errors.platelets ? errors.platelets : ""}
                                    validateStatus={touched.platelets && errors.platelets ? "error" : undefined}
                                >
                                    <span style={{ fontSize: "14px" }}>Platelets :</span>
                                    <Input
                                        prefix={
                                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        placeholder="Enter platelets"
                                        name="platelets"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.platelets}
                                    />
                                </Form.Item>
                                <Form.Item
                                    help={touched.pdw && errors.pdw ? errors.pdw : ""}
                                    validateStatus={touched.pdw && errors.pdw ? "error" : undefined}
                                >
                                    <span style={{ fontSize: "14px" }}>PDW :</span>
                                    <Input
                                        prefix={
                                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        placeholder="Enter pdw"
                                        name="pdw"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.pdw}
                                    />
                                </Form.Item>
                                <Form.Item
                                    help={touched.mpv && errors.mpv ? errors.mpv : ""}
                                    validateStatus={touched.mpv && errors.mpv ? "error" : undefined}
                                >
                                    <span style={{ fontSize: "14px" }}>MPV :</span>
                                    <Input
                                        prefix={
                                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        placeholder="Enter mpv"
                                        name="mpv"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.mpv}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
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

export default Form.create()(CreateReport);