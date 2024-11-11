import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ type: "CHECK_BALANCE", address: "your_test_address" }, (response) => {
      console.log("Response from background:", response);
    });
  });