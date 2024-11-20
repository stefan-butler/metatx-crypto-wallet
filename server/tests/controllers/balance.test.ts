import request from 'supertest';
import app from '../../src/app';
import { ethers, TransactionResponse } from 'ethers';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { describe, beforeAll, it, afterAll, expect, jest } from '@jest/globals';

// Mock the ethers package
jest.mock('ethers', () => {
  // jest.requireActual imports the real ethers module
  const originalModule = jest.requireActual<typeof ethers>('ethers');

  // Return a modified version of ethers with mocked methods
  return {
    ...originalModule,
    InfuraProvider: jest.fn().mockImplementation(() => ({
      getBalance: jest.fn<() => Promise<any>>().mockResolvedValue(ethers.ZeroAddress),
      sendTransaction: jest.fn<() => Promise<any>>().mockResolvedValue({
        hash: '0x123',
        wait: jest.fn(),
      }),
    })),
    formatEther: jest.fn(() => '0.0'), // Format zero balance for testing
  };
});

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Transfer Balance Controller', () => {
  it('should successfully transfer balance even if balance is zero (mocked)', async () => {
    const response = await request(app)
      .post('/transfer')
      .send({
        recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        amount: '0.01',
      });

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Transfer successful!');
    expect(response.body.txHash).toBe('0x123');
  }, 30000);

  it('should handle transfer failure', async () => {
    const response = await request(app)
      .post('/transfer')
      .send({
        recipient: '0xInvalidAddress',
        amount: '0.01',
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Transfer failed');
  });
});

describe('Fetch Balance Controller', () => {
  it('should fetch the correct balance', async () => {
    const response = await request(app)
      .get('/balance')
      .query({ address: '0x1234567890abcdef1234567890abcdef12345678' });
    expect(response.status).toBe(200);
    expect(typeof response.body.balance).toBe('string');
  });

  it('should handle errors gracefully', async () => {
    const response = await request(app)
      .get('/balance')
      .query({ address: 'invalid-adress' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error fetching balance');
    expect(response.body).toHaveProperty('error');
    expect(typeof response.body.error).toBe('string');
  });
});