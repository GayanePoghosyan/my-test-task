import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema({
    timestamps: true,
})
export class Stock {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: [String] })
    symbols: string[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);