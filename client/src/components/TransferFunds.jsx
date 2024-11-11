import React, { useState } from 'react';

function TransferFunds({ address, setAddress, balance, checkBalance, recipient, setRecipient, amount, setAmount, transferFunds, txHash }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Balance</h2>
            <p className="text-3xl font-semibold text-purple-600 mb-2">{balance} ETH</p>
            <button 
                onClick={checkBalance} 
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none mb-6"
            >
                Check
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Sender Address</h2>
            <input 
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                placeholder="Sender Address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
            />

            <h2 className="text-xl font-bold text-gray-800 mb-4">Recipient Address</h2>
            <input 
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                placeholder="Recipient Address" 
                value={recipient} 
                onChange={(e) => setRecipient(e.target.value)} 
            />

            <h2 className="text-xl font-bold text-gray-800 mb-4">Amount</h2>
            <input 
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                placeholder="Amount (ETH)" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />

            <button 
                onClick={transferFunds} 
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none"
            >
                Send
            </button>

            {txHash && (
                <p className="mt-4 text-green-600">
                    Transfer Successful! TxHash: <span className="font-mono text-sm">{txHash}</span>
                </p>
            )}
        </div>
    );
}

export default TransferFunds;
