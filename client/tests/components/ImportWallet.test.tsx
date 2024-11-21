import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import "@testing-library/jest-dom";
import ImportWallet from "../../src/components/ImportWallet";

describe("ImportWallet Component", () => {
  const mockSetMnemonic = vi.fn();
  const mockSetPrivateKey = vi.fn();
  const mockSetWalName = vi.fn();
  const mockImportWalletFromMnemonic = vi.fn();
  const mockImportWalletFromPrivateKey = vi.fn();

  const props = {
    mnemonic: "",
    setMnemonic: mockSetMnemonic,
    privateKey: "",
    setPrivateKey: mockSetPrivateKey,
    walName: "",
    setWalName: mockSetWalName,
    importWalletFromMnemonic: mockImportWalletFromMnemonic,
    importWalletFromPrivateKey: mockImportWalletFromPrivateKey,
    importMessage: "",
    address: "",
  };

  it("renders correctly with Mnemonic tab active", () => {
    render(<ImportWallet {...props} />);
    expect(screen.getByText("Import Wallet")).toBeInTheDocument();
    expect(screen.getByText("Mnemonic")).toBeInTheDocument();
    expect(screen.getByText("Private Key")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Wallet Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mnemonic")).toBeInTheDocument();
  });

  it("renders correctly with Private Key tab active", () => {
    render(<ImportWallet {...props} />);
    fireEvent.click(screen.getByText("Private Key"));
    expect(screen.getByPlaceholderText("Wallet Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Private Key")).toBeInTheDocument();
  });

  it("calls setWalName on Wallet Name input change", () => {
    render(<ImportWallet {...props} />);
    const walletNameInput = screen.getByPlaceholderText("Wallet Name");
    fireEvent.change(walletNameInput, { target: { value: "Test Wallet" } });
    expect(mockSetWalName).toHaveBeenCalledWith("Test Wallet");
  });

  it("calls setMnemonic on Mnemonic input change", () => {
    render(<ImportWallet {...props} />);
    const mnemonicInput = screen.getByPlaceholderText("Mnemonic");
    fireEvent.change(mnemonicInput, { target: { value: "test mnemonic" } });
    expect(mockSetMnemonic).toHaveBeenCalledWith("test mnemonic");
  });

  it("disables Import from Mnemonic button if inputs are invalid", () => {
    render(<ImportWallet {...props} />);
    const importButton = screen.getByText("Import from Mnemonic");
    expect(importButton).toBeDisabled();
  });

  it("calls importWalletFromMnemonic on Import button click when inputs are valid", () => {
    render(<ImportWallet {...props} walName="Test Wallet" mnemonic="test mnemonic" />);
    const importButton = screen.getByText("Import from Mnemonic");
    fireEvent.click(importButton);
    expect(mockImportWalletFromMnemonic).toHaveBeenCalledWith("test mnemonic");
  });

  it("calls setPrivateKey on Private Key input change", () => {
    render(<ImportWallet {...props} />);
    fireEvent.click(screen.getByText("Private Key"));
    const privateKeyInput = screen.getByPlaceholderText("Private Key");
    fireEvent.change(privateKeyInput, { target: { value: "test private key" } });
    expect(mockSetPrivateKey).toHaveBeenCalledWith("test private key");
  });

  it("disables Import from Private Key button if inputs are invalid", () => {
    render(<ImportWallet {...props} />);
    fireEvent.click(screen.getByText("Private Key"));
    const importButton = screen.getByText("Import from Private Key");
    expect(importButton).toBeDisabled();
  });

  it("calls importWalletFromPrivateKey on Import button click when inputs are valid", () => {
    render(
      <ImportWallet
        {...props}
        walName="Test Wallet"
        privateKey="test private key"
      />
    );
    fireEvent.click(screen.getByText("Private Key"));
    const importButton = screen.getByText("Import from Private Key");
    fireEvent.click(importButton);
    expect(mockImportWalletFromPrivateKey).toHaveBeenCalledWith("test private key");
  });

  it("displays importMessage and address when provided", () => {
    render(
      <ImportWallet
        {...props}
        importMessage="Import Successful!"
        address="0x1234"
      />
    );
    expect(screen.getByText("Import Successful!")).toBeInTheDocument();
    expect(screen.getByText("Your Wallet Address:")).toBeInTheDocument();
    expect(screen.getByText("0x1234")).toBeInTheDocument();
  });
});