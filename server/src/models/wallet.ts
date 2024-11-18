import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  mnemonic: { type: String, required: true },
  privateKey: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export default mongoose.model("Wallet", walletSchema);
