export interface Wallet {
  mnemonic: string;
  privateKey: string;
  address: string;
}

export interface ImportedWallet extends Wallet {
  name: string;
}
