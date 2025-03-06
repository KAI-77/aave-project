
export interface AavePosition {
    collateral_positions: CollateralPosition[];
    borrowing_positions: BorrowingPosition[];
    available_borrows: string;
    current_liquidation_threshold: string;
    ltv: string;
    health_factor: string;
}


export interface CollateralPosition {
    asset: string;
    amount: string;

}

export interface BorrowingPosition {
    asset: string;
    amount: string;

}