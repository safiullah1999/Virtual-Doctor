const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");
var client;
createnewclient();

//api for getting patient password

router.get("/checkPasswordPatient", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully", req.query.password))
    .then(() =>
      client.query("Select password from patient WHERE patient_id = $1", [
        req.query.id
      ])
    )
    .then(function(results) {
      console.log(
        results.rows[0].password,
        req.query.password,
        bcrypt.compareSync(req.query.password, results.rows[0].password)
      );
      if (bcrypt.compareSync(req.query.password, results.rows[0].password)) {
        res.send({ message: "Password entered correctly" });
      } else {
        res.send({ message: "invalid password" });
      }
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
