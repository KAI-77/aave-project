import dotenv from 'dotenv';
import { ethers } from 'ethers';

dotenv.config();

export const createInfuraProvider = () => {
    const provider = `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
    return new ethers.providers.JsonRpcProvider(provider);
}