import request from 'supertest';
import app from '../../src/app';
import { describe, beforeAll, it, afterAll, expect, jest } from '@jest/globals';
import { InfuraProvider, ethers, TransactionResponse } from 'ethers';

// fetchBalance

// transferBalance
jest.mock('ethers', () => {
  //jest.requireActual imports the real ethers module
  const originalModule = jest.requireActual<typeof ethers>('ethers');

  // in return replace InfuraProvider with a mocked version. 
  return {
    ...originalModule,
    InfuraProvider: jest.fn().mockImplementation(() => ({
      getBalance: jest.fn(),
      sendTransaction: jest.fn<() => Promise<any>>().mockResolvedValue({
        hash: '0x123',
        wait: jest.fn(),
      }), 
    })),
  };
});

describe('Transfer Balance Controller', ()=> {
  it('should successfully transfer balance', async() => {
    const response = await request(app)
      .post('/transfer')
      .send({
        recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        amount: '0.01'
      });
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Transfer successful!');
      expect(response.body.txHash).toBe('0x123');
  }, 30000);

  it('should handle transfer failure', async() => {
    const response = await request(app)
      .post('/transfer')
      .send({
        recipient: '0xInvalidAddress',
        amount: '0.01'
      })

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Transfer failed');
  })
});
