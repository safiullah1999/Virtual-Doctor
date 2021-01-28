const Web3 = require('web3');
const info = require('./info.json');
const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
const MyContract = require('./build/contracts/Records.json')
var CryptoJS = require("crypto-js");
owner = '0xaCdAEb2fF28f57ac25E2e1aABe000D46f83d0973'
const init = async () => {
    //initalize web3 object
    const web3 = new Web3('HTTP://127.0.0.1:7545');
    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const accounts = await web3.eth.getAccounts()
    const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address)
    const result = await contract.methods.get_prescription_records(accounts[1]).call()
    console.log("identifier: ", result)
    const output = JSON.parse(await ipfs.cat(result))
    console.log("encrypted data: ", output)
    // console.log("info: ", info.owner, info.key)

}
init();
