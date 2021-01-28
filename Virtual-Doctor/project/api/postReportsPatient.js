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


function get_data(req) {
  var dict = {
    "haematocrit": req.body.haematocrit,
    "erythrocytes_rbc": req.body.erythrocytes_rbc,
    "leucocytes_wbc": req.body.leucocytes_wbc,
    "rdw_cv": req.body.rdw_cv,
    "platelets": req.body.platelets,
    "pdw": req.body.pdw,
    "mpv": req.body.mpv,
  }
  return dict
}

//api for creating a new admin


router.post('/postreportspatient', async function (req, res) {
  var data = []
  try {

    const results = await contract.methods.get_report_records(req.body.account).call()
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
    await contract.methods.set_report_records(req.body.account, CID).send({
      from: owner
    })
    res.send({ message: "Data inserted successfully" })
    data = []


  }
  catch (e) {
    res.send({ err: e.message })
  }



});
module.exports = router;


