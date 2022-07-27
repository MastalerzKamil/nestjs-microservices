import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Customer } from './customer.schema';
import { Item } from './item.schema';

export const orderSchemaToken = 'Order';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  customer: Customer;

  @Prop({ required: true })
  items: Item[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
