import express from 'express';
import { Request, Response } from 'express';
import { fetchBalance, transferBalance } from './controllers/controller';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the MetaTx Wallet API!');
});

router.get('/balance', fetchBalance);

router.post('/transfer', transferBalance);

export default router;
