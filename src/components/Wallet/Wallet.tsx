"use client"

import { useState } from 'react';
import Web3 from 'web3';

interface Window {
    ethereum: any;
}

const Wallet: React.FC = () => {
  const [account, setAccount] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);

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
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect MetaMask</button>
      {account && <div>Account: {account}</div>}
      {balance && <div>Balance: {balance} ETH</div>}
    </div>
  );
};

export default Wallet;