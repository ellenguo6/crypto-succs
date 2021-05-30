import Button from 'react-bootstrap/Button';
import Web3 from 'web3';
import {Link} from "react-router-dom";

export default function LandingScreen(props) {
    const web3 = new Web3(Web3.givenProvider || "https://rpc-mumbai.matic.today/")

    return(
        <div className="center">
        <h1 style={{padding: 30}}>Welcome to CryptoSuccs</h1>
        <h2 style={{padding: 10}}>Ready to succ some succulents?</h2>
        {Wallet(props, web3)}
        </div>
    );
}

function Wallet(props, web3) {
    const account = props.account
    if(account) {
        return(
            <div>
            <p>Account: {account}</p>
            <Link to={'/home'}>
                <Button variant="success" size="lg">Home</Button>
            </Link>
            <button onClick={() => transact(props, web3)} > Send Transaction </button>
            <button onClick={() => props.buyPlant()} > Buy Plant </button>
            <button onClick={() => props.getPlants()} > Get Plants </button>
            </div>
        );
    } else {
        return(
            <Button variant="primary" onClick={() => connectWallet(props, web3)}>Connect your Wallet</Button>
        );
    }
}

function connectWallet(props, web3) {
    // async function getEthereumAccount() {
    //     const accounts = await web3.eth.requestAccounts()
    //     const account = accounts[0];
    //     console.log(account)
    //     props.setAccount(account)
    // }

    if(!props.account) {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!')
            props.setupBlockchain()
        } else {
            console.log('Please install MetaMask')
        }
    }
}

const transact = async (props, web3) => {
    // txHash is a hex string
  // As with any RPC call, it may throw an error
  console.log("hi")
  const gasQuote = await fetch('https://gasstation-mumbai.matic.today')
  const gasJson = await gasQuote.json();
  const gasPrice = gasJson['safeLow'];
  console.log(gasJson)
  console.log(gasPrice)
  const txHash = await web3.eth.sendTransaction(transactionParameters(props, web3, gasPrice));
  console.log(txHash);
}

function transactionParameters(props, web3, gasPrice) {
return {
    nonce: '0x00', // ignored by MetaMask
    gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
    gas: 50000, // customizable by user during MetaMask confirmation.
    to: '0xDF0891639d6F7AAa851C7883464d6280a53c6902', // Required except during contract publications.
    from: props.account, // must match user's active address.
    value: web3.utils.toWei('0.01'), // Only required to send ether to the recipient from the initiating external account.
    data:
      '0x00', // Optional, but used for defining smart contract creation and interaction.
    chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };
}
  
  

