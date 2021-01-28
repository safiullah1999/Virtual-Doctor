const express = require("express");
const Web3 = require('web3');
const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
const MyContract = require('../build/contracts/Records.json')
var CryptoJS = require("crypto-js");

owner = '0xaCdAEb2fF28f57ac25E2e1aABe000D46f83d0973'
const web3 = new Web3('HTTP://127.0.0.1:7545');
const deployedNetwork = MyContract.networks[5777];
const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address)
const router = express.Router();
const { Client } = require("pg");
var client;

createnewclient();

router.post('/postPrescription', function (req, res) {
  var data = []
  client.connect()
    .then(console.log("connected successfully"))
    .then(async () => {
      const results = await contract.methods.get_prescription_records(req.body.account).call()
      if (results != "") {
        //get already added data from ipfs
        const output = JSON.parse(await ipfs.cat(results))
        //decrypt the data
        var bytes = CryptoJS.AES.decrypt(output, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        data = decryptedData
      }
      //get first and last name of doctor
      const results_doctor = (await client.query("select firstname,lastname from doctor where doctor_id = $1;", [req.body.doctor_id])).rows[0]
      var prescriptions = []
      for (var i = 0; i < req.body['Medicine'].length; i++) {
        let med_name = await client.query("select med_name from medicine where med_id = $1;", [req.body['Medicine'][i].med_id])
        prescriptions.push({ "med_name": med_name.rows[0].med_name, "dosage": req.body['Medicine'][i].dosage })
      }
      const json = {
        "firstname": results_doctor.firstname,
        "lastname": results_doctor.lastname,
        "issue_date": req.body.issue_date,
        "prescriptions": prescriptions
      }
      data.push(json)
      //encrypt the data
      var plain_text = JSON.stringify(data)
      var ciphertext = CryptoJS.AES.encrypt(plain_text, 'secret key 123').toString()
      //add data to ipfs
      const CID = await ipfs.add(Buffer.from(JSON.stringify(ciphertext)))
      //add CID to blockchain
      await contract.methods.set_prescription_records(req.body.account, CID).send({
        from: owner
      })

    })
    .then(() => res.send({ message: "Data inserted successfully" }))
    // .then(() => res.send({ data }))
    .then((() => client.end()))
    .then(() => console.log("client disconnected!"))
    .then(() => createnewclient())

    .catch(function (e) {
      client.end().then(
        res.send({ err: e.message }))
        .then(createnewclient());

    });
});
module.exports = router;

function createnewclient() {
  client = new Client({
    user: "taha",
    password: "taha1",
    host: "127.0.0.1",
    port: 5432,
    database: "hospital"
  });
}

