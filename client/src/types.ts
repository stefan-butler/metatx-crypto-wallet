export interface Wallet {
  mnemonic: string;
  privateKey: string;
  address: string;
}

export interface ImportedWallet extends Wallet {
  name: string;
}

export interface Transaction {
  sender: string;
  recipient: string;
  amount: string;
  transactionHash: string;
  status: string;
  errorMessage: string;
  createdAt: Date;
  name?: String;
}

export type MessageType = 'CHECK_BALANCE' | 'TRANSFER_FUNDS';

export interface Message {
  type: MessageType;
  address?: string;
  recipient?: string;
  amount?: string;
  error?: Error;
}

export interface BalanceResponse {
  balance?: string;
  message?: string;
  txHash?: string;
  error?: string;
}

export interface TransferResponse {
  message?: string;
  txHash?: any;
  error?: string;
}
