import { MessageType, Message, BalanceResponse, TransferResponse } from '../src/types'
console.log("Service Worker loaded"); // console.log #1

chrome.runtime.onMessage.addListener((message: Message, sender: chrome.runtime.MessageSender, sendResponse: (response: BalanceResponse | TransferResponse) => void): boolean => {
    const { type, address, recipient, amount } = message;

    if (type === 'CHECK_BALANCE') {
            fetch(`http://localhost:5002/balance?address=${address}`)
            .then(response => {
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                return response.json();
            })
            .then((data: { balance: string }) => {
                sendResponse({ balance: data.balance } as BalanceResponse);
            })
            .catch(error => {
                console.error("Error fetching balance:", error);
                sendResponse({ error: "Failed to fetch balance." } as BalanceResponse);
            });
        } else if (type === 'TRANSFER_FUNDS') {
            console.log("Sending request to transfer funds...");
            fetch('http://localhost:5002/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, recipient, amount })
            })
                .then(response => {
                    console.log("Received response for transfer:", response);
                    if (!response.ok) throw new Error(`Error: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    console.log("Parsed transfer response data:", data);
                    sendResponse({ message: data.message, txHash: data.txHash } as TransferResponse);
                })
                .catch(error => {
                    console.error("Transfer error:", error);
                    sendResponse({ error: "Transfer failed." } as TransferResponse);
                });
        }
    return true;
});
