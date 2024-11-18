import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the enviroment.');
}
const mongodbUri: string = process.env.MONGODB_URI;

const startServer = async () => {
  const PORT = process.env.PORT || 5002;

  try {
    await mongoose.connect(mongodbUri);
    console.log('MongoDB connected successfully');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
