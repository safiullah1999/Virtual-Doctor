import React, { Component } from "react";
import "../admin/index.css";

export class RequestPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
       info: [],
    };

    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
  }
  async componentDidMount() {
    const url = "http://localhost:5000/api/getRequestPatients";
    const response = await fetch(url);
    const data = await response.json();
   console.log(data)
    this.setState({
      info: data
    });
    
  }
  accept(e) {
    let num = e.target.id;
    console.log(num, " accept button");
    //update patient and delete patient request

    fetch("http://localhost:5000/api/approveRequestPatient" + "?id=" + num, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(data => alert( data.message))
      .catch(err => console.log(err));
      
  }
  reject(e) {
    let num = e.target.id;
    console.log(num, "reject button");
    //delete patient request

    fetch("http://localhost:5000/api/deleteRequestPatient" + "?id=" + num, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(data => alert( data.message))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1 id="title">Patient Requests</h1>
        <table id="customers">
          {this.state.info.map((infos, index) => {
            

            return (
              <tbody id={infos[0].patient_id} style={{ border: "2px black solid" }}>
                <tr key={infos[0].patient_id}>
                  <td>Updated</td>
                  <td>{infos[0].patient_id}</td>
                  <td>{infos[0].firstname}</td>
                  <td>{infos[0].lastname}</td>
                  <td>{infos[0].age}</td>
                  <td>{infos[0].address}</td>
                  <td>{infos[0].contact}</td>
                  <td>{infos[0].gender}</td>
                  <td>{infos[0].email}</td>
                  <td>
                    <input
                      value="Accept"
                      type="button"
                      id={infos[0].patient_id}
                      onClick={this.accept}
                    />
                  </td>
                  <td>
                    <input
                      value="Reject"
                      type="button"
                      id={infos[0].patient_id}
                      onClick={this.reject}
                    />
                  </td>
                 
                </tr>
                <tr key={infos[1].patient_id}>
                  <td>Previous</td>
                  <td>{infos[1].patient_id}</td>
                  <td>{infos[1].firstname}</td>
                  <td>{infos[1].lastname}</td>
                  <td>{infos[1].age}</td>
                  <td>{infos[1].address}</td>
                  <td>{infos[1].contact}</td>
                  <td>{infos[1].gender}</td>
                  <td>{infos[1].email}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default RequestPatient;
