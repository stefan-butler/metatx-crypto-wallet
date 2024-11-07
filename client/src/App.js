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
            const response = await axios.post()
        }
    }
}

