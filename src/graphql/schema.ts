

export const typeDefs = `#graphql
    type CollateralPosition {
    asset: String!
    amount: String!
    }
    
    type BorrowingPosition {
    asset: String!
    amount: String!
    
    }
    
    type AavePosition {
    collateral_positions: [CollateralPosition!]!
    borrowing_positions: [BorrowingPosition!]!
    available_borrows: String!
    current_liquidation_threshold: String!
    ltv: String!
    health_factor: String!
    }
    
    type Query {
    getAavePositions(walletAddress: String!): AavePosition }
`;