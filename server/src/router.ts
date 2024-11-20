import express from 'express';
import { Request, Response } from 'express';
import { fetchBalance, transferBalance } from './controllers/balance';
import { getWallets, addWallet, deleteWallet } from './controllers/wallet';
import { getTransactions } from './controllers/transactions';
import TransactionLog from './models/transactions';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the MetaTx Wallet API!');
});

router.get('/balance', fetchBalance);

router.post('/transfer', transferBalance);

router.get('/logs', async (req, res) => {
  try {
    const logs = await TransactionLog.find().sort({ createdAt: -1 }); // Fetch logs in descending order
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error });
  }
});

// Wallets

router.get('/wallets', getWallets);
router.post('/generate', addWallet);
router.delete('/delete', deleteWallet);

// Transactions

router.get('/transactions', getTransactions);

export default router;
