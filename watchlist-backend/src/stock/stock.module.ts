import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { Stock, StockSchema } from './entitites/stock.entity';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';

@Module(
  {
    imports: [
      MongooseModule.forFeature([
        {
          name: Stock.name,
          schema: StockSchema,
        },]),
      AuthModule
    ],
    controllers: [StockController],
    providers: [StockService],
    exports: [StockService]
  }
)
export class StockModule { }
