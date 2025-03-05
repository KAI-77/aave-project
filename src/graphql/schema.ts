

export const typeDefs = `#graphql
    type CollateralPosition {
    asset: String!
    amount: String!
    usdValue: String!
    }
    
    type BorrowingPosition {
    asset: String!
    amount: String!
    usdValue: String!
    }
    
    type AavePosition {
    collateral_positions: [CollateralPosition!]!
    borrowing_positions: [BorrowingPosition!]!
    }
    
    type Query {
    getAavePositions(walletAddress: String!): AavePositions }
`;