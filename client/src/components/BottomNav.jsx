import React from 'react';
import GenerateIcon from '../icons/GenerateIcon';
import ImportIcon from '../icons/ImportIcon';
import TransferIcon from '../icons/TransferIcon';

function BottomNav({ setActiveSection }) {
    return (
        <footer className="bg-nav-color p-4 text-center flex justify-around fixed bottom-0 left-0 w-full">
            <button 
                onClick={() => setActiveSection('generate')} 
                className="flex flex-col items-center text-gray-800"
            >
                <div className="w-6 h-6 mb-3">
                    <GenerateIcon />
                </div>
                <span>GENERATE</span>
            </button>

            <button 
                onClick={() => setActiveSection('import')} 
                className="flex flex-col items-center text-gray-800"
            >
                <div className="w-6 h-6 mb-3">
                    <ImportIcon />
                </div>
                <span>IMPORT</span>
            </button>

            <button 
                onClick={() => setActiveSection('transfer')} 
                className="flex flex-col items-center text-gray-800"
            >
                <div className="w-6 h-6 mb-3">
                    <TransferIcon />
                </div>
                <span>TRANSFER</span>
            </button>
        </footer>
    );
}


export default BottomNav;
