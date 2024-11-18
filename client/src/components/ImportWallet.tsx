import React from "react";
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
  return (
    <div className="p-4 flex flex-col items-center">
      <div className="w-4/5 mb-4 py-4">
        <h2 className="text-2xl font-bold text-gray-800">IMPORT</h2>
      </div>

      <div className="w-4/5 mb-3">
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Wallet name"
          value={walName}
          onChange={(e) => setWalName(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Mnemonic"
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
        />
        <button
          onClick={() => importWalletFromMnemonic(mnemonic)}
          className="bg-button-color text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none w-full"
        >
          Import from Mnemonic
        </button>
      </div>

      <div className="w-4/5 mb-3">
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Private Key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <button
          onClick={() => importWalletFromPrivateKey(privateKey)}
          className="bg-button-color text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none w-full"
        >
          Import from Private Key
        </button>
      </div>

      {importMessage && (
        <div className="w-4/5 mt-3 text-left">
          <p className="font-bold text-base">Import Successful!</p>
          <p className="text-base">Your Wallet Address is:</p>
          <p className="font-mono text-sm break-all">{address || ""}</p>
        </div>
      )}
    </div>
  );
};

export default ImportWallet;
