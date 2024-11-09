const { ethers } = require('ethers');
require('dotenv').config();

// 使用 Infura Provider 连接到 Sepolia 网络
const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_PROJECT_ID);

async function checkConnection() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log("Connected to Sepolia network. Latest block number:", blockNumber);
    } catch (error) {
        console.error("Failed to connect to Sepolia network:", error);
    }
}

checkConnection();
