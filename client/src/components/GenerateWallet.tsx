import React from 'react';

interface NewWalInfo {
  address: string;
  mnemonic: string;
  privateKey: string;
}

export interface GenProps {
  generateNewWallet: () => void;
  newWalletInfo: NewWalInfo | null;
  generateMessage: string;
}

const GenerateWallet: React.FC<GenProps> = ({
  generateNewWallet,
  newWalletInfo,
  generateMessage,
}) => {
  return (
    <div className="p-4 flex flex-col items-center">
      <div className="flex items-center justify-between w-4/5 py-4">
        <h2 className="text-2xl font-bold text-gray-800">GENERATE</h2>
        <button
          onClick={generateNewWallet}
          className="bg-button-color text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none"
        >
          Generate
        </button>
      </div>

      {generateMessage && (
        <div className="text-left w-4/5 mb-4">
          <p className="font-bold text-base">New Wallet Generated!</p>
          <p className="text-base">Your New Wallet is:</p>
        </div>
      )}

      {/* Address Div */}
      <div className="w-4/5 space-y-6">
        <div>
          <p className="font-bold text-gray-700 mb-1 text-base">Address</p>
          <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center justify-between">
            <span
              data-testid="address-field"
              className="font-mono text-sm break-all flex-1"
            >
              {newWalletInfo?.address || ''}
            </span>
          </div>
        </div>

        {/* Mnemonic Div */}
        <div>
          <p className="font-bold text-gray-700 mb-1 text-base">Mnemonic</p>
          <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center justify-between">
            <span
              data-testid="mnemonic-field"
              className="font-mono text-sm break-all flex-1"
            >
              {newWalletInfo?.mnemonic || ''}
            </span>
          </div>
        </div>

        {/* Private Key Div */}
        <div>
          <p className="font-bold text-gray-700 mb-1 text-base">Private Key</p>
          <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center justify-between">
            <span
              data-testid="private-key-field"
              className="font-mono text-sm break-all flex-1"
            >
              {newWalletInfo?.privateKey || ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateWallet;
