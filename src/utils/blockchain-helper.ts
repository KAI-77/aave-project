import {ethers, formatUnits} from "ethers";
import dotenv from "dotenv";

dotenv.config();

// Define the Application Binary Interface for the AAVE Contract
const AAVE_POOL_ABI= [
    "function getUserAccountData(address user) external view returns (uint256 totalCollateralBase, uint256 totalDebtBase, uint256 availableBorrowsBase, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)"

]

export class BlockchainHelper {
    private provider: ethers.JsonRpcProvider;
    private aavePoolContract: ethers.Contract;

    constructor(INFURA_PROJECT_ID: string) {

        // Setting up an Ethereum provider that connects to the blockchain via Infura
        const providerUrl = `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
        this.provider = new ethers.JsonRpcProvider(providerUrl);

        // Initialize the AAVE contract instance
        this.aavePoolContract = new ethers.Contract(
            process.env.AAVE_V3_POOL_ADDRESS as string,
            AAVE_POOL_ABI,
            this.provider
        )

    }
    // Fetch AAVE positions for a given wallet address
    async getAavePositions(walletAddress: string) {
        try {
            // Check if the wallet address is valid
            if (!ethers.isAddress(walletAddress)) {
                throw new Error('Invalid Ethereum address');
            }

            // Call the AAVE smart contract to get the account data
            const accountData = await this.aavePoolContract.getUserAccountData(walletAddress);
            return {
                collateral_positions: [
                    {
                        asset: 'Aggregate Collateral',
                        amount: ethers.formatUnits(accountData.totalCollateralBase, 18),

                    }
                ],
                borrowing_positions: [
                    {
                        asset: 'Aggregate Debts',
                        amount: ethers.formatUnits(accountData.totalDebtBase, 18),

                    }
                ],
                available_borrows: ethers.formatUnits(accountData.availableBorrowsBase, 18),
                current_liquidation_threshold: (Number(accountData.currentLiquidationThreshold) / 100).toFixed(2),
                ltv: (Number(accountData.ltv) / 100).toFixed(2),
                health_factor: Number(ethers.formatUnits(accountData.healthFactor, 18)).toFixed(2)
            }
        }
        catch (error) {
            console.error('Error fetching AAVE positions', error);
            throw new Error('Failed to fetch AAVE positions.');
        }
    }

}