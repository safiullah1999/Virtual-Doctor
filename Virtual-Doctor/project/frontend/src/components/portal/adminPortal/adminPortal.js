import React, { Component } from "react";
import { Layout, Menu, Icon, Dropdown } from "antd";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import "./../patientPortal/Portal.css";

import CreatePatients from "../../content/admin/createPatients";
import CreateDoctors from "../../content/admin/createDoctors";
import CreateAdmins from "../../content/admin/createAdmins";
import Profile from "../../content/admin/profile";
import ChangePassword from "../../content/admin/changePassword";
import RequestPatient from "../../content/admin/requestPatient";
import RequestDoctor from "../../content/admin/requestDoctor";
import DeleteUser from "../../content/admin/deleteUser";
import ShowStatistics from "../../content/admin/showStatistics";

import password from "../../../logos/password.svg";
import user from "../../../logos/user.svg";
import heart from "../../../logos/heart.svg";
import request from "../../../logos/request.svg";

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

class AdminPortal extends Component {
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
                      <span className="linkSign" title="Create User">
                        <Icon
                          type="user-add"
                          style={{ fontSize: "20px", color: "#08c" }}
                        />
                        <span className="font">
                          <strong>Create User</strong>
                        </span>
                      </span>
                    }
                  >
                    <Menu.Item key="s11" className="linkSign">
                      <div title="Create Patient">
                        <Link
                          className="link"
                          to="/admin/createPatients"
                          style={{
                            fontSize: "14px",
                            display: "block",
                            marginLeft: "3px",
                          }}
                        >
                          <Icon
                            type="user"
                            style={{ fontSize: "20px", color: "#08c" }}
                          />
                          <strong>Create Patient</strong>
                        </Link>
                      </div>
                    </Menu.Item>
                    <Menu.Item key="s12" className="linkSign">
                      <div title="Create Doctor">
                        <Link
                          className="link"
                          to="/admin/createDoctors"
                          style={{
                            fontSize: "14px",
                            display: "block",
                            marginLeft: "3px",
                          }}
                        >
                          <Icon
                            type="user"
                            style={{ fontSize: "20px", color: "#08c" }}
                          />
                          <strong>Create Doctor</strong>
                        </Link>
                      </div>
                    </Menu.Item>
                    <Menu.Item key="s13" className="linkSign">
                      <div title="Create Admin">
                        <Link
                          className="link"
                          to="/admin/createAdmins"
                          style={{
                            fontSize: "14px",
                            display: "block",
                            marginLeft: "3px",
                          }}
                        >
                          <Icon
                            type="user"
                            style={{ fontSize: "20px", color: "#08c" }}
                          />
                          <strong>Create Admin</strong>
                        </Link>
                      </div>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span className="linkSign">
                        <img
                          src={user}
                          alt="user"
                          style={{ height: "40px", width: "40px" }}
                        />
                        <span className="font" title="Profile">
                          <strong>Profile</strong>
                        </span>
                      </span>
                    }
                  >
                    <Menu.Item key="s21" className="linkSign">
                      <div title="Information">
                        <Link
                          className="link"
                          to="/admin/profile"
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
                    <Menu.Item key="s22" className="linkSign">
                      <div title="Change Password">
                        <Link
                          className="link"
                          to="/admin/changePassword"
                          style={{
                            fontSize: "14px",
                            display: "block",
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
                  </SubMenu>
                  <Menu.Item key="4" className="linkSign">
                    <div title="Delete User">
                      <Link
                        className="link"
                        to="/admin/deleteUser"
                        style={{
                          fontSize: "14px",
                          display: "block",
                        }}
                      >
                        <Icon
                          type="user-delete"
                          style={{ fontSize: "20px", color: "#08c" }}
                        />
                        <strong>Delete User</strong>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="5" className="linkSign">
                    <div title="Statistics">
                      <Link
                        className="link"
                        to="/admin/showStatistics"
                        style={{
                          fontSize: "14px",
                          display: "block",
                        }}
                      >
                        <Icon
                          type="bar-chart"
                          style={{ fontSize: "20px", color: "#08c" }}
                        />
                        <strong>Statistics</strong>
                      </Link>
                    </div>
                  </Menu.Item>

                  <SubMenu
                    key="sub6"
                    title={
                      <span className="linkSign" title="Request">
                        <Icon
                          type="pull-request"
                          theme="outlined"
                          style={{ fontSize: "20px", color: "#08c" }}
                        />
                        <span className="font">
                          <strong>Request</strong>
                        </span>
                      </span>
                    }
                  >
                    <Menu.Item key="s61" className="linkSign">
                      <div title="Patient Requests">
                        <Link
                          className="link"
                          to="/admin/requestPatient"
                          style={{
                            fontSize: "14px",
                            display: "block",
                          }}
                        >
                          <img
                            src={request}
                            alt="request"
                            style={{ height: "50px", width: "50px" }}
                          />
                          <strong>Patient Requests</strong>
                        </Link>
                      </div>
                    </Menu.Item>
                    <Menu.Item key="s62" className="linkSign">
                      <div title="Doctor Requests">
                        <Link
                          className="link"
                          to="/admin/requestDoctor"
                          style={{
                            fontSize: "14px",
                            display: "block",
                          }}
                        >
                          <img
                            src={request}
                            alt="request"
                            style={{ height: "50px", width: "50px" }}
                          />
                          <strong>Doctor Requests</strong>
                        </Link>
                      </div>
                    </Menu.Item>
                  </SubMenu>

                  {/* <Menu.Item key="4">
                    <Icon type="video-camera" />
                    <span>
                      <Link className="menu" to="/">/Search User</Link>
                    </span>
                  </Menu.Item>  */}
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
                    path="/admin/createPatients"
                    component={CreatePatients}
                  />
                  <Route
                    path="/admin/createDoctors"
                    component={CreateDoctors}
                  />
                  <Route path="/admin/createAdmins" component={CreateAdmins} />
                  <Route
                    path="/admin/profile"
                    render={(props) => (
                      <Profile
                        userID={this.props.userID}
                        userType={this.props.userType}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    path="/admin/changePassword"
                    render={(props) => (
                      <ChangePassword
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/admin/deleteUser"
                    render={(props) => (
                      <DeleteUser
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/admin/showStatistics"
                    render={(props) => (
                      <ShowStatistics
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/admin/requestPatient"
                    render={(props) => (
                      <RequestPatient
                        userID={this.props.userID}
                        userType={this.props.userType}
                      />
                    )}
                  />
                  <Route
                    path="/admin/requestDoctor"
                    component={RequestDoctor}
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

export default connect(mapStateToProps, null)(AdminPortal);
