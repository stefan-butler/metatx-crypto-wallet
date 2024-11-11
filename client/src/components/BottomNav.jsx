import React from 'react';

function BottomNav({ setActiveSection }) {
    return (
        <div className="flex justify-around bg-gray-200 p-2 fixed bottom-0 left-0 right-0">
            <button 
                onClick={() => setActiveSection('transfer')} 
                className="text-gray-600 hover:text-purple-600 focus:outline-none"
            >
                Transfer
            </button>
            <button 
                onClick={() => setActiveSection('import')} 
                className="text-gray-600 hover:text-purple-600 focus:outline-none"
            >
                Import
            </button>
            <button 
                onClick={() => setActiveSection('generate')} 
                className="text-gray-600 hover:text-purple-600 focus:outline-none"
            >
                Generate
            </button>
        </div>
    );
}

export default BottomNav;
