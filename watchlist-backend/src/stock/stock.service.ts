import { Injectable, InternalServerErrorException, Logger, NotFoundException, } from '@nestjs/common';
import axios from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IStock } from '../utils/interfaces';
import { environments } from '../configuration/config';
import { Stock, StockDocument } from './schema/stock.schema';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
    private readonly logger = new Logger(StockService.name);
    constructor(@InjectModel(Stock.name) private readonly stockModel: Model<StockDocument>) { }

    private createStockObject = (data: any, symbol: string) => ({
        currentPrice: data.c,
        change: data.d,
        changePercent: data.dp,
        componyName: data.companyName || '',
        symbol: symbol,
        timestamp: data.t,
        logo: data.logo || ''
    })

    private create(userId: string, symbol: string): Promise<Stock> {
        const data = new this.stockModel({
            userId,
            symbols: [symbol]
        });
        return data.save()
    }

    async getBySymbol(symbol: string): Promise<IStock> {
        try {
            const response = await axios.get(environments.finnhubAPIUrl + '/quote', {
                params: {
                    symbol,
                    token: environments.apiSecretKey,
                },
            });
            const stockData = response.data;
            const stock: IStock = this.createStockObject(stockData, symbol)
            return stock;
        } catch (error) {
            this.logger.error(JSON.stringify(error))
            throw new InternalServerErrorException('Error fetching data from finnhub')
        }
    }

    async createOrupdate(userId: string, stockData: UpdateStockDto): Promise<any> {
        try {
            const { action, symbol } = stockData;

            let stock = await this.stockModel.findOne({ userId });

            if (stock) {
                const index = stock.symbols?.indexOf(symbol);

                if (action === 'delete' && index > -1) {
                    stock.symbols.splice(index, 1);
                } else if (action === 'add' && index === -1) {
                    stock.symbols.push(symbol);
                }
                const data = await this.stockModel.findByIdAndUpdate(stock?._id, stock);
                return data
            } else if (action === 'add') {
                this.create(userId, symbol);
            }
        } catch (error) {
            this.logger.error(JSON.stringify(error));
            throw new Error('Invalid action or no changes made')
        }
    }

    async getByUserId(userId: string): Promise<IStock[]> {
        try {
            const stock = await this.stockModel.findOne({ userId })
            if (stock) {
                const symbols = stock.symbols;
                const promises = symbols?.map(async (symbol: string) => {
                    const resp = await axios.get(environments.finnhubAPIUrl + '/quote', {
                        params: {
                            symbol,
                            token: environments.apiSecretKey,
                        },
                    })
                    const company = await axios.get(environments.finnhubAPIUrl + '/stock/profile2', {
                        params: {
                            symbol,
                            token: environments.apiSecretKey,
                        },
                    })

                    if (company?.data) {
                        resp.data.companyName = company?.data?.name;
                        resp.data.logo = company?.data?.logo
                    }
                    const stockObject = this.createStockObject(resp?.data, symbol)
                    return stockObject
                })
                return await Promise.all(promises);
            }
            return []
        }
        catch (error) {
            this.logger.error(JSON.stringify(error))
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error fetching data by userId')
        }
    }
}