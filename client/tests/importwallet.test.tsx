import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import ImportWallet from '../src/components/ImportWallet';

describe('ImportWallet Component', () => {
  const mockSetMnemonic = vi.fn();
  const mockSetPrivateKey = vi.fn();
  const mockImportWalletFromMnemonic = vi.fn();
  const mockImportWalletFromPrivateKey = vi.fn();

  const props = {
    mnemonic: '',
    setMnemonic: mockSetMnemonic,
    privateKey: '',
    setPrivateKey: mockSetPrivateKey,
    importWalletFromMnemonic: mockImportWalletFromMnemonic,
    importWalletFromPrivateKey: mockImportWalletFromPrivateKey,
    importMessage: '',
    address: '',
  };

  it('renders correctly', () => {
    render(<ImportWallet {...props} />);
    expect(screen.getByPlaceholderText('Mnemonic')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Private Key')).toBeInTheDocument();
  });

  it('calls setMnemonic on mnemonic input change', () => {
    render(<ImportWallet {...props} />);
    const mnemonicInput = screen.getByPlaceholderText('Mnemonic');

    fireEvent.change(mnemonicInput, { target: { value: 'lol testing' } });
    expect(mockSetMnemonic).toHaveBeenCalledWith('lol testing');
  });

  it('calls importWalletFromMnemonic on button click', () => {
    render(<ImportWallet {...props} />);
    const button = screen.getByText('Import from Mnemonic');

    fireEvent.click(button);
    expect(mockImportWalletFromMnemonic).toHaveBeenCalledWith('');
  });

  it('calls setPrivateKey on PK input change', () => {
    render(<ImportWallet {...props} />);
    const pkInput = screen.getByPlaceholderText('Private Key');

    fireEvent.change(pkInput, { target: { value: 'lol testing1' } });
    expect(mockSetPrivateKey).toHaveBeenCalledWith('lol testing1');
  });

  it('calls importWalletFromPrivateKey on button click', () => {
    render(<ImportWallet {...props} />);
    const button = screen.getByText('Import from Private Key');

    fireEvent.click(button);
    expect(mockImportWalletFromPrivateKey).toHaveBeenCalledWith('');
  });

});
