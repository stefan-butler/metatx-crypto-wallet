import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import TransferFunds from '../../src/components/TransferFunds';

describe('ImportWallet Component', () => {
  const mockSetAddress = vi.fn();
  const mockSetBalance = vi.fn();
  const mockSetRecipient = vi.fn();
  const mockCheckBalance = vi.fn(); // idk how to test it cuz its not used in transferfunds for some reason
  const mockTransferFunds = vi.fn();
  const mockSetAmount = vi.fn();

  const props = {
    address: '',
    setAddress: mockSetAddress,
    balance: '',
    setBalance: mockSetBalance,
    checkBalance: mockCheckBalance,
    recipient: '',
    setRecipient: mockSetRecipient,
    amount: '',
    setAmount: mockSetAmount,
    transferFunds: mockTransferFunds,
    txHash: '',
  };

  it('renders correctly', () => {
    render(<TransferFunds {...props} />);
    expect(screen.getByPlaceholderText('Sender Address')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Recipient Address')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount (ETH)')).toBeInTheDocument();
  });

  it('calls setAddress on sender address input change', () => {
    render(<TransferFunds {...props} />);
    const senderInput = screen.getByPlaceholderText('Sender Address');

    fireEvent.change(senderInput, { target: { value: 'lol testing' } });
    expect(mockSetAddress).toHaveBeenCalledWith('lol testing');
  });

  it('calls setRecipient on Recipient Address input change', () => {
    render(<TransferFunds {...props} />);
    const recAddressInput = screen.getByPlaceholderText('Recipient Address');

    fireEvent.change(recAddressInput, { target: { value: 'lol testing1' } });
    expect(mockSetRecipient).toHaveBeenCalledWith('lol testing1');
  });

  it('calls setAmount on Amount input change', () => {
    render(<TransferFunds {...props} />);
    const amountInput = screen.getByPlaceholderText('Amount (ETH)');

    fireEvent.change(amountInput, { target: { value: 'lol testing1' } });
    expect(mockSetAmount).toHaveBeenCalledWith('lol testing1');
  });

  it('calls CheckBalance on button click', () => {
    render(<TransferFunds {...props} />);
    const button = screen.getByText('Check');

    fireEvent.click(button);
    expect(mockCheckBalance).toHaveBeenCalled();
  });

  it('calls transferFunds on button click', () => {
    render(<TransferFunds {...props} />);
    const button = screen.getByText('Send');

    fireEvent.click(button);
    expect(mockTransferFunds).toHaveBeenCalled();
  });
});
