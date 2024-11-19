import request from "supertest";
import app from "../../src/app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { describe, beforeAll, it, afterAll, expect } from "@jest/globals";

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

describe("Wallet API Tests", () => {
  it("should fetch all wallets", async () => {
    const response = await request(app).get("/wallets");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("should create a new wallet", async () => {
    const wallet = {
      mnemonic: "example mnemonic",
      privateKey: "private-key-123",
      address: "address-123",
      name: "Test Wallet",
    };
    const response = await request(app)
      .post("/generate")
      .send(wallet)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.text).toBe("wallet created");
  });
  it("should delete a wallet", async () => {
    const response = await request(app)
      .delete("/delete")
      .send({ address: "address-123" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.text).toBe("deleted");
  });
  it("should return error if the wallet doesnt have address", async () => {
    const response = await request(app)
      .post("/generate")
      .send({
        mnemonic: "test mnemonic",
        privateKey: "private",
        name: "Wallet error",
      })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(500);
  });
});
