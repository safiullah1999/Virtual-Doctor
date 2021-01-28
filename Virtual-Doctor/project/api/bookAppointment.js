const express = require("express");
const router = express.Router();
const { Client } = require("pg");

var client;
createnewclient();

router.post("/bookAppointment", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(() =>
      client.query(
        "Select count(doctor_id) from doc_pat_app where doctor_id = $1",
        [req.body.doctor_id]
      )
    )
    .then(async data => {
      var count = await client.query(
        "Select count from doctor_app_count where  doctor_id = $1",
        [req.body.doctor_id]
      );

      if (count.rows[0].count > data.rows[0].count) {
        await client.query(
          "Insert into doc_pat_app(doctor_id,patient_id) VALUES($1,$2) ",
          [req.body.doctor_id, req.body.patient_id]
        );
        res.send({ message: "Appointment made successfully !!" });
      } else res.send({ message: "Doctor appointment full" });
    })

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
