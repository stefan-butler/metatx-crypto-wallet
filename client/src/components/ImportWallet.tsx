import React, { useState } from "react";
interface ImportWalProps {
  mnemonic: string;
  setMnemonic: (mnemonic: string) => void;
  privateKey: string;
  setPrivateKey: (privateKey: string) => void;
  walName: string;
  setWalName: (walName: string) => void;
  importWalletFromMnemonic: (mnemonic: string) => void;
  importWalletFromPrivateKey: (privateKey: string) => void;
  importMessage: string;
  address: string;
}

const ImportWallet: React.FC<ImportWalProps> = ({
  mnemonic,
  setMnemonic,
  privateKey,
  setPrivateKey,
  walName,
  setWalName,
  importWalletFromMnemonic,
  importWalletFromPrivateKey,
  importMessage,
  address,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const validateMnemo = () => {
    return !walName || !mnemonic;
  };

  const validatePK = () => {
    return !walName || !privateKey;
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="w-full max-w-md mb-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Import Wallet
        </h2>
        <div className="flex justify-around border-b border-gray-300 mb-4">
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === 0
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(0)}
          >
            Mnemonic
          </button>
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === 1
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(1)}
          >
            Private Key
          </button>
        </div>
        {activeTab === 0 && (
          <div>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Wallet Name"
              value={walName}
              onChange={(e) => setWalName(e.target.value)}
              required
            />
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Mnemonic"
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
            />
            <button
              disabled={validateMnemo()}
              onClick={() => importWalletFromMnemonic(mnemonic)}
              className={`w-full px-4 py-2 bg-button-color text-white rounded-md focus:outline-none ${
                validateMnemo()
                  ? "cursor-not-allowed"
                  : "bg-button-color text-white hover:bg-purple-600"
              }`}
            >
              Import from Mnemonic
            </button>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Wallet Name"
              value={walName}
              onChange={(e) => setWalName(e.target.value)}
            />
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Private Key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
            <button
              disabled={validatePK()}
              onClick={() => importWalletFromPrivateKey(privateKey)}
              className={`w-full px-4 py-2 bg-button-color text-white rounded-md focus:outline-none ${
                validatePK()
                  ? "cursor-not-allowed"
                  : "bg-button-color text-white hover:bg-purple-600"
              }`}
            >
              Import from Private Key
            </button>
          </div>
        )}
        {importMessage && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md">
            <p className="font-bold text-gray-700 mb-2">Import Successful!</p>
            <p className="text-gray-600">Your Wallet Address:</p>
            <p className="font-mono text-sm break-all text-gray-800">
              {address}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportWallet;
