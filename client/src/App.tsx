import React, { useState } from 'react';
import { ethers } from 'ethers';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import GenerateWallet from './components/GenerateWallet';
import ImportWallet from './components/ImportWallet';
import TransferFunds from './components/TransferFunds';
import BottomNav from './components/BottomNav';
import MetaTxText from './icons/MetaTx_text';
import Wallets from './components/Wallets';
import WalletDetails from './components/WalletDetails';
import {
  BalanceResponse,
  Message,
  MessageType,
  TransferResponse,
  Wallet,
} from './types';
import { createWallet } from './services/walletService';

function App() {
  const { InfuraProvider } = ethers.providers;
  const [provider] = useState(
    () => new InfuraProvider('sepolia', process.env.INFURA_PROJECT_ID)
  );

  const [walName, setWalName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [mnemonic, setMnemonic] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [generateMessage, setGenerateMessage] = useState<string>('');
  const [importMessage, setImportMessage] = useState<string>('');
  const [newWalletInfo, setNewWalletInfo] = useState<Wallet | null>(null);
  const [txHash, setTxHash] = useState<string>('');

  const generateNewWallet = (): void => {
    const newWallet: ethers.Wallet = ethers.Wallet.createRandom();
    setNewWalletInfo({
      mnemonic: newWallet.mnemonic.phrase,
      privateKey: newWallet.privateKey,
      address: newWallet.address,
    });
    setGenerateMessage('New Wallet Generated! Your New Wallet is:');
  };

  const importWalletFromMnemonic = (mnemonicInput: string): void => {
    if (!mnemonicInput.trim()) {
      setImportMessage('Error: Mnemonic cannot be empty');
      return;
    }
    try {
      const walletFromMnemonic =
        ethers.Wallet.fromMnemonic(mnemonicInput).connect(provider);
      setAddress(walletFromMnemonic.address);
      createWallet({
        address: walletFromMnemonic.address,
        mnemonic: walletFromMnemonic.mnemonic.phrase,
        privateKey: walletFromMnemonic.privateKey,
        name: walName,
      });
      setWalName('');
      setMnemonic('');
      setImportMessage('Wallet Imported from Mnemonic!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error generating wallet from mnemonic:', error);
      }
      setImportMessage('Error: Invalid mnemonic');
    }
  };

  const importWalletFromPrivateKey = (privateKeyInput: string): void => {
    if (!privateKeyInput.trim()) {
      setImportMessage('Error: Private key cannot be empty');
      return;
    }
    try {
      const importedWallet = new ethers.Wallet(privateKeyInput, provider);
      setAddress(importedWallet.address);
      createWallet({
        address: importedWallet.address,
        mnemonic: 'pk imported',
        privateKey: importedWallet.privateKey,
        name: walName,
      });
      setWalName('');
      setPrivateKey('');
      setImportMessage('Wallet Imported from Private Key!');
    } catch (error) {
      setImportMessage('Error: Invalid private key');
      console.error('Error importing wallet:', error);
    }
  };

  // temporary any for response
  const checkBalance = async (): Promise<void> => {
    chrome.runtime.sendMessage(
      { type: 'CHECK_BALANCE', address },
      (response: BalanceResponse) => {
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError.message);
        } else if (response && response.error) {
          console.error('Error received:', response.error);
        } else if (response && response.balance) {
          const roundedBalance: string = parseFloat(response.balance).toFixed(
            4
          );
          setBalance(roundedBalance);
          console.log('Balance received:', roundedBalance);
        } else {
          console.error('Unexpected response:', response);
        }
      }
    );
  };

  // temporary any for response
  const transferFunds = async (): Promise<void> => {
    chrome.runtime.sendMessage(
      { type: 'TRANSFER_FUNDS', address, recipient, amount },
      (response: TransferResponse) => {
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError.message);
          alert('Transfer failed.');
          return;
        } else if (response.error) {
          console.error('Transfer error:', response.error);
          alert('Transfer failed.');
        } else {
          alert(response.message);
          setImportMessage('Transfer successful!');
          setTxHash(response.txHash);
          console.log('Import message set to:', 'Transfer successful!');
          console.log('Transaction hash set to:', response.txHash);
        }
      }
    );
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-white">
        <header className="bg-nav-color px-3 py-3 pl-14 pr-14 text-gray-800 flex items-center justify-between">
          <MetaTxText />
          <img src="/metatx_logo.png" alt="MetaTx Logo" className="w-10 h-10" />
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details" element={<WalletDetails />}></Route>
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
                  walName={walName}
                  setWalName={setWalName}
                  importWalletFromMnemonic={importWalletFromMnemonic}
                  importWalletFromPrivateKey={importWalletFromPrivateKey}
                  importMessage={importMessage}
                  address={address}
                />
              }
            />
            <Route path="wallets" element={<Wallets></Wallets>}></Route>
            <Route
              path="/transfer"
              element={
                <TransferFunds
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

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
