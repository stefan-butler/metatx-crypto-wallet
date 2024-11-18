import { Request, Response } from 'express';
import { ethers, AddressLike } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MY_PRIVATE_KEY) {
  throw new Error('MY_PRIVATE_KEY is not defined in the enviroment.');
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
    res.json({ balance: ethers.formatEther(balance) });
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
    res.json({ message: 'Transfer successful!', txHash: tx.hash });
  } catch (error: any) {
    res.status(500).json({ message: 'Transfer failed', error: error.message });
  }
};
