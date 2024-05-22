export interface IResponse{
    success: boolean;
    statusCode?: number;
    message?: string;
}

export const IResponseMessage = ( success?:boolean, message?: string, statusCode?: number): IResponse => ({
    success,
    statusCode,
    message
});

export interface  IStock {
    currentPrice: number;
    change: number;
    changePercent: number;
    componyName: string;
    symbol: string;
    timestamp: number;
    logo?:string
} 