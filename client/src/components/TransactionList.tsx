import React, { useState, useEffect } from "react";
import GreenTick from "../icons/GreenTick";
import RedCross from "../icons/RedCross";
import { getTransactions } from "../services/transactionService";
import { Transaction } from "../types";

function TransactionList() {
  const [trs, setTrs] = useState<Transaction[] | null>(null);

  useEffect(() => {
    getTransactions().then((res: Transaction[]) => {
      setTrs(res);
    });
  }, []);

  if (!trs) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-600 text-sm font-medium">
          Loading transactions...
        </p>
      </div>
    );
  }
  if (trs.length < 1) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-600 text-sm font-medium">
          There is no transactions
        </p>
      </div>
    );
  }

  return (
    <div className="h-full p-4 space-y-3">
    <div className="space-y-2">
      {trs.map((tr: Transaction, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition group"
          >
            <div>
              <h2 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600">
                From: {tr.name}
              </h2>
              <p className="text-xs text-gray-500">
                Recepient Address: {tr.recipient}
              </p>
              <p className="text-xs text-gray-500">
                Amount: {tr.amount}
              </p>
            </div>
            <div>
              {tr.status === "success" ? (<GreenTick></GreenTick>) : (<RedCross></RedCross>)}
            </div>
          </div>
        ))}
    </div>
  </div>
  );
}

export default TransactionList;
