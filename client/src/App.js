import React, { useState } from 'react';
import { ethers } from 'ethers';
import TransferFunds from './components/TransferFunds';
import ImportWallet from './components/ImportWallet';
import GenerateWallet from './components/GenerateWallet';
import BottomNav from './components/BottomNav';

function App() {
    const { InfuraProvider } = ethers.providers;
    const [provider] = useState(() => new InfuraProvider('sepolia', process.env.INFURA_PROJECT_ID));
    
    const [activeSection, setActiveSection] = useState('transfer');
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
        <div className="min-h-screen flex flex-col justify-between bg-white">
            <header className="p-4 bg-gray-800 text-white text-center">
                <h1 className="text-2xl font-bold">MetaTx Wallet</h1>
                <p>{address}</p>
            </header>
            
            <main className="flex-grow">
                {activeSection === 'generate' && (
                    <GenerateWallet 
                        generateNewWallet={generateNewWallet}
                        newWalletInfo={newWalletInfo}
                    />
                )}
                {activeSection === 'import' && (
                    <ImportWallet 
                        mnemonic={mnemonic}
                        setMnemonic={setMnemonic}
                        privateKey={privateKey}
                        setPrivateKey={setPrivateKey}
                        importWalletFromMnemonic={importWalletFromMnemonic}
                        importWalletFromPrivateKey={importWalletFromPrivateKey}
                        importMessage={importMessage}
                    />
                )}
                {activeSection === 'transfer' && (
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
                )}
            </main>

            <BottomNav setActiveSection={setActiveSection} />
        </div>
    );
}

export default App;