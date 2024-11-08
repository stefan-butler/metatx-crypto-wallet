const express = require('express');
const mongoose = require('mongoose');
const { ethers } = require('ethers');
const app = express();
require('dotenv').config();

mongoose.connect('MONGODB_URI', {}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the MetaTx Wallet API!");
});

app.get('/balance', async (req, res) => {
    const { address } = req.query;
    const provider = new ethers.providers.InfuraProvider('holesky', process.env.INFURA_PROJECT_ID);

    try {
        const balance = await provider.getBalance(address);
        res.json({ balance: ethers.utils.formatEther(balance) });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching balance', error: error.message });
    }
});

app.post('/transfer', async(req, res) => {
    const { recipient, amount } = req.body;
    const provider = new ethers.providers.InfuraProvider('holesky', process.env.INFURA_PROJECT_ID);
    const wallet = new ethers.Wallet(process.env.MY_PRIVATE_KEY, provider);

    try {
        const tx = await wallet.sendTransaction({
            to: recipient,
            value: ethers.utils.parseEther(amount)
        });
        await tx.wait();
        res.json({ message: 'Transfer successful!', txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ message: 'Transfer failed', error: error.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`))