import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Customer } from './customer.schema';
import { Product } from './product.schema';

export const customerSchemaToken = 'Customer';

export type CustomerDocument = Customer & Document;

@Schema()
export class Item {
  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  product: Product;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
