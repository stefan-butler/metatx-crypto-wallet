import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/generate'); 
    };

    return (
        <div className="h-screen bg-white flex flex-col items-center mt-[90px]">
            <img src="/home_page.png" alt="Home" className="w-1/2 h-auto mb-4" />
            <button
                className="px-6 py-3 bg-[#625B71] text-white text-lg font-semibold rounded hover:bg-[#4E4859]"
                onClick={handleNavigate}
            >
                ENTER
            </button>
        </div>
    );
};

export default HomePage;

