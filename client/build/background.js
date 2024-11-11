chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    const { type, address, recipient, amount } = message;

    if (type === 'CHECK_BALANCE') {
        try {
            const response = await fetch(`http://localhost:5002/balance?address=${address}`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            sendResponse({ balance: data.balance });
        } catch (error) {
            console.error("Error fetching balance:", error);
            sendResponse({ error: "Failed to fetch balance." });
        }
    } else if (type === 'TRANSFER_FUNDS') {
        try {
            const response = await fetch('http://localhost:5002/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipient, amount })
            });
            const data = await response.json();
            sendResponse({ message: data.message, txHash: data.txHash });
        } catch (error) {
            console.error("Transfer error:", error);
            sendResponse({ error: "Transfer failed." });
        }
    }
    return true;
});
