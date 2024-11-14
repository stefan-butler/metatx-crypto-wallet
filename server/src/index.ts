import express from 'express';
import { Request, Response } from 'express';

import mongoose from 'mongoose';

import ethers from 'ethers';

import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

// server/index
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
  });

// router
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the MetaTx Wallet API!');
});

app.get('/balance', async (req: Request, res: Response) => {
  const { address } = req.query;
  const provider = new ethers.InfuraProvider(
    'sepolia',
    process.env.INFURA_PROJECT_ID
  );

  try {
    const balance = await provider.getBalance(address);
    res.json({ balance: ethers.formatEther(balance) });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error fetching balance', error: error.message });
  }
});

app.post('/transfer', async (req: Request, res: Response) => {
  const { recipient, amount } = req.body;
  const provider = new ethers.InfuraProvider(
    'sepolia',
    process.env.INFURA_PROJECT_ID
  );
  const wallet = new ethers.Wallet(process.env.MY_PRIVATE_KEY, provider);

  try {
    const tx = await wallet.sendTransaction({
      to: recipient,
      value: ethers.parseEther(amount),
    });
    await tx.wait();
    res.json({ message: 'Transfer successful!', txHash: tx.hash });
  } catch (error: any) {
    res.status(500).json({ message: 'Transfer failed', error: error.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
