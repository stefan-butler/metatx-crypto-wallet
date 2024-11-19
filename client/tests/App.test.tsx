import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../src/App';

vi.mock('./icons/MetaTx-text', () => ({
  default: () => <div>MetaTx Text</div>,
}));

vi.mock('ethers', () => ({
  ethers: {
    providers: {
      InfuraProvider: vi.fn(() => ({})),
    },
    Wallet: {
      createRandom: vi.fn(() => ({
        mnemonic: { phrase: 'test mnemonic' },
        privateKey: 'test private key',
        address: 'test address',
      })),
      fromMnemonic: vi.fn(() => ({
        connect: () => ({
          address: 'test address',
          mnemonic: { phrase: 'test mnemonic' },
          privateKey: 'test private key',
        }),
      })),
    },
  },
}));

vi.stubGlobal('chrome', {
  runtime: {
    sendMessage: vi.fn((message, callback) => {
      if (message.type === 'CHECK_BALANCE') {
        callback({ balance: '0.1234' });
      } else if (message.type === 'TRANSFER_FUNDS') {
        callback({ message: 'Transfer successful!', txHash: '0x123abc' });
      }
    }),
  },
});

describe('App Component', () => {
  it('renders header elements', () => {
    render(<App />);
    const logo = screen.getByAltText('MetaTx Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<App />);
    expect(screen.getByText('GENERATE')).toBeInTheDocument();
    expect(screen.getByText('IMPORT')).toBeInTheDocument();
    expect(screen.getByText('WALLETS')).toBeInTheDocument();
    expect(screen.getByText('TRANSFER')).toBeInTheDocument();
  });

  it('handles wallet generation state', () => {
    render(<App />);
    const generateLink = screen.getByText('GENERATE');
    fireEvent.click(generateLink);
    expect(screen.getByText('Generate')).toBeInTheDocument();
  });

  it('handles import wallet state', () => {
    render(<App />);
    const importLink = screen.getByText('IMPORT');
    fireEvent.click(importLink);
    expect(screen.getByText(/Import from Mnemonic/i)).toBeInTheDocument();
    expect(screen.getByText(/Import from Private Key/i)).toBeInTheDocument();
  });

  it('handles transfer state', () => {
    render(<App />);
    const transferLink = screen.getByText('TRANSFER');
    fireEvent.click(transferLink);
    expect(screen.getByText('BALANCE')).toBeInTheDocument();
    expect(screen.getByText('Check')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });
});
