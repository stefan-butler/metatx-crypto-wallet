import express from 'express';
import { Request, Response } from 'express';
import { fetchBalance, transferBalance } from './controllers/balance';
import { getWallets, addWallet, deleteWallet } from './controllers/wallet';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the MetaTx Wallet API!');
});

router.get('/balance', fetchBalance);

router.post('/transfer', transferBalance);

// Wallets

router.get('/wallets', getWallets);
router.post('/generate', addWallet);
router.delete('/delete', deleteWallet);

export default router;
