import React, { useState } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/HomePage';
import GenerateWallet from './components/GenerateWallet';
import ImportWallet from './components/ImportWallet';
import TransferFunds from './components/TransferFunds';
import BottomNav from './components/BottomNav';
import MetaTxText from './icons/MetaTx_text';

function App() {
    const { InfuraProvider } = ethers.providers;
    const [provider] = useState(() => new InfuraProvider('sepolia', process.env.INFURA_PROJECT_ID));
    
    const [activeSection, setActiveSection] = useState('generate');
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [generateMessage, setGenerateMessage] = useState('');
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
        setGenerateMessage('New Wallet Generated! Your New Wallet is:');
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
                const roundedBalance = parseFloat(response.balance).toFixed(4);
                setBalance(roundedBalance);
                console.log("Balance received:", roundedBalance);
            } else {
                console.error("Unexpected response:", response);
            }
        });
    };
    
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
        <Router>
            <div className="min-h-screen flex flex-col justify-between bg-white">
                <header className="bg-nav-color px-3 py-3 pl-14 pr-14 text-gray-800 flex items-center justify-between">
                    <MetaTxText/>
                    <img src="/metatx_logo.png" alt="MetaTx Logo" className="w-10 h-10" />
                </header>
                
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route 
                            path="/generate" 
                            element={
                                <GenerateWallet 
                                    generateNewWallet={generateNewWallet}
                                    newWalletInfo={newWalletInfo}
                                    generateMessage={generateMessage}
                                />
                            } 
                        />
                        <Route 
                            path="/import" 
                            element={
                                <ImportWallet 
                                    mnemonic={mnemonic}
                                    setMnemonic={setMnemonic}
                                    privateKey={privateKey}
                                    setPrivateKey={setPrivateKey}
                                    importWalletFromMnemonic={importWalletFromMnemonic}
                                    importWalletFromPrivateKey={importWalletFromPrivateKey}
                                    importMessage={importMessage}
                                    address={address}
                                />
                            } 
                        />
                        <Route 
                            path="/transfer" 
                            element={
                                <TransferFunds 
                                    address={address}
                                    setAddress={setAddress}
                                    balance={balance}
                                    setBalance={setBalance}
                                    checkBalance={checkBalance}
                                    recipient={recipient}
                                    setRecipient={setRecipient}
                                    amount={amount}
                                    setAmount={setAmount}
                                    transferFunds={transferFunds}
                                    txHash={txHash}
                                />
                            } 
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>

                <BottomNav setActiveSection={setActiveSection} />
            </div>
        </Router>
    );
}

export default App;