import React from 'react';

function GenerateWallet({ generateNewWallet, newWalletInfo, importMessage }) {
    return (
        <div className="p-4 flex flex-col items-center">
            <div className="flex items-center justify-between w-4/5 mb-4">
                <h2 className="text-xl font-bold text-gray-800">Generate</h2>
                <button 
                    onClick={generateNewWallet} 
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none"
                >
                    Generate
                </button>
            </div>

            {generateMessage && (
                <div className="text-left w-4/5 mb-4">
                    <p className="font-bold text-black">New Wallet Generated!</p>
                    <p className="text-black">Your New Wallet is:</p>
                </div>
            )}
            
        {/* Address Div */}
        <div className="w-4/5 space-y-6">
            <div>
                <p className="font-bold text-gray-700 mb-1">Address:</p>
                <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center justify-between">
                    <span className="font-mono text-sm break-all flex-1">{newWalletInfo?.address || ''}</span>
                </div>
            </div>

            {/* Private Key Div */}
            <div>
                <p className="font-bold text-gray-700 mb-1">Private Key:</p>
                    <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center justify-between">
                        <span className="font-mono text-sm break-all flex-1">{newWalletInfo?.privateKey || ''}</span>
                    </div>
                </div>

                {/* Mnemonic Div */}
                <div>
                    <p className="font-bold text-gray-700 mb-1">Mnemonic:</p>
                    <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center justify-between">
                        <span className="font-mono text-sm break-all flex-1">{newWalletInfo?.mnemonic || ''}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default GenerateWallet;
