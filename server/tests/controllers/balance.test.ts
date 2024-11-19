import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { describe, beforeAll, it, afterAll, expect, jest } from '@jest/globals';

jest.mock('ethers', () => {
  const originalModule: object = jest.requireActual('ethers');
  return {
    ...originalModule,
    InfuraProvider: jest.fn(() => ({
      getBalance: jest.fn().mockResolvedValue('1000000000000000000' as never),
    })),
    formatEther: jest.fn(() => '1.0'),
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
