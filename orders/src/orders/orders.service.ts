import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from './schemas/order.schema';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDao } from './dao/order.dao';
import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Injectable()
@Processor('orders')
export class OrdersService {
  constructor(
    @InjectQueue('orders') private readonly ordersQueue: Queue,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  @Process('createBulk')
  async createOrdersBulk(job: Job<unknown>) {
    console.info(`start process ${job.name}`);
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
      console.info(`Page ${page} upserted`);
    }
    console.info(`Process ${job.name} completed`);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing fetching orders in  job ${job.id} of type ${job.name}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(
      `Fetching orders with Job ${job.id} of type ${job.name} completed`,
    );
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
