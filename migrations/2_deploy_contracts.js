const CryptoSucc = artifacts.require("SuccOwnership");
const CryptoPot = artifacts.require("PotOwnership");

module.exports = async function (deployer, network, accounts) {
//   deployer
//     .deploy(CryptoPot, "CryptoPots", "CP")
//     .then(() => CryptoPot.deployed())
//     .then((_instance) =>
//       deployer.deploy(CryptoSucc, _instance.address, "CryptoSuccs", "CS")
//     );
  // .then(() => CryptoPot.getAdmin().then((admin) => console.log(admin)));

  await deployer.deploy(CryptoPot, "CryptoPots", "CP");
  const potInstance = await CryptoPot.deployed();
  await deployer.deploy(CryptoSucc, potInstance.address, "CryptoSuccs", "CS");
  const succInstance = await CryptoSucc.deployed();
};
