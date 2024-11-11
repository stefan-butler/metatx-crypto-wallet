import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
    const { InfuraProvider } = ethers.providers;
    const [provider] = useState(() => new InfuraProvider('sepolia', process.env.INFURA_PROJECT_ID));
    
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [importMessage, setImportMessage] = useState('');
    const [newWalletInfo, setNewWalletInfo] = useState(null);
    const [txHash, setTxHash] = useState('');

    const generateNewWallet = () => {
        const newWallet =  ethers.Wallet.createRandom();
        setNewWalletInfo({
            mnemonic: newWallet.mnemonic.phrase,
            privateKey: newWallet.privateKey,
            address: newWallet.address,
        });
        setImportMessage('');
    }

    const importWalletFromMnemonic = (mnemonicInput) => {
        if (!mnemonicInput.trim()) {
            setImportMessage("Error: Mnemonic cannot be empty");
            return;
        }
        try {
            const walletFromMnemonic = ethers.Wallet.fromMnemonic(mnemonicInput).connect(provider);
            setAddress(walletFromMnemonic.address);
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
            const importedWallet = new ethers.Wallet(privateKeyInput, provider);
            setAddress(importedWallet.address);
            setPrivateKey('');
            setImportMessage('Wallet Imported from Private Key!');
        } catch (error) {
            setImportMessage("Error: Invalid private key");
            console.error("Error importing wallet:", error);
        }
    };

    const checkBalance = async () => {
        chrome.runtime.sendMessage({ type: 'CHECK_BALANCE', address }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Runtime error:", chrome.runtime.lastError.message);
            } else if (response && response.error) {
                console.error("Error received:", response.error);
            } else if (response && response.balance) {
                setBalance(response.balance);
                console.log("Balance received:", response.balance);
            } else {
                console.error("Unexpected response:", response);
            }
        });
    };

    // const transferFunds = async () => {
    //     try {
    //         const response = await fetch('http://localhost:5002/transfer', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ recipient, amount })
    //         });
    //         const data = await response.json();
    //         alert(data.message);
    //         setImportMessage(data.message);
    //         setTxHash(data.txHash);
    //     } catch (error) {
    //         console.error("Transfer error:", error);
    //         alert("Transfer failed.");
    //     }
    // };
    const transferFunds = async () => {
        chrome.runtime.sendMessage(
            { type: 'TRANSFER_FUNDS', recipient, amount },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Runtime error:", chrome.runtime.lastError.message);
                    alert("Transfer failed.");
                    return;
                } else if (response.error) {
                    console.error("Transfer error:", response.error);
                    alert("Transfer failed.");
                } else {
                    alert(response.message);
                    setImportMessage('Transfer successful!');
                    setTxHash(response.txHash); 
                    console.log("Import message set to:", 'Transfer successful!'); 
                    console.log("Transaction hash set to:", response.txHash); 
                }
            }
        );
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
                <button onClick={() => importWalletFromMnemonic(mnemonic)}>Import from Mnemonic</button>
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
            {importMessage && (
                <p>{importMessage} {txHash && `Your transaction hash is ${txHash}`}</p>
            )}
        </div>
    );
}

export default App;