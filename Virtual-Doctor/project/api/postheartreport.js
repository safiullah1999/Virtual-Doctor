const express = require('express');
const Web3 = require('web3');
const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
const MyContract = require('../build/contracts/Records.json')
var CryptoJS = require("crypto-js");

const router = express.Router();
owner = '0xaCdAEb2fF28f57ac25E2e1aABe000D46f83d0973'
const web3 = new Web3('HTTP://127.0.0.1:7545');
const deployedNetwork = MyContract.networks[5777];
const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address)

function check_values(data, res) {
  // console.log("ababab");
  error = ""
  if (data.sex > 1 || data.sex < 0)
    error = "sex value can either be from 0-1"
  else if (data.cp < 0 || data.cp > 3)
    error = "cp value can either be from 0-3"
  else if (data.fbs < 0 || data.fbs > 1)
    error = "fbs value can either be from 0-1"
  else if (data.restecg < 0 || data.restecg > 2)
    error = "restecg value can either be from 0-2"
  else if (data.exang < 0 || data.exang > 1)
    error = "exang value can either be from 0-1"
  else if (data.slope < 0 || data.slope > 2)
    error = "slope value can either be from 0-2"
  else if (data.ca < 0 || data.ca > 4)
    error = "ca value can either be from 0-4"
  else if (data.thal < 0 || data.thal > 3)
    error = "thal value can either be from 0-3"

  if (error != "") {
    res.send({ err: error })
    return false
  }
  else return true


}

function get_data(req) {
  var dict = {
    "age": req.body.age,
    "sex": req.body.sex,
    "cp": req.body.cp,
    "trestbps": req.body.trestbps,
    "chol": req.body.chol,
    "fbs": req.body.fbs,
    "restecg": req.body.restecg,
    "thalach": req.body.thalach,
    "exang": req.body.exang,
    "oldpeak": req.body.oldpeak,
    "slope": req.body.slope,
    "ca": req.body.ca,
    "thal": req.body.thal
  }
  return dict
}

//api for creating a new admin


router.post('/postheartreport', async function (req, res) {
  var data = []
  try {
    if (check_values(req.body, res)) {
      // console.log(req.body.account);
      const results = await contract.methods.get_heart_records(req.body.account).call()
      // console.log(results, req.body.account);
      if (results != "") {
        //get already added data from ipfs
        const output = JSON.parse(await ipfs.cat(results))
        //decrypt the data
        var bytes = CryptoJS.AES.decrypt(output, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        data = decryptedData
      }
      data.push(get_data(req))
      //encrypt the data
      var plain_text = JSON.stringify(data)
      var ciphertext = CryptoJS.AES.encrypt(plain_text, 'secret key 123').toString()
      //add data to ipfs
      const CID = await ipfs.add(Buffer.from(JSON.stringify(ciphertext)))
      //add CID to blockchain

      await contract.methods.set_heart_records(req.body.account, CID).send({
        from: owner
      })
      res.send({ message: "Data inserted successfully" })
      data = []

    }
  }
  catch (e) {
    res.send({ err: e.message })
  }



});
module.exports = router;


//[req.body.age,req.body.sex,req.body.cp,req.body.trestbps,req.body.chol,req.body.fbs,req.body.restecg,req.body.thalach,req.body.exang,req.body.oldpeak,req.body.slope,req.body.ca,req.body.thal]