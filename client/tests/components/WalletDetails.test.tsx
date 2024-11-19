import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WalletDetails from '../../src/components/WalletDetails';

const mockSendMessage = vi.fn();

beforeAll(() => {
  Object.defineProperty(window, 'chrome', {
    value: {
      runtime: {
        sendMessage: mockSendMessage,
        lastError: null,
      },
    },
  });
});

describe('WalletDetails Component', () => {
  const walletMock = {
    name: 'My Wallet',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    mnemonic: 'test',
    privateKey:
      '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  };

  beforeEach(() => {
    mockSendMessage.mockReset();
  });

  it('renders wallet details correctly', () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/details',
            state: { wallet: walletMock },
          },
        ]}
      >
        <Routes>
          <Route path="/details" element={<WalletDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Wallet Details')).toBeTruthy();
    expect(screen.getByText('Wallet Name')).toBeTruthy();
    expect(screen.getByText(walletMock.name)).toBeTruthy();
    expect(screen.getByText('Address')).toBeTruthy();
    expect(screen.getByText(walletMock.address)).toBeTruthy();
    expect(screen.getByText('Mnemonic')).toBeTruthy();
    expect(screen.getByText(walletMock.mnemonic)).toBeTruthy();
    expect(screen.getByText('Private Key')).toBeTruthy();
    expect(screen.getByText(walletMock.privateKey)).toBeTruthy();
    expect(screen.getByText('Go Back')).toBeTruthy();
  });

  it('fetches and displays wallet balance', async () => {
    mockSendMessage.mockImplementation((message, callback) => {
      callback({ balance: '123.456789' });
    });

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/details',
            state: { wallet: walletMock },
          },
        ]}
      >
        <Routes>
          <Route path="/details" element={<WalletDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith(
        { type: 'CHECK_BALANCE', address: walletMock.address },
        expect.any(Function)
      );
    });

    await waitFor(() => {
      expect(screen.getByText('123.4568 ETH')).toBeTruthy();
    });
  });

  it('handles runtime error gracefully', async () => {
    window.chrome.runtime.lastError = { message: 'Some runtime error' };

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/details',
            state: { wallet: walletMock },
          },
        ]}
      >
        <Routes>
          <Route path="/details" element={<WalletDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalled();
    });

    expect(screen.queryByText('ETH')).not.toBeTruthy();
  });

  it('handles invalid response gracefully', async () => {
    mockSendMessage.mockImplementation((message, callback) => {
      callback({ error: 'Invalid address' });
    });

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/details',
            state: { wallet: walletMock },
          },
        ]}
      >
        <Routes>
          <Route path="/details" element={<WalletDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalled();
    });

    expect(screen.queryByText('ETH')).not.toBeTruthy();
  });
});
