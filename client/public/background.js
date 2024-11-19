console.log("Service Worker loaded"); // console.log #1

chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    const { type, address, recipient, amount } = message;

    if (type === 'CHECK_BALANCE') {
            fetch(`http://localhost:5002/balance?address=${address}`)
            .then(response => {
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                return response.json();
            })
            .then(data => {
                sendResponse({ balance: data.balance });
            })
            .catch(error => {
                console.error("Error fetching balance:", error);
                sendResponse({ error: "Failed to fetch balance." });
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
                    sendResponse({ message: data.message, txHash: data.txHash });
                })
                .catch(error => {
                    console.error("Transfer error:", error);
                    sendResponse({ error: "Transfer failed." });
                });
        }
    return true;
});
