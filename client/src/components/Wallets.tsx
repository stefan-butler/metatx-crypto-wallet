import React, { useEffect, useState } from "react";
import { getWallets, deleteWallet } from "../services/walletService";
import TransactionList from "./TransactionList";
import { ImportedWallet } from "../types";
import { Link } from "react-router-dom";

const Wallets = () => {
  const [wallets, setWallets] = useState<ImportedWallet[] | null>(null);
  const [state, setState] = useState(0);

  useEffect(() => {
    getWallets().then((res: ImportedWallet[]) => {
      setWallets(res);
    });
  }, []);

  const delWallet = async (address: string) => {
    const newWal = wallets?.filter((wallet) => wallet.address !== address);
    setWallets(newWal as ImportedWallet[]);
    await deleteWallet(address);
  };

  return (
    <div>
      <div className="flex justify-around border-b border-gray-300 mb-4">
        <button
          className={`w-1/2 py-2 text-center ${
            state === 0
              ? "border-b-2 border-purple-600 text-purple-600"
              : "text-gray-500"
          }`}
          onClick={() => setState(0)}
        >
          Your Wallets
        </button>
        <button
          className={`w-1/2 py-2 text-center ${
            state === 1
              ? "border-b-2 border-purple-600 text-purple-600"
              : "text-gray-500"
          }`}
          onClick={() => setState(1)}
        >
          Transaction History
        </button>
      </div>
      {state === 0 && !wallets && (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-600 text-sm font-medium">
            Loading wallets...
          </p>
        </div>
      )}
      {state === 0 && wallets && wallets.length < 1 && (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-600 text-sm font-medium">
            You don’t have any wallets.
          </p>
        </div>
      )}
      {state === 0 && (
        <div className="h-full p-4 space-y-3">
          <div className="space-y-2">
            {wallets &&
              wallets.map((wallet: ImportedWallet, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition group"
                >
                  <Link
                    to="/details"
                    state={{ wallet: wallet }}
                    className="flex-grow flex flex-col"
                  >
                    <h2 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600">
                      {wallet.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {wallet.address.slice(0, 30)}...
                    </p>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      delWallet(wallet.address);
                    }}
                    className="bg-red-500 text-white text-xs font-medium py-2 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-400"
                    style={{ height: "100%" }}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
      {state === 1 && (
        <TransactionList></TransactionList>
      )}
    </div>
  );
};

export default Wallets;
