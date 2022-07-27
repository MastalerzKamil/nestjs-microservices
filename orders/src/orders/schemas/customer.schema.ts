import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const customerSchemaToken = 'Customer';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
