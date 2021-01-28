const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;
const bcrypt = require("bcryptjs");
createnewclient();
let results = []
usertype = ""
account = ""
//api for getting patient password

router.get("/login", function (req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(async () => {
      if (req.query.id[0] == "P") {
        results = await client.query("Select account,password from Patient WHERE patient_id = $1", [
          req.query.id])
        console.log(results.rows[0].account)
        usertype = "patient",
          account = results.rows[0].account

      }
      else if (req.query.id[0] == "D") {
        results = await client.query("Select password from Doctor WHERE doctor_id = $1", [
          req.query.id
        ])
        usertype = "doctor"
      }
      else if (req.query.id[0] == "A") {
        results = await client.query("Select password from Admin WHERE admin_id = $1", [
          req.query.id
        ])
        usertype = "admin"
      }
      else
        results = []
    }
    )
    .then(function () {
      if (isEmpty(results)) {
        console.log("gfg")
        res.send({ message: "invalid id or password entered" });
      } else {
        if (bcrypt.compareSync(req.query.password, results.rows[0].password))
          res.send({ message: "login successfull", type: usertype, account: results.rows[0].account });
        else res.send({ message: "Login failed" });
      }
    })
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

async function createnewclient() {
  client = await new Client({
    user: "taha",
    password: "taha1",
    host: "127.0.0.1",
    port: 5432,
    database: "hospital"
  });
}
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
