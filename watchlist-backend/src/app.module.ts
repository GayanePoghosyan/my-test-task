import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environments } from './configuration/config';
import { StockController } from './stock/stock.controller';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(environments.mongoUri, {autoIndex: false}),
    StockModule,
  ],
  controllers: [AppController, StockController],
  providers: [AppService],
})
export class AppModule { }
