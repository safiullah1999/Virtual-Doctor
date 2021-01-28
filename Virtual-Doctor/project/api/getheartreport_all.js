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


router.get('/getheartreport_all', async function (req, res) {
  try {
    //get the CID from blockchain
    console.log(req.body, req.query.account);
    const results = await contract.methods.get_heart_records(req.query.account).call()
    //get data from ipfs
    const output = JSON.parse(await ipfs.cat(results))
    //decrypt the data
    var bytes = CryptoJS.AES.decrypt(output, 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    res.send(decryptedData)
  }
  catch (e) {
    res.send({ err: e.message })
  }



});
module.exports = router;

//[req.body.age,req.body.sex,req.body.cp,req.body.trestbps,req.body.chol,req.body.fbs,req.body.restecg,req.body.thalach,req.body.exang,req.body.oldpeak,req.body.slope,req.body.ca,req.body.thal]