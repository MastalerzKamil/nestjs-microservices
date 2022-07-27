import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from './schemas/order.schema';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getOrders() {
    return [];
  }

  async createOrdersBulk() {
    let page = 1;
    let ordersResponse = await OrdersService.getOrdersFromApi(page);

    if (ordersResponse.data.length === 0) {
      return;
    }
    ++page;

    await this.bulkUpsert(ordersResponse.data);
    ordersResponse = await OrdersService.getOrdersFromApi(page);

    while (ordersResponse.data.length !== 0) {
      ordersResponse = await OrdersService.getOrdersFromApi(page);
      ++page;
      await this.bulkUpsert(ordersResponse.data);
    }
  }

  private async bulkUpsert(orders: Order[]) {
    const ordersToUpsert = orders.map((order) => ({
      updateMany: {
        filter: { id: order.id },
        upsert: true,
        update: order,
      },
    }));
    const bulkUpsertResult = await this.orderModel.bulkWrite(ordersToUpsert);
    console.log(bulkUpsertResult);
  }

  private static async getOrdersFromApi(page: number) {
    return await axios.get(
      `https://recruitment-api.dev.flipfit.io/orders?_page=${page}&_limit=20001`,
    );
  }
}
