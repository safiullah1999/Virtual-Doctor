import React, { Component } from "react";
import { Layout, Menu, Icon, Dropdown } from "antd";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import "./Portal.css";

import Profile from "../../content/patient/profile";
import ChangePassword from "../../content/patient/changePassword";
import CheckAppointments from "../../content/patient/checkAppointments";
import CheckReports from "../../content/patient/checkGeneralReports";
import CheckHeartReports from "../../content/patient/checkHeartReports";
import CheckPrescriptions from "../../content/patient/checkPrescriptions";
import ShowBill from "../../content/patient/showBill";
import UpdateProfile from "../../content/patient/updateProfile";
import ScheduledAppointments from "../../content/patient/scheduledAppointments";
import Facilities from "../../content/patient/facilities/facilities";
import Doctors from "../../content/doctorANDpatient/doctors";
import VirtualDoctor from "../../content/patient/virtualDoctor";

import password from "../../../logos/password.svg";
import report from "../../../logos/report.svg";
import prescription from "../../../logos/prescription.svg";
import doctor from "../../../logos/doctor.svg";
import schedule from "../../../logos/schedule.svg";
import user from "../../../logos/user.svg";
import heart from "../../../logos/heart.svg";
import bill from "../../../logos/bill.svg";
import robot from "../../../logos/robot.svg";

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

export class PatientPortal extends Component {
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
              <img src={heart} className="heart" />
              <Dropdown className="linkSign" overlay={menu(this.props.history)}>
                <a
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
                          src={user}
                          alt="user"
                          style={{ height: "40px", width: "40px" }}
                        />
                        <span className="font">
                          {" "}
                          <strong>Profile</strong>{" "}
                        </span>
                      </span>
                    }
                  >
                    <Menu.Item key="s11" className="linkSign">
                      <div title="Information">
                        <Link
                          className="link"
                          to="/patient/info"
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
                          className="link"
                          to="/patient/changePassword"
                          style={{
                            fontSize: "14px",
                            display: "block",
                            marginLeft: "2px",
                          }}
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
                    {/* <Menu.Item key="s13" className="linkSign">
                      <div title="Update Profile">
                        <Link
                          style={{ fontSize: "14px", display: "block" }}
                          className="link"
                          to="/patient/updateProfile"
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
                    </Menu.Item> */}
                  </SubMenu>
                  <Menu.Item key="2" className="linkSign">
                    <div title="Check Appointments">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/patient/checkAppointments"
                        title="Appointments"
                      >
                        <img
                          src={schedule}
                          alt="schedule"
                          style={{
                            height: "35px",
                            width: "35px",
                            marginLeft: "5px",
                          }}
                        />
                        {"  "}
                        <strong>Check Appointments</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="3" className="linkSign">
                    <div title="Check Reports">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/patient/checkGeneralReports"
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
                    <div title="Check Heart Reports">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/patient/checkHeartReports"
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
                    <div title="Check Prescriptions">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/patient/checkPrescriptions"
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
                  <Menu.Item key="5" className="linkSign">
                    <div title="Facilities">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/patient/facilities"
                      >
                        <Icon
                          type="bank"
                          style={{
                            fontSize: "33px",
                            color: "#08c",
                            marginLeft: "3px",
                          }}
                          theme="twoTone"
                          twoToneColor="blue"
                        />
                        <strong>Facilities</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="6" className="linkSign">
                    <div title="Doctors">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/patient/doctors"
                      >
                        <img
                          src={doctor}
                          alt="doctor"
                          style={{ height: "40px", width: "40px" }}
                        />{" "}
                        <strong>Doctors</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="7" className="linkSign">
                    <div title="Check Bill">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/patient/showBill"
                      >
                        <img
                          src={bill}
                          alt="bill"
                          style={{
                            height: "35px",
                            width: "35px",
                            marginLeft: "4px",
                          }}
                        />{" "}
                        <strong>Check Bill</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  {/* <Menu.Item key="8" className="linkSign">
                    <div>
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/src/components/content/patient/scheduledAppointments.js"
                      >
                        {" "}
                        <img
                          src={doctor}
                          style={{ height: "40px", width: "40px" }}
                        />{" "}
                        Check Scheduled Appointments
                      </Link>
                    </div>
                  </Menu.Item> */}
                  <Menu.Item key="9" className="linkSign">
                    <div title="Virtual Doctor">
                      <Link
                        style={{ fontSize: "14px", display: "block" }}
                        className="link"
                        to="/patient/virtualDoctor"
                      >
                        <img
                          src={robot}
                          alt="robot"
                          style={{ height: "40px", width: "40px" }}
                        />{" "}
                        <strong>Virtual Doctor</strong>
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
                    path="/patient/info"
                    render={(props) => (
                      <Profile
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/patient/changePassword"
                    render={(props) => (
                      <ChangePassword
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/patient/updateProfile"
                    render={(props) => (
                      <UpdateProfile
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/patient/checkAppointments"
                    render={(props) => (
                      <CheckAppointments
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/patient/checkGeneralReports"
                    render={(props) => (
                      <CheckReports
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/patient/checkHeartReports"
                    render={(props) => (
                      <CheckHeartReports
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/patient/checkPrescriptions"
                    render={(props) => (
                      <CheckPrescriptions
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route path="/patient/facilities" component={Facilities} />
                  <Route
                    path="/patient/doctors"
                    render={(props) => (
                      <Doctors
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/patient/showBill"
                    render={(props) => (
                      <ShowBill
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/patient/scheduledAppointments"
                    render={(props) => (
                      <ScheduledAppointments
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/patient/virtualDoctor"
                    render={(props) => (
                      <VirtualDoctor
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
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
    account: state.account,
  };
};

export default connect(mapStateToProps, null)(PatientPortal);
