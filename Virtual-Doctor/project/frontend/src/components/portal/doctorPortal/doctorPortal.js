import React, { Component } from "react";
import { Layout, Menu, Icon, Dropdown } from "antd";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import "./../patientPortal/Portal.css";

import Profile from "../../content/doctor/profile";
import ChangePassword from "../../content/doctor/changePassword";
import CheckReports from "../../content/doctor/checkReports";
import CheckHeartReports from "../../content/doctor/checkHeartReports";
import CheckPrescriptions from "../../content/doctor/checkPrescriptions";
import WritePrescriptions from "../../content/doctor/writePrescriptions";
import UpdateProfile from "../../content/doctor/updateProfile";
import AllScheduledAppointments from "../../content/doctor/checkAllScheduledAppointments";
import CheckDoctors from "../../content/doctor/checkDoctors";
import HeartPrediction from "../../content/doctor/heartPrediction";
import CreateReport from "../../content/doctor/createReport";
import CreateHeartReport from "../../content/doctor/createHeartReport";

import password from "../../../logos/password.svg";
import report from "../../../logos/report.svg";
import prescription from "../../../logos/prescription.svg";
import doctor from "../../../logos/doctor.svg";
import writePres from "../../../logos/writePres.svg";
import schedule from "../../../logos/schedule.svg";
import user from "../../../logos/user.svg";
import heart from "../../../logos/heart.svg";
import heartPred from "../../../logos/heartPred.svg";

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

const menu = (history) => (
  <Menu>
    <Menu.Item key="1">
      <span onClick={() => history.replace("/")} style={{ color: "#001529" }}>
        <strong>Log Out</strong>{" "}
        <Icon
          type="logout"
          style={{ fontSize: "16px", color: "#08c", marginLeft: "2px" }}
        />
      </span>
    </Menu.Item>
  </Menu>
);

class DoctorPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Header className="head1 menu">
              <img src={heart} alt="heart" className="heart" />
              <Dropdown className="linkSign" overlay={menu(this.props.history)}>
                <a
                  href="#0"
                  className="ant-dropdown-link position"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "#001529" }}
                >
                  <Icon
                    type="setting"
                    theme="twoTone"
                    style={{ marginRight: "5px" }}
                  />
                  Settings <Icon type="down-circle" theme="twoTone" />
                </a>
              </Dropdown>
            </Header>
            <Layout>
              <Sider
                width="250px"
                theme="light"
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
              >
                <div className="logo" />

                <Menu mode="inline" defaultSelectedKeys={["1"]}>
                  <SubMenu
                    key="sub1"
                    title={
                      <span className="linkSign" title="Profile">
                        <img
                          alt="user"
                          src={user}
                          style={{ height: "40px", width: "40px" }}
                        />
                        <span className="font">
                          <strong>Profile</strong>
                        </span>
                      </span>
                    }
                  >
                    <Menu.Item key="s11" className="linkSign">
                      <div title="Information">
                        <Link
                          className="link"
                          to="/doctor/info"
                          style={{
                            fontSize: "14px",
                            display: "block",
                            marginLeft: "3px",
                          }}
                        >
                          <Icon
                            type="database"
                            style={{ fontSize: "20px", color: "#08c" }}
                            theme="twoTone"
                            twoToneColor="blue"
                          />
                          <strong>Information</strong>
                        </Link>
                      </div>
                    </Menu.Item>
                    <Menu.Item key="s12" className="linkSign">
                      <div title="Change Password">
                        <Link
                          style={{
                            fontSize: "14px",
                            display: "block",
                          }}
                          className="link"
                          to="/doctor/changePassword"
                        >
                          <img
                            src={password}
                            alt="password"
                            style={{ height: "25px", width: "25px" }}
                          />
                          {"  "}
                          <strong>Change Password</strong>
                        </Link>
                      </div>
                    </Menu.Item>
                    <Menu.Item key="s13" className="linkSign">
                      <div title="Update Profile">
                        <Link
                          style={{ fontSize: "14px", display: "block" }}
                          className="link"
                          to="/doctor/updateProfile"
                        >
                          <Icon
                            type="edit"
                            style={{
                              fontSize: "20px",
                              color: "#08c",
                              marginLeft: "2px",
                            }}
                            theme="twoTone"
                            twoToneColor="blue"
                          />
                          <strong>Update Profile</strong>
                        </Link>
                      </div>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="2" className="linkSign">
                    <div title="Check Reports">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/doctor/checkReports"
                      >
                        <img
                          src={report}
                          alt="report"
                          style={{ height: "40px", width: "40px" }}
                        />{" "}
                        <strong>Check Reports</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="3" className="linkSign">
                    <div title="Check Reports">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/doctor/checkHeartReports"
                      >
                        <img
                          src={report}
                          alt="report"
                          style={{ height: "40px", width: "40px" }}
                        />{" "}
                        <strong>Check Heart Reports</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="4" className="linkSign">
                    <div title="Create Reports">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/doctor/createReport"
                      >
                        <img
                          src={report}
                          alt="report"
                          style={{ height: "40px", width: "40px" }}
                        />{" "}
                        <strong>Create Report</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="5" className="linkSign">
                    <div title="Create Heart Reports">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/doctor/createHeartReport"
                      >
                        <img
                          src={report}
                          alt="report"
                          style={{ height: "40px", width: "40px" }}
                        />{" "}
                        <strong>Create Heart Report</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="6" className="linkSign">
                    <div title="Check Prescriptions">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/doctor/checkPrescriptions"
                      >
                        <img
                          src={prescription}
                          alt="prescription"
                          style={{ height: "40px", width: "40px" }}
                        />{" "}
                        <strong>Check Prescriptions</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="7" className="linkSign">
                    <div title="Doctors">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/doctor/checkDoctors"
                      >
                        {" "}
                        <img
                          src={doctor}
                          alt="doctor"
                          style={{ height: "40px", width: "40px" }}
                        />{" "}
                        <strong>Doctors</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="8" className="linkSign">
                    <div title="Write Prescriptions">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/doctor/writePrescriptions"
                      >
                        <img
                          src={writePres}
                          alt="prescription"
                          style={{
                            height: "35px",
                            width: "35px",
                            marginLeft: "4px",
                          }}
                        />{" "}
                        <strong>Write Prescriptions</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="9" className="linkSign">
                    <div title="Check Scheduled Appointments">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/doctor/checkAllScheduledAppointments"
                      >
                        <img
                          src={schedule}
                          alt="schedule"
                          style={{
                            height: "35px",
                            width: "35px",
                            marginLeft: "4px",
                          }}
                        />{" "}
                        <strong>Check Scheduled App...</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="10" className="linkSign">
                    <div title="Heart Disease Predictor">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/doctor/heartPredictor"
                      >
                        <img
                          src={heartPred}
                          alt="heartPred"
                          style={{
                            height: "35px",
                            width: "35px",
                            marginLeft: "4px",
                          }}
                        />{" "}
                        <strong>Heart Disease Pred...</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Header
                  className="head2"
                  style={{ background: "#fff", padding: 0 }}
                ></Header>
                <Content
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    background: "#fff",
                    minHeight: 500,
                  }}
                >
                  <Route
                    path="/doctor/info"
                    render={(props) => (
                      <Profile
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/changePassword"
                    render={(props) => (
                      <ChangePassword
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/updateProfile"
                    render={(props) => (
                      <UpdateProfile
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/checkReports"
                    render={(props) => (
                      <CheckReports
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/checkHeartReports"
                    render={(props) => (
                      <CheckHeartReports
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/createReport"
                    render={(props) => (
                      <CreateReport
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/createHeartReport"
                    render={(props) => (
                      <CreateHeartReport
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/checkPrescriptions"
                    render={(props) => (
                      <CheckPrescriptions
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/checkDoctors"
                    render={(props) => (
                      <CheckDoctors
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/writePrescriptions"
                    render={(props) => (
                      <WritePrescriptions
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/checkAllScheduledAppointments"
                    render={(props) => (
                      <AllScheduledAppointments
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/doctor/heartPredictor"
                    component={HeartPrediction}
                  />
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
    userType: state.userType,
  };
};

export default connect(mapStateToProps, null)(DoctorPortal);
// export default withRouter(connect(mapStateToProps, null)(DoctorPortal));
