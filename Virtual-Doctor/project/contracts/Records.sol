// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Records{
    mapping (string => string) private heart_records;
    mapping (string => string) private report_records;
    mapping (string => string) private patient_records;
     mapping (string => string) private prescription_records;
    address private doctor;
    uint private Patient_Count;

    constructor () public{
        doctor = msg.sender;
    }

     modifier onlyDoctor(){
        require(msg.sender == doctor);
            _;
        }

    function set_heart_records(string memory account,string memory CID) onlyDoctor public {
            heart_records[account] = CID;
    }
    function get_heart_records(string memory account) public view returns(string memory){
            return heart_records[account];
    }

    function set_report_records(string memory account,string memory CID) onlyDoctor public {
            report_records[account] = CID;
    }
    function get_report_records(string memory account) public view returns(string memory){
            return report_records[account];
    }

    function set_patient_records(string memory account,string memory CID) onlyDoctor public {
            patient_records[account] = CID;
            Patient_Count ++;
    }
    function get_patient_records(string memory account) public view returns(string memory){
            return patient_records[account];
    }
    function get_Patient_Count() public view returns(uint){return Patient_Count; }

    function set_prescription_records(string memory account,string memory CID) onlyDoctor public {
             prescription_records[account] = CID;
            
    }
    function get_prescription_records(string memory account) public view returns(string memory){
            return  prescription_records[account];
    }

}


