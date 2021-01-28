const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

var client;
createnewclient();

//api that creates patient

router.post("/createDoctor", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(() =>
      client.query(
        "INSERT INTO doctor (firstname,lastname, age, address, contact,joining_date,qualification,dept_id, gender,email,salary,usertype) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING doctor_id;",
        [
          req.body.firstname,
          req.body.lastname,
          req.body.age,
          req.body.address,
          req.body.contact,
          req.body.joining_date,
          req.body.qualification,
          req.body.dept_id,
          req.body.gender,
          req.body.email,
          req.body.salary,
          req.body.usertype
        ]
      )
    )

    .then(id =>
      client.query(
        "Update doctor set password = $1 where doctor_id = $2 RETURNING doctor_id;",
        [bcrypt.hashSync(id.rows[0].doctor_id, 10), id.rows[0].doctor_id]
      )
    )
    .then(id => res.send({ message: id.rows[0].doctor_id }))
    .then(() => res.send({ message: "Data inserted successfully" }))
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
