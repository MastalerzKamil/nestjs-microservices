import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  transactionDate: Date;

  @Prop({ required: true })
  productPrice: number;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
