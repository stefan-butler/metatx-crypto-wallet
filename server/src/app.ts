import express from 'express';
import router from './router';
import cors from 'cors';

const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

export default app;
