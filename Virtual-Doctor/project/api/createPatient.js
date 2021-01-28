const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");
const Web3 = require('web3');
const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
const MyContract = require('../build/contracts/Records.json')
var CryptoJS = require("crypto-js");
owner = '0xaCdAEb2fF28f57ac25E2e1aABe000D46f83d0973'
const web3 = new Web3('HTTP://127.0.0.1:7545');
const deployedNetwork = MyContract.networks[5777];
const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address)
let patient_id;

var client;
createnewclient();

//api that creates patient

router.post("/createPatient", function (req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(() =>
      client.query(
        "INSERT INTO Patient (firstname,lastname, age, address, contact, gender,email,usertype,account) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING patient_id;",
        [
          req.body.firstname,
          req.body.lastname,
          req.body.age,
          req.body.address,
          req.body.contact,
          req.body.gender,
          req.body.email,
          req.body.usertype,
          "0xAa1c46A78CF51bb2d9Ca14Aabc4D8A18D488b066"
        ]
      )
    )

    .then(id =>
      client.query("Update patient set password = $1 where patient_id = $2 RETURNING patient_id;", [
        bcrypt.hashSync(id.rows[0].patient_id, 10),
        id.rows[0].patient_id
      ])
    )
    .then((id) => {
      patient_id = id.rows[0].patient_id;

    })
    .then(() => AddtoBlockchain(req))
    .then(() => res.send({ message: "Data inserted successfully" }))
    .then(() => client.end())
    .then(() => console.log("client disconnected!"))
    .then(() => createnewclient())

    .catch(function (e) {
      client
        .end()
        .then(res.send({ err: e.message }))
        .then(createnewclient());
    });
});
module.exports = router;

async function AddtoBlockchain(req) {
  try {
    data = [
      {
        "patient_id": patient_id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "age": req.body.age,
        "address": req.body.address,
        "contact": req.body.contact,
        "gender": req.body.gender,
        "email": req.body.email,
        "usertype": req.body.usertype,
        "password": bcrypt.hashSync(patient_id, 10)
      }
    ]
    //encrypt the data
    var plain_text = JSON.stringify(data)
    var ciphertext = CryptoJS.AES.encrypt(plain_text, 'secret key 123').toString()
    //add data to ipfs
    const CID = await ipfs.add(Buffer.from(JSON.stringify(ciphertext)))
    //add CID to blockchain

    await contract.methods.set_patient_records(req.body.account, CID).send({
      from: owner
    })



  }

  catch (e) {
    res.send({ err: e.message })
  }
}
async function createnewclient() {
  client = await new Client({
    user: "taha",
    password: "taha1",
    host: "127.0.0.1",
    port: 5432,
    database: "hospital"
  });
}

