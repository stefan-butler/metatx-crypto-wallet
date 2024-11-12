import React from 'react';

function ImportWallet({ mnemonic, setMnemonic, privateKey, setPrivateKey, importWalletFromMnemonic, importWalletFromPrivateKey, importMessage }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Import</h2>
            
            <div className="mb-6">
                <input 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    placeholder="Mnemonic" 
                    value={mnemonic} 
                    onChange={(e) => setMnemonic(e.target.value)} 
                />
                <button 
                    onClick={() => importWalletFromMnemonic(mnemonic)} 
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none w-full"
                >
                    Import from Mnemonic
                </button>
            </div>
            
            <div className="mb-6">
                <input 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    placeholder="Private Key" 
                    value={privateKey} 
                    onChange={(e) => setPrivateKey(e.target.value)} 
                />
                <button 
                    onClick={() => importWalletFromPrivateKey(privateKey)} 
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none w-full"
                >
                    Import from Private Key
                </button>
            </div>

            {importMessage && (
                <p className={`mt-4 ${importMessage.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
                    {importMessage}
                </p>
            )}
        </div>
    );
}

export default ImportWallet;