import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getWallets,
  createWallet,
  deleteWallet,
} from '../../src/services/walletService';
import { ImportedWallet } from '../../src/types';

describe('Wallet Service', () => {
  const mockWallet: ImportedWallet = {
    address: '0x123',
    mnemonic: 'test mnemonic',
    privateKey: 'test private key',
    name: 'Test Wallet',
  };

  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  it('gets all wallets', async () => {
    const mockResponse = [mockWallet];
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getWallets();

    expect(fetch).toHaveBeenCalledWith('http://localhost:5002/wallets');
    expect(result).toEqual(mockResponse);
  });

  it('creates a wallet', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    const result = await createWallet(mockWallet);

    expect(fetch).toHaveBeenCalledWith('http://localhost:5002/generate', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockWallet),
    });
    expect(result).toEqual({ success: true });
  });

  it('deletes a wallet', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    const result = await deleteWallet('0x123');

    expect(fetch).toHaveBeenCalledWith('http://localhost:5002/delete', {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: '0x123' }),
    });
    expect(result).toEqual({ success: true });
  });

  it('handles errors for getWallets', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    await getWallets();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.any(Error),
      'something went wrong'
    );
  });

  it('handles errors for createWallet', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    await createWallet(mockWallet);

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
  });

  it('handles errors for deleteWallet', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    await deleteWallet('0x123');

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
