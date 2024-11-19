import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import { describe, beforeAll, it, afterAll, expect, jest } from '@jest/globals';
import { InfuraProvider, ethers, TransactionResponse } from 'ethers';

describe('App', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should have CORS enabled', async () => {
    const response = await request(app)
      .options('/')
      .set('Origin', 'http://localhost:3000');

    expect(response.headers['access-control-allow-origin']).toBe(
      'http://localhost:3000'
    );
  });
});

// transferBalance
jest.mock('ethers', () => {
  //jest.requireActual imports the real ethers module
  const originalModule = jest.requireActual<typeof ethers>('ethers');

  // in return replace InfuraProvider with a mocked version. 
  return {
    ...originalModule,
    InfuraProvider: jest.fn().mockImplementation(() => ({
      getBalance: jest.fn(),
      sendTransaction: jest.fn().mockResolvedValue({
        hash: '0x123',
        wait: jest.fn(),
      } as never), 
    })),
  };
});
