import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function WalletDetails() {
  const [balance, setBalance] = useState<string | null>(null);
  const location = useLocation();
  const wallet = location.state?.wallet;

  useEffect(() => {
    checkBalance(wallet.address);
  }, []);

  const checkBalance = async (address: string): Promise<void> => {
    chrome.runtime.sendMessage(
      { type: "CHECK_BALANCE", address },
      (response: any) => {
        if (chrome.runtime.lastError) {
          console.error("Runtime error:", chrome.runtime.lastError.message);
        } else if (response && response.error) {
          console.error("Error received:", response.error);
        } else if (response && response.balance) {
          const roundedBalance: string = parseFloat(response.balance).toFixed(
            4
          );
          setBalance(roundedBalance);
          console.log("Balance received:", roundedBalance);
        } else {
          console.error("Unexpected response:", response);
        }
      }
    );
  };

  return (
    <div className="h-full flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg space-y-4">
        <h1 className="text-lg font-bold text-gray-800 text-center">
          Wallet Details
        </h1>
        <div>
          <p className="text-sm font-semibold text-gray-600">Wallet Name</p>
          <div className="bg-gray-100 p-3 rounded-md shadow-sm">
            <span className="text-sm font-mono text-gray-800 break-all">
              {wallet.name}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600">Address</p>
          <div className="bg-gray-100 p-3 rounded-md shadow-sm">
            <span className="text-sm font-mono text-gray-800 break-all">
              {wallet.address}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600">Mnemonic</p>
          <div className="bg-gray-100 p-3 rounded-md shadow-sm">
            <span className="text-sm font-mono text-gray-800 break-all">
              {wallet.mnemonic}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600">Private Key</p>
          <div className="bg-gray-100 p-3 rounded-md shadow-sm">
            <span className="text-sm font-mono text-gray-800 break-all">
              {wallet.privateKey}
            </span>
          </div>
        </div>
        {balance && (
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-800 mt-3">
              {balance} ETH
            </h2>
          </div>
        )}
        <Link
          to="/wallets"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default WalletDetails;
