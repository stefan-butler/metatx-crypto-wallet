import Wallet from "../models/wallet";
import { Request, Response } from "express";

export const getWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await Wallet.find({});
    res.send(wallets).status(200);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const addWallet = async (req: Request, res: Response) => {
  const wallet = req.body;
  try {
    await Wallet.create(wallet);
    res.send("wallet created").status(201);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const deleteWallet = async (req: Request, res: Response) => {
  const { address } = req.body;
  try {
    await Wallet.deleteOne({ address: address });
    res.send("deleted").status(200);
  } catch (err) {
    res.send("somethings wrong").status(500);
  }
};
