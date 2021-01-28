const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;
var results = [];
var final = [];

createnewclient();

router.get("/get", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(async () => {
      results = await client.query(
        "select patient_id,usertype,password from Patient;"
      );
      results.rows.forEach(myfunction);
      results = await client.query(
        "select doctor_id,usertype,password from Doctor;"
      );
      results.rows.forEach(myfunction);
      results = await client.query(
        "select admin_id,usertype,password from Admin;"
      );
      results.rows.forEach(myfunction);
    })
    .then(() => res.send(final))
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
  console.log("db")
}

function myfunction(item) {
  final.push(item);
}
