const express = require('express');
const mongoose = require('mongoose');
const { ethers } = require('ethers');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.get('/', (req, res) => {
    res.send("Welcome to the MetaTx Wallet API!");
});

app.get('/balance', async (req, res) => {
    const { address } = req.query;
    const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_PROJECT_ID);

    try {
        const balance = await provider.getBalance(address);
        res.json({ balance: ethers.formatEther(balance) });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching balance', error: error.message });
    }
});

app.post('/transfer', async(req, res) => {
    const { recipient, amount } = req.body;
    const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_PROJECT_ID);
    const wallet = new ethers.Wallet(process.env.MY_PRIVATE_KEY, provider);

    try {
        const tx = await wallet.sendTransaction({
            to: recipient,
            value: ethers.parseEther(amount)
        });
        await tx.wait();
        res.json({ message: 'Transfer successful!', txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ message: 'Transfer failed', error: error.message });
    }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))