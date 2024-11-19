import { Request, Response } from 'express';
import { ethers, AddressLike } from 'ethers';
import dotenv from 'dotenv';
import TransactionLog from '../models/transactions'

dotenv.config();

if (!process.env.MY_PRIVATE_KEY) {
  throw new Error('MY_PRIVATE_KEY is not defined in the enviroment.');
}

if (!process.env.INFURA_PROJECT_ID) {
  throw new Error('INFURA_PROJECT_ID is not defined in the environment.');
}

const myPrivateKey: string = process.env.MY_PRIVATE_KEY;

export const fetchBalance = async (req: Request, res: Response) => {
  const { address } = req.query;
  const provider = new ethers.InfuraProvider(
    'sepolia',
    process.env.INFURA_PROJECT_ID
  );

  try {
    const balance = await provider.getBalance(address as AddressLike);
    res.status(200).json({ balance: ethers.formatEther(balance) });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error fetching balance', error: error.message });
  }
};

export const transferBalance = async (req: Request, res: Response) => {
  const { recipient, amount } = req.body;
  const provider = new ethers.InfuraProvider(
    'sepolia',
    process.env.INFURA_PROJECT_ID
  );
  const wallet = new ethers.Wallet(myPrivateKey, provider);

  try {
    const tx = await wallet.sendTransaction({
      to: recipient,
      value: ethers.parseEther(amount),
    });
    await tx.wait();

     // Log the successful transaction in db
     await TransactionLog.create({
      sender: wallet.address,
      recipient,
      amount,
      transactionHash: tx.hash,
      status: 'success',
    });

    res.json({ message: 'Transfer successful!', txHash: tx.hash });
  } catch (error: any) {
    // Log the failed transaction
    await TransactionLog.create({
      sender: wallet.address,
      recipient,
      amount,
      transactionHash: '', // No hash since the transaction failed
      status: 'failed',
      errorMessage: error.message,
    });
    
    res.status(500).json({ message: 'Transfer failed', error: error.message });
  }
};
