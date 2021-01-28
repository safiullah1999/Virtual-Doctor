const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

var client;
createnewclient();

//api that creates patient

router.post("/createAdmin", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(() =>
      client.query(
        "INSERT INTO admin (firstname,lastname,email,usertype) VALUES ($1,$2,$3,$4) RETURNING admin_id;",
        [
          req.body.firstname,
          req.body.lastname,
          req.body.email,
          req.body.usertype
        ]
      )
    )

    .then(id =>
      client.query(
        "Update admin set password = $1 where admin_id = $2 RETURNING admin_id;",
        [bcrypt.hashSync(id.rows[0].admin_id, 10), id.rows[0].admin_id]
      )
    )
    .then(id => res.send({ message: id.rows[0].admin_id }))
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
