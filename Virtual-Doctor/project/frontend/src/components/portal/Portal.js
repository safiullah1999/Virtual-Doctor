import React, { Component } from 'react';
import AdminPortal from './adminPortal/adminPortal'
import DoctorPortal from './doctorPortal/doctorPortal'
import PatientPortal from './patientPortal/patientPortal'


export class Portal extends Component {
  constructor(props) {
    super(props);
    console.log(props,"portal")
    //props userID, userType
    this.state = {
      collapsed: false
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {

    if (this.props.userType === 'admin') {
      return (
        <div>
          <AdminPortal userID={this.props.userID} userType={this.props.userType}/>
        </div>
        
      );
    }
    else if(this.props.userType === 'doctor')
    {
      return (
        <div>
          <DoctorPortal userID={this.props.userID} userType={this.props.userType}/>
        </div>
        
      );
      
    }
    else if(this.props.userType === 'patient')
    {
      return (
        <div>
          <PatientPortal userID={this.props.userID} userType={this.props.userType}/>
        </div>
        
      );

    }

  }
}

export default Portal;


