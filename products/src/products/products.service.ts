import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getBestSellers(): Promise<OrderDocument[]> {
    return this.orderModel.find({}).limit(10);
  }
}
