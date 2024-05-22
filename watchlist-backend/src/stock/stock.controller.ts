import { Controller, Get, UseInterceptors, ClassSerializerInterceptor, UsePipes, ValidationPipe, UseGuards, Query, Body, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { JwtAuthGuard } from '../guard/jwt-auth-guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UpdateStockDto } from './dto/update-stock.dto';
import { IStock } from '../utils/interfaces';

@Controller('stock')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(ValidationPipe)

export class StockController {
  constructor(
    private readonly stockService: StockService,
  ) { }


  @Get('by-symbol')
  @UseGuards(JwtAuthGuard)
  async getStockBySymbol(
    @Query('symbol') symbol?: string): Promise<IStock> {
    const data = await this.stockService.getBySymbol(symbol)
    return data;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getStocks(@CurrentUser() user): Promise<IStock[]> {
    return await this.stockService.getByUserId(user?._id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrupdate(@CurrentUser() user, @Body() updateStock: UpdateStockDto): Promise<any> {
    const data = await this.stockService.createOrupdate(user?._id, updateStock)
    return data
  }
}