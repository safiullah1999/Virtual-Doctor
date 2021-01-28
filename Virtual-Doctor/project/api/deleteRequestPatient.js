const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;

createnewclient();

//api for creating a new admin

router.delete("/deleteRequestPatient", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(() =>
      client.query("Delete from Patient_request where patient_id = $1", [
        req.query.id
      ])
    )
    .then(() => res.send({ message: "Data Deleted successfully" }))
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
