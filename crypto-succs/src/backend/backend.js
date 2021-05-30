import {
    SUCC_OWNERSHIP_ADDRESS,
    SUCC_OWNERSHIP_ABI,
    POT_OWNERSHIP_ADDRESS,
    POT_OWNERSHIP_ABI
} from "../config.js"

export async function getAccount(web3) {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}

export async function getSuccContract(web3) {
    return new web3.eth.Contract(SUCC_OWNERSHIP_ABI, SUCC_OWNERSHIP_ADDRESS);
}

export async function getSuccIds(web3, account, contract) {
    const succIds = await contract.methods.succsOfOwner(account).call();
    return succIds
}

export async function getPlantFromSuccId(web3, contract, succId) {
    const output = await contract.methods.getSuccInfo(succId).call();
}

export async function buySucc(web3, contract, account, dna, price) {
    const id = await contract.methods.buySucc(dna, price).send({
        from: account,
        value: '0x00'
    });
    return id;
}

export async function getPotContract(web3) {
    return new web3.eth.Contract(POT_OWNERSHIP_ABI, POT_OWNERSHIP_ADDRESS);
}

export async function getPotAdmin(contract) {
    const admin = await contract.methods.getAdmin().call()
    return admin;
}