const express = require("express");
const router = express.Router();
const { Client } = require("pg");

var client;
createnewclient();

//api that creates patient

router.get("/getScheduledAppointments", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(() =>
      client.query(
        "Select firstname,lastname from Doctor d ,doc_pat_app dp where d.doctor_id = dp.doctor_id and patient_id = $1",
        [req.query.id]
      )
    )
    .then(results => res.send(results.rows))
    .then(() => client.end())
    .then(() => console.log("client disconnected!"))
    .then(() => createnewclient())

    .catch(function(e) {
      client
        .end()
        .then(res.send({ err: "Appointment already made !!!!" }))
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
