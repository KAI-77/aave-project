
export interface AavePosition {
    collateral_positions: CollateralPosition[];
    borrowing_positions: BorrowingPosition[];

}

export interface CollateralPosition {
    asset: string;
    amount: string;
    usdValue: string;
}

export interface BorrowingPosition {
    asset: string;
    amount: string;
    usdValue: string;
}