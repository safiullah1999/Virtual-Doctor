const Records = artifacts.require("Records");

module.exports = function (deployer) {
  deployer.deploy(Records);
};
