const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;
createnewclient();

//returns the number of rows of the doctor table

router.get("/getCountDoctor", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(() => client.query("select count(*) from Doctor"))
    .then(results => res.send(results.rows))
    .then(() => client.end())
    .then(() => console.log("client disconnected!"))
    .then(() => createnewclient())

    .catch(function(e) {
      client.end().then(res.send({ err: e.message }).then(createnewclient()));
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
