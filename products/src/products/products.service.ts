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
    return this.orderModel.aggregate([
      {
        $group: {
          _id: '$productName',
          totalSale: {
            $sum: {
              $toDecimal: {
                $multiply: ['$quantity', { $toDecimal: '$productPrice' }],
              },
            },
          },
        },
      },
      {
        $sort: { totalSale: -1 },
      },
      {
        $limit: 10,
      },
    ]);
  }

  async getMostBought(): Promise<OrderDocument[]> {
    return this.orderModel.aggregate([
      { $group: { _id: '$productName', totalProductTransaction: { $sum: 1 } } },
      { $sort: { totalProductTransaction: -1 } },
      { $limit: 10 },
    ]);
  }

  async getMostBoughtYesterday(date: Date): Promise<OrderDocument[]> {
    return this.orderModel.aggregate([
      { $match: { transactionDate: { $lte: date } } },
      { $group: { _id: '$productName', totalProductTransaction: { $sum: 1 } } },
      { $sort: { totalProductTransaction: -1 } },
      { $limit: 10 },
    ]);
  }
}
