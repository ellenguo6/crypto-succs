const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:8545");

const potAddress = "0xb53a145F2b42B8cC9333A2dEa06B5D98C9549453";
const potAbi = require("../build/contracts/PotOwnership.json");
const potContract = new web3.eth.Contract(potAbi.abi, potAddress);

const succAddress = "0x49FCE72512a8757aF2C523774141CC2668cc1481";
const succAbi = require("../build/contracts/SuccOwnership.json");
const succContract = new web3.eth.Contract(succAbi.abi, succAddress);

const main = async function () {
  const addresses = await web3.eth.getAccounts();
  const fromMyWallet = {
    from: addresses[2],
    value: 2,
    gasLimit: web3.utils.toHex(500000),
    gasPrice: web3.utils.toHex(20000000000),
  };
  const newSuccTx = await succContract.methods
    .buySucc(0, 2)
    .send(fromMyWallet);
  console.log("new succulent tx info " + JSON.stringify(newSuccTx));
};

main().catch((err) => {
  console.error(err);
});
