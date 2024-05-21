
export interface Stock {
    currentPrice: number;
    change: number;
    changePercent: number;
    componyName: string;
    symbol: string;
    timestamp: number;
    logo?: string
}

export interface State {
    watchlist: Stock[];
    stock:Stock;
    error:string;
    loading:boolean
}
