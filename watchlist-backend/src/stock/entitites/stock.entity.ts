import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema({
    timestamps: true,
})
export class Stock {
    @Prop({ type: String, required: true })
    userId: ObjectId;

    @Prop({ type: [String] })
    symbols: string[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);