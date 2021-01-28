
const express = require('express');
const router = express.Router(); 
const {Client} = require('pg')
var client;
createnewclient();

router.get('/getBill',function(req,res){

  client.connect()
  .then(console.log("connected successfully"))
  .then(()=>client.query("Select p.patient_id,b.total_cost,b.bill_date from bill b , patient_bill pb , Patient p  where b.bill_id = pb.bill_id and p.patient_id = pb.patient_id AND p.patient_id = $1",[req.query.id]))
  .then((results)=>res.send(results.rows))
  .then((()=>client.end()))
  .then(()=>console.log("client disconnected!"))
  .then(()=>createnewclient())
  
  .catch(function(e){
  client.end().then(
  res.send({err:e.message}))
  .then(createnewclient());
          
      });
  

  });
module.exports=router; 

async function createnewclient(){
        client  = await new Client({
            user:"taha",
          password:"taha1",
            host:"127.0.0.1",
            port:5432,
            database: "hospital"
         });
      }
