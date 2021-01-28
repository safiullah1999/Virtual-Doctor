const express = require("express");
const router = express.Router();
const { Client } = require("pg");
var client;
createnewclient();

//api that after admin's approval make the specfied changes in the patient table and delete the request

router.put("/approveRequestPatient", function(req, res) {
  client
    .connect()
    .then(console.log("connected successfully"))

    .then(async function() {
      await client
        .query("Select * from Patient_request where patient_id = $1", [
          req.query.id
        ])
        //trigger will run before this
        .then(results =>
          client.query(
            "Update Patient SET firstname = $2,lastname = $3,age = $4,address = $5,gender = $6, contact = $7,email = $8 where patient_id = $1",
            [
              req.query.id,
              results.rows[0].firstname,
              results.rows[0].lastname,
              results.rows[0].age,
              results.rows[0].address,
              results.rows[0].gender,
              results.rows[0].contact,
              results.rows[0].email
            ]
          )
        )
        .then(() => res.send({ message: "Data updated successfully" }))
        .catch(e => console.log(e));
    })
    .then(() =>
      client.query("Delete from Patient_request where patient_id = $1", [
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
