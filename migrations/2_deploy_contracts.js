const CryptoSucc = artifacts.require("SuccBase");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(CryptoSucc);
  const cryptoSucc = await CryptoSucc.deployed();
};
