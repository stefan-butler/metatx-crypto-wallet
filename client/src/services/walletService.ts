import { ImportedWallet } from '../types';

const BASE_URL: string = 'http://localhost:5002';

export const getWallets = async () => {
  try {
    const res = await fetch(`${BASE_URL}/wallets`);
    return await res.json();
  } catch (err) {
    return console.log(err, 'something went wrong');
  }
};

export const createWallet = async (wallet: ImportedWallet) => {
  try {
    const res = await fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wallet),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

export const deleteWallet = async (address: string) => {
  try {
    const res = await fetch(`${BASE_URL}/delete`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: address }),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};
