import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from './schemas/order.schema';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDao } from './dao/order.dao';

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
    console.info(`Page ${page} fetched`);

    if (ordersResponse.data.length === 0) {
      return;
    }
    ++page;

    const mappedOrders: Order[] = this.mapOrder(ordersResponse.data);

    await this.bulkUpsert(mappedOrders);
    ordersResponse = await OrdersService.getOrdersFromApi(page);

    while (ordersResponse.data.length !== 0) {
      ordersResponse = await OrdersService.getOrdersFromApi(page);
      console.info(`Page ${page} fetched`);
      ++page;
      const mappedOrders: Order[] = this.mapOrder(ordersResponse.data);
      await this.bulkUpsert(mappedOrders);
    }
  }

  private async bulkUpsert(orders: Order[]) {
    const ordersToUpsert = orders.map((order) => ({
      updateMany: {
        filter: { orderId: order.orderId, productName: order.productName },
        upsert: true,
        update: order,
      },
    }));
    await this.orderModel.bulkWrite(ordersToUpsert);
  }

  private static async getOrdersFromApi(page: number) {
    return await axios.get(
      `https://recruitment-api.dev.flipfit.io/orders?_page=${page}&_limit=10000`,
    );
  }

  private mapOrder(ordersSource: OrderDao[]): Order[] {
    const mappedOrders = ordersSource.map((order) => {
      return order.items.map((item) => ({
        productName: item.product.name,
        productPrice: item.product.price,
        quantity: item.quantity,
        transactionDate: order.date,
        orderId: order.id,
      }));
    });

    const concatenatedOrders: Order[] = [].concat(...mappedOrders);
    console.info(`${concatenatedOrders.length} orders upload`);
    return concatenatedOrders;
  }
}
