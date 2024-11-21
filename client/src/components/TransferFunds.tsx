import React, { useState, useEffect } from "react";
import { ImportedWallet } from "../types";
import { getWallets } from "../services/walletService";

interface TransferProps {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  balance: string;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  checkBalance: () => void;
  recipient: string;
  setRecipient: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  transferFunds: () => Promise<void>;
  txHash: string;
}

const TransferFunds = ({
  setAddress,
  balance,
  checkBalance,
  recipient,
  setRecipient,
  amount,
  setAmount,
  transferFunds,
  txHash,
}: TransferProps) => {
  const [wallets, setWallets] = useState<ImportedWallet[] | null>(null);

  useEffect(() => {
    getWallets().then((res: ImportedWallet[] | null) => {
      setWallets(res);
    });
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="flex items-center justify-between w-4/5 py-4">
        <h2 className="text-2xl font-bold text-gray-800">BALANCE</h2>
      </div>
      {balance && (
        <div className="w-4/5 text-3xl font-semibold text-grey-600">
          <p>{balance} ETH</p>
        </div>
      )}
      <div className="w-4/5">
        <h2 className="text-xl font-bold text-gray-800 mt-3">Select Wallet</h2>
        <select
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          onClick={checkBalance}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Choose a wallet</option>
          {wallets?.map((wallet: ImportedWallet, index) => (
            <option key={index} value={wallet.address}>
              {wallet.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-4/5">
        <h2 className="text-xl font-bold text-gray-800 mt-3">
          Recipient Address
        </h2>
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div className="w-4/5">
        <h2 className="text-xl font-bold text-gray-800 mt-3">Amount</h2>
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={transferFunds}
            className="bg-button-color text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
      {txHash && (
        <div className="w-4/5 text-left">
          <p className="font-bold text-base">Transfer Successful!</p>
          <p className="text-base">Your TxHash is:</p>
          <p className="font-mono text-sm break-all">{txHash}</p>
        </div>
      )}
    </div>
  );
};

export default TransferFunds;
