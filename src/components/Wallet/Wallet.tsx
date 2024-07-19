"use client"

import { useState, useEffect } from 'react';
import Web3 from 'web3';

interface Window {
    ethereum: any;
}

const Wallet: React.FC = () => {
  const [account, setAccount] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Определить, использует ли пользователь мобильное устройство
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|iphone|ipad|ipod/.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.request) {
        const web3 = new Web3((window as Window).ethereum);
        let address = "";
        
        await window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((data: any) => {
                setAccount(data[0]);
                address = data[0];
            })
            .catch(error => console.log(error));
            
        await web3.eth.getBalance(address)
            .then((balance: any) => setBalance(web3.utils.fromWei(balance, 'ether')))
            .catch(error => console.log(error));
    } else {
        setMessage("You have no MetaMask app on your device")
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect MetaMask</button>
      {message && <div>{message}</div>}
      {<div>Is mobile: {`${isMobile}`}</div>}
      {account && <div>Account: {account}</div>}
      {balance && <div>Balance: {balance} ETH</div>}
    </div>
  );
};

export default Wallet;