import {ethers, formatUnits} from "ethers";
import dotenv from "dotenv";

dotenv.config();

const AAVE_POOL_ABI= [
    "function getUserAccountData(address user) external view returns (uint256 totalCollateralBase, uint256 totalDebtBase, uint256 availableBorrowsBase, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)"

]

export class BlockchainHelper {
    private provider: ethers.providers.JsonRpcProvider;
    private aavePoolContract: ethers.Contract;

    constructor(INFURA_PROJECT_ID: string) {
        const providerUrl = `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
        this.provider = new ethers.providers.JsonRpcProvider(providerUrl);

        this.aavePoolContract = new ethers.Contract(
            process.env.AAVE_V3_POOL_ADDRESS as string,
            AAVE_POOL_ABI,
            this.provider
        )

    }

    async getAavePositions(walletAddress: string) {
        try {
            const accountData = await this.aavePoolContract.getUserAccountData(walletAddress);
            return {
                collateral_positions: [
                    {
                        asset: 'Total Collateral',
                        amount: ethers.formatUnits(accountData.totalCollateralBase, 18),
                        usdValue: ethers.formatUnits(accountData.totalCollateralBase, 18)
                    }
                ],
                borrowing_positions: [
                    {
                        asset: 'Total Debts',
                        amount: ethers.formatUnits(accountData.totalCollateralBase, 18),
                        usdValue: ethers.formatUnits(accountData.totalCollateralBase, 18)
                    }
                ]
            }
        }
        catch (error) {
            console.error('Error fetching AAVE positions', error);
            throw new Error('Failed to fetch AAVE positions.');
        }
    }

}