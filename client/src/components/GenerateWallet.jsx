import React from 'react';

function GenerateWallet({ generateNewWallet, newWalletInfo }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Generate</h2>
            <button 
                onClick={generateNewWallet} 
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none mb-6 w-full"
            >
                Generate New Wallet
            </button>
            
            {newWalletInfo && (
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                    <p><span className="font-bold">Address:</span> <span className="font-mono text-sm">{newWalletInfo.address}</span></p>
                    <p><span className="font-bold">Private Key:</span> <span className="font-mono text-sm">{newWalletInfo.privateKey}</span></p>
                    <p><span className="font-bold">Mnemonic:</span> <span className="font-mono text-sm">{newWalletInfo.mnemonic}</span></p>
                </div>
            )}
        </div>
    );
}

export default GenerateWallet;
