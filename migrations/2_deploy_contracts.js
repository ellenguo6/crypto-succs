const CryptoSucc = artifacts.require("SuccOwnership");
const CryptoPot = artifacts.require("PotOwnership");

module.exports = async function (deployer, network, accounts) {
  deployer
    .deploy(CryptoPot, "CryptoPots", "CP")
    .then(() => CryptoPot.deployed())
    .then((_instance) =>
      deployer.deploy(CryptoSucc, _instance.address, "CryptoSuccs", "CS")
    );
};
