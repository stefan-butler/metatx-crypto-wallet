import mongoose from 'mongoose';

const transactionLogSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  amount: { type: String, required: true },
  transactionHash: { type: String },
  status: { type: String, enum: ['success', 'failed'], required: true },
  errorMessage: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  name: { type: String }
});

const TransactionLog = mongoose.model('TransactionLog', transactionLogSchema);

export default TransactionLog;