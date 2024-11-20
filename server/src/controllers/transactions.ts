import TransactionLog from "../models/transactions";
import { Request, Response } from "express";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const logs = await TransactionLog.find({});
    res.send(logs).status(200);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};
