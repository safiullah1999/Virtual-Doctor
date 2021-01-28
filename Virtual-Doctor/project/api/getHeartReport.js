const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;
createnewclient();

//api that give the information of the doctor specifed by id from query strings

router.get("/getHeartReport", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(() =>
      client.query(
        "select hr.* from heart_report hr ,patient p,patient_heart_report phr where p.patient_id = phr.patient_id and phr.heart_report_id = hr.heart_report_id and p.patient_id = $1 ORDER BY hr.heart_report_id;",
        [req.query.id]
      )
    )
    // .then(()=>client.query("select * from report;"))

    .then(results => res.send(results.rows[0]))
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
    console.log("db");
  }