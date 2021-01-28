const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;
createnewclient();

//api that stores the patient request for data change in request patient table

router.post("/postPatientRequest", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(() =>
      client.query(
        "INSERT INTO Patient_request (patient_id,firstname,lastname,age, address, contact, gender,email) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);",
        [
          req.body.patient_id,
          req.body.firstname,
          req.body.lastname,
          req.body.age,
          req.body.address,
          req.body.contact,
          req.body.gender,
          req.body.email,
          
        ]
      )
    )
    .then(() => res.send({ message: "Request made successfully" }))
    .then(() => client.end())
    .then(() => console.log("client disconnected!"))
    .then(() => createnewclient())

    .catch(function(e) {
      client
        .end()
        .then(res.send({ err: e.message }))
        .then(createnewclient());
    });
});
module.exports = router;

async function createnewclient() {
  client = await new Client({
    user: "taha",
    password: "taha1",
    host: "127.0.0.1",
    port: 5432,
    database: "hospital"
  });
}
