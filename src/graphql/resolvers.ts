import {BlockchainHelper} from "../utils/blockchain-helper";
import {AavePosition} from "../types/aave";


interface AavePositionParams {
    walletAddress: string;
}

export const createResolvers = (INFURA_PROJECT_ID: string) => {
    const blockchainHelper = new BlockchainHelper(INFURA_PROJECT_ID);

    return {
        Query: {
            getAavePositions: async ({ walletAddress } : AavePositionParams) => {
                return await blockchainHelper.getAavePositions(walletAddress);
            }
        }
    }

}