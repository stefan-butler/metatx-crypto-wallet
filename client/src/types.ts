export interface Wallet {
  mnemonic: string;
  privateKey: string;
  address: string;
}

export interface ImportedWallet extends Wallet {
  name: string;
}

export interface Transaction {
  sender: string,
  recipient: string,
  amount: string,
  transactionHash: string,
  status: string,
  errorMessage: string,
  createdAt: Date,
  name?: String
}
