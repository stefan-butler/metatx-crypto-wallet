import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

function App() {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [wallet, setWallet] = useState('');
    const [importMessage, setImportMessage] = useState('');
    const [newWalletInfo, setNewWalletInfo] = useState(null);

    const generateNewWallet = () => {
        const newWallet =  ethers.Wallet.createRandom();
        setWallet(newWallet);
        setNewWalletInfo({
            mnemonic: newWallet.mnemonic.phrase,
            privateKey: newWallet.privateKey,
            address: newWallet.address,
        });
        setImportMessage('');
    }

    const generateWalletFromMnemonic = (mnemonicInput) => {
        if (!mnemonicInput.trim()) {
            setImportMessage("Error: Mnemonic cannot be empty");
            return;
        }
        try {
            const walletFromMnemonic = ethers.Wallet.fromMnemonic(mnemonicInput);
            setWallet(walletFromMnemonic);
            setAddress(walletFromMnemonic.address);
            setPrivateKey('');
            setMnemonic('');
            setImportMessage('Wallet Imported from Mnemonic!');
        } catch (error) {
            setImportMessage("Error: Invalid mnemonic");
            console.error("Error generating wallet from mnemonic:", error);
        }
    }

    const importWalletFromPrivateKey = (privateKeyInput) => {
        if (!privateKeyInput.trim()) { 
            setImportMessage("Error: Private key cannot be empty");
            return;
        }
        try {
            const importedWallet = new ethers.Wallet(privateKeyInput);
            setWallet(importedWallet);
            setAddress(importedWallet.address);
            setPrivateKey('');
            setImportMessage('Wallet Imported from Private Key!');
        } catch (error) {
            setImportMessage("Error: Invalid private key");
            console.error("Error importing wallet:", error);
        }
    };

    const checkBalance = async () => {
        if (!wallet) return alert("Please create or import a wallet first.");
        const provider = new ethers.providers.InfuraProvider('homestead', '0a0548000d0b40d9b8973df53f5e11fa');
        try {
            const bal = await provider.getBalance(address);
            setBalance(ethers.utils.formatEther(bal)); 
        } catch (error) {
            console.error("Error fetching balance: ", error);
            alert("Failed to fetch balance.");
        }
    };

    const transferFunds = async() => {
        if (!wallet) return alert("Please create or import a wallet first.");
        try {
            const response = await axios.post('http://localhost:5000/transfer', {
                sender: address,
                recipient,
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

            {/* Generate New Wallet */}
            <button onClick={generateNewWallet}>Generate New Wallet</button>
            {newWalletInfo && (
                <>
                    <p>Mnemonic: {newWalletInfo.mnemonic}</p>
                    <p>Private Key: {newWalletInfo.privateKey}</p>
                    <p>Address: {newWalletInfo.address}</p>
                </>
            )}

            {/* Enter Mnemonic */}
            <div>
                <input
                    placeholder="Enter mnemonic to import wallet"
                    value={mnemonic}
                    onChange={(e) => setMnemonic(e.target.value)}
                />
                <button onClick={() => generateWalletFromMnemonic(mnemonic)}>Import from Mnemonic</button>
                {importMessage === 'Wallet Imported from Mnemonic!' && <p>{importMessage}</p>}
                {importMessage.startsWith("Error: Invalid mnemonic") && <p style={{ color: 'red' }}>{importMessage}</p>}
            </div>

            {/* Enter Private Key */}
            <div>
                <input
                    placeholder="Enter private key to import wallet"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                />
                <button onClick={() => importWalletFromPrivateKey(privateKey)}>Import from Private Key</button>
                {importMessage === 'Wallet Imported from Private Key!' && <p>{importMessage}</p>}
                {importMessage.startsWith("Error: Invalid private key") && <p style={{ color: 'red' }}>{importMessage}</p>}
            </div>

            {/* Check Balance */}
            <input placeholder="Sender Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button onClick={checkBalance}>Check Balance</button>
            {balance && <p>Balance: {balance} ETH</p>}

            {/* Transfer Funds */}
            <input placeholder='Recipient Address' value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            <input placeholder='Amount {ETH}' value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={transferFunds}>Transfer Funds</button>
        </div>
    );
}

export default App;