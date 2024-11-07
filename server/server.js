const express = require('express');
const mongoose = require('mongoose');
const { ethers } = require('ethers');
const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.post('/transfer', async(req, res) => {
    const { sender, recipient, amount } = req.body;
    const provider = new ethers.providers.InfuraProvider('homestead', process.env.0a0548000d0b40d9b8973df53f5e11fa);

    try {
        const signer = new ethers.Wallet('<MY_PRIVATE_KEY>', provider);
        const tx = await signer.sendTransaction({
            to: recipient,
            value: ethers.utils.parseEther(amount)
        });
        res.json({ message: `Transfer successful: ${tx.hash}`});
    } catch (error) {
        res.status(500).json({ message: 'Transfer failed', error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));