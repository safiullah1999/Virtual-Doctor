const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;
createnewclient();

router.get("/getAppointmentsPatient", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully Appointments"))
    .then(() =>
      client.query(
        "select a.* from appointment a, patient_appointment pa where a.appointment_id=pa.appointment_id and pa.patient_id=$1;",
        [req.query.id]
      )
    )
    .then(results => {
      res.send(results.rows);
      console.log(results, "appoin");
    })
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
