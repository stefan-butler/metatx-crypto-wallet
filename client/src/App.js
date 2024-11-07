import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

function App() {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(null);
    const [recipent, setRecipent] = useState('');
    const [amount, setAmount] = useState('');

    const checkBalance = async() => {
        const provider = new ethers.providers.InfuraProvider('homestead', '<infura_ID>');
        const bal = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(bal));
    }

    const transferFunds = async() => {
        try {
            const response = await axios.post('http://localhost:5000/transfer', {
                sender: address,
                recipent,
                amount
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Transfer failed.");
        }
    };

    return (
        <div>
            <h1>MetaTx Wallet</h1>
            <input placeholder="Sender Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button onClick={checkBalance}>Check Balance</button>
            {balance && <p>Balance: {balance} ETH</p>}

            <input placeholder='Recipient Address' value={recipent} onChange={(e) => setRecipent(e.target.value)} />
            <input placeholder='Amount {ETH}' value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={transferFunds}>Transfer Funds</button>
        </div>
    );
}

export default App;