import { ImportedWallet } from "../types";

const BASE_URL: string = "http://localhost:5002";

export const getWallets = () => {
  return fetch(`${BASE_URL}/wallets`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "smth went wrongg"));
}

export const createWallet = (wallet: ImportedWallet) => {
  return fetch(`${BASE_URL}/generate`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wallet),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteWallet = (address: string) => {
  return fetch(`${BASE_URL}/delete`, {
    method: "DELETE",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({address: address}),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};