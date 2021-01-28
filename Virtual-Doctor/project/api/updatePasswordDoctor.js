const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

var client;
createnewclient();

//api for changing admin's password

router.put("/updatePasswordDoctor", function(req, res) {
  client
    .connect()
    .then(
      console.log("connected successfully update", req.body.password, req.query.id)
    )
    .then(() =>
      client.query("UPDATE doctor SET password = $1 WHERE doctor_id = $2", [
        bcrypt.hashSync(req.body.password, 10),
        req.query.id
      ])
    )
    .then(() => res.send({ message: "Password changed successfully" }))
    .then(() => client.end())
    .then(() => console.log("client disconnected! qwewqe"))
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
