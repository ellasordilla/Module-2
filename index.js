import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please click here to open ELLA</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
      </div>
    );
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome To ELLA</h1>
      </header>
      <div>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Cellphone Number"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
        />
      </div>
      <button onClick={toggleHelp}>Help</button>
      {showHelp && (
        <div className="help">
          <h2>How to use the ELLA</h2>
          <h3>Deposit</h3>
          <ol>
            <li>Connect your MetaMask wallet by clicking "Please click here to open ELLA" button.</li>
            <li>Ensure you have sufficient ETH in your MetaMask account.</li>
            <li>Click on the "Deposit 1 ETH" button to deposit 1 ETH into the ELLA.</li>
            <li>Confirm the transaction in your MetaMask wallet.</li>
            <li>Wait for the transaction to be processed. Your balance will update automatically.</li>
          </ol>
          <h3>Withdraw</h3>
          <ol>
            <li>Connect your MetaMask wallet by clicking "Please click here to open ELLA" button.</li>
            <li>Click on the "Withdraw 1 ETH" button to withdraw 1 ETH from the ELLA.</li>
            <li>Confirm the transaction in your MetaMask wallet.</li>
            <li>Wait for the transaction to be processed. Your balance will update automatically.</li>
          </ol>
        </div>
      )}
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
        .help {
          text-align: left;
          margin: 20px;
        }
      `}</style>
    </main>
  );
}
