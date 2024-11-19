import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Wallets from "../src/components/Wallets";
import type { Mock } from "vitest";
import { getWallets, deleteWallet } from "../src/services/walletService";

vi.mock("../src/services/walletService", () => ({
  getWallets: vi.fn(),
  deleteWallet: vi.fn(),
}));

const mockWallets = [
  { name: "Wallet 1", address: "0x1234567890abcdef1234567890abcdef12345678" },
  { name: "Wallet 2", address: "0xabcdef1234567890abcdef1234567890abcdef12" },
];

describe("Wallets Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state initially", async () => {
    (getWallets as Mock).mockResolvedValue(null);

    render(
      <MemoryRouter>
        <Wallets />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading wallets...")).toBeTruthy();
  });

  it("displays empty state when no wallets are available", async () => {
    (getWallets as Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Wallets />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("You don’t have any wallets.")).toBeTruthy()
    );
  });

  it("renders wallets correctly", async () => {
    (getWallets as Mock).mockResolvedValue(mockWallets);

    render(
      <MemoryRouter>
        <Wallets />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Your Wallets")).toBeTruthy()
    );

    mockWallets.forEach((wallet) => {
      expect(screen.getByText(wallet.name)).toBeTruthy();
      expect(screen.getByText(wallet.address.slice(0, 30) + "...")).toBeTruthy();
    });
  });

  it("removes wallet on delete", async () => {
    (getWallets as Mock).mockResolvedValue(mockWallets);
    (deleteWallet as Mock).mockResolvedValue(true);

    render(
      <MemoryRouter>
        <Wallets />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Wallet 1")).toBeTruthy()
    );

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    await waitFor(() =>
      expect(screen.queryByText("Wallet 1")).not.toBeTruthy()
    );

    expect(deleteWallet).toHaveBeenCalledWith(
      "0x1234567890abcdef1234567890abcdef12345678"
    );
  });

  it("renders navigation links for each wallet", async () => {
    (getWallets as Mock).mockResolvedValue(mockWallets);

    render(
      <MemoryRouter>
        <Wallets />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Wallet 1")).toBeTruthy()
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockWallets.length);
  });
});
