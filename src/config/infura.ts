import dotenv from 'dotenv';
import { ethers } from 'ethers';

dotenv.config();

// Creates an Infura provider to interact with Ethereum

export const createInfuraProvider = () => {
    const provider = `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
    return new ethers.JsonRpcProvider(provider);
}