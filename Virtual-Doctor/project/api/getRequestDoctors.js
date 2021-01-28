const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;
createnewclient();
var final = [];
var results = [];
results1 = [];

//api that give the information of the doctor specifed by id from query strings

router.get("/getRequestDoctors", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))
    .then(async () => {
      results = await client.query("select * from doctor_request");
      for (var i = 0; i < results.rows.length; i++) {
        var arr = [];
        arr.push(results.rows[i]);
        results1 = await client.query(
          "select * from doctor where doctor_id = $1",
          [results.rows[i].doctor_id]
        );
        arr.push(results1.rows[0]);
        final.push(arr);
        results1 = [];
      }
      res.send(final);
      final = [];
      results = [];
      results1 = [];
      client.end();
      console.log("client disconnected!");
      createnewclient();
    })

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
function myfunction(item) {
  final.push(item);
}
