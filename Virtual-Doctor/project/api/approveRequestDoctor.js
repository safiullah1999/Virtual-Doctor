const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;
createnewclient();
//api that changes the data of data after admin's approval

router.put("/approveRequestDoctor", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))

    .then(async function() {
      await client
        .query("Select * from Doctor_request where doctor_id = $1", [
          req.query.id
        ])
        //trigger will run before this
        .then(results =>
          client.query(
            "Update Doctor SET firstname = $2,lastname = $3,age = $4,contact = $5,dept_id = $6,qualification = $7,address = $8, gender = $9,salary = $10,email = $11 where doctor_id = $1",
            [
              req.query.id,
              results.rows[0].firstname,
              results.rows[0].lastname,
              results.rows[0].age,
              results.rows[0].contact,
              results.rows[0].dept_id,
              results.rows[0].qualification,
              results.rows[0].address,
              results.rows[0].gender,
              results.rows[0].salary,
              results.rows[0].email
            ]
          )
        )
        .then(() => res.send({ message: "Data updated successfully" }))
        .catch(e => console.log(e.message));
    })
    .then(() =>
      client.query("Delete from Doctor_request where doctor_id = $1", [
        req.query.id
      ])
    )
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
