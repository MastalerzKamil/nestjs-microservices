import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BestSellersDto } from './dto/best-sellers.dto';
import { MostBoughtDto } from './dto/most-bought.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getBestSellers(): Promise<BestSellersDto[]> {
    const result = await this.orderModel.aggregate([
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

    return result.map((item) => ({
      name: item._id,
      totalSale: item.totalSale,
    }));
  }

  async getMostBought(): Promise<MostBoughtDto[]> {
    const result = await this.orderModel.aggregate([
      { $group: { _id: '$productName', totalProductTransaction: { $sum: 1 } } },
      { $sort: { totalProductTransaction: -1 } },
      { $limit: 10 },
    ]);

    return result.map((item) => ({
      name: item._id,
      totalProductTransaction: item.totalProductTransaction,
    }));
  }

  async getMostBoughtYesterday(date: Date): Promise<MostBoughtDto[]> {
    const result = await this.orderModel.aggregate([
      { $match: { transactionDate: { $lte: date } } },
      { $group: { _id: '$productName', totalProductTransaction: { $sum: 1 } } },
      { $sort: { totalProductTransaction: -1 } },
      { $limit: 10 },
    ]);

    return result.map((item) => ({
      name: item._id,
      totalProductTransaction: item.totalProductTransaction,
    }));
  }
}
