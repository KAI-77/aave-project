import {BlockchainHelper} from "../utils/blockchain-helper";


interface AavePositionParams {
    walletAddress: string; // Ethereum wallet address passed as an argument
}

export const createResolvers = (INFURA_PROJECT_ID: string) => {

    // Initialize blockchain helper to interact with AAVE

    const blockchainHelper = new BlockchainHelper(INFURA_PROJECT_ID);

    return {
        Query: {

            /**
             * Resolver function for fetching AAVE positions
             * @param _ - Unused parent object
             * @param {walletAddress} - Wallet address passed as an argument
             * @returns Collateral and borrowing positions from AAVE
             */

            getAavePositions: async (_: unknown, { walletAddress } : AavePositionParams) => {

                try {
                    // Fetch positions using BlockchainHelper
                    return await blockchainHelper.getAavePositions(walletAddress);
                } catch (error) {
                    console.error("Error in getAavePositions resolver:", error);
                    throw new Error("Failed to fetch AAVE positions.");
                }
            }
        }
    }

}