import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GenerateWallet, { GenProps } from '../../src/components/GenerateWallet';
import '@testing-library/jest-dom';
import React from 'react';

describe('GenerateWallet Component', () => {
  const mockWalletInfo = {
    address: '0x123...abc',
    mnemonic: 'word1 word2 word3',
    privateKey: '0xprivate...key',
  };

  const defaultProps = {
    generateNewWallet: vi.fn(),
    generateMessage: '',
    newWalletInfo: null,
  };

  it('renders the component', () => {
    render(<GenerateWallet {...defaultProps} />);
    expect(screen.getByText('GENERATE')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Generate');
  });

  it('calls generateNewWallet onClick', () => {
    const generateNewWallet = vi.fn();
    render(
      <GenerateWallet {...defaultProps} generateNewWallet={generateNewWallet} />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(generateNewWallet).toHaveBeenCalledOnce();
  });
  it('displays wallet info when available', () => {
    render(<GenerateWallet {...defaultProps} generateMessage="Success!" />);

    expect(screen.getByText('New Wallet Generated!')).toBeInTheDocument();
    expect(screen.getByText('Your New Wallet is:')).toBeInTheDocument();
  });

  it('handles null wallet info', () => {
    render(<GenerateWallet {...defaultProps} />);

    const fields = [
      screen.getByTestId('address-field'),
      screen.getByTestId('mnemonic-field'),
      screen.getByTestId('private-key-field'),
    ];

    fields.forEach((field) => {
      expect(field.textContent).toBe('');
    });
  });
});
