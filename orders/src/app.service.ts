import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import axios from 'axios';
import IOrder from './interfaces/order.interface';
import { ordersIndex } from './indexes/order.index';

@Injectable()
export class AppService {
  constructor(private readonly elasticSearchService: ElasticsearchService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getOrders() {
    const orders = await this.elasticSearchService.search({
      index: 'orders',
      body: {
        query: {
          match_all: {},
        },
      },
    });
    return orders.hits.hits;
  }

  async createOrdersBulk() {
    await this.createIndexOrders();
    let page = 1;
    let ordersResponse = await AppService.getOrdersFromApi(page);

    if (ordersResponse.data.length === 0) {
      return;
    }
    ++page;

    await this.bulkUpsert(ordersResponse.data);

    while (ordersResponse.data.length !== []) {
      ordersResponse = await AppService.getOrdersFromApi(page);
      ++page;
      await this.bulkUpsert(ordersResponse.data);
    }
  }

  private async createIndexOrders() {
    const indicesExists = await this.elasticSearchService.indices.exists({
      index: 'orders',
    });

    if (indicesExists) {
      return;
    }
    return await this.elasticSearchService.indices.create({
      index: 'orders',
      mappings: {
        properties: {
          id: { type: 'text' },
          date: { type: 'date', format: 'date_time' },
          customer: {
            type: 'nested',
            properties: {
              id: { type: 'text' },
              name: { type: 'text' },
            },
          },
          items: {
            type: 'nested',
            properties: {
              product: {
                type: 'nested',
                properties: {
                  id: { type: 'text' },
                  name: { type: 'text' },
                  price: { type: 'float' },
                },
              },
              quantity: { type: 'integer' },
            },
          },
        },
      },
    });
  }

  private async bulkUpsert(orders: IOrder[]) {
    const bulkOperations = [];

    orders.map((order) => {
      bulkOperations.push({
        index: {
          _index: ordersIndex._index,
          _id: order.id,
        },
      });
      bulkOperations.push(order);
    });

    const result = await this.elasticSearchService.bulk({
      refresh: true,
      body: bulkOperations,
    });
    console.log(result);
  }

  private static async getOrdersFromApi(page: number) {
    return await axios.get(
      `https://recruitment-api.dev.flipfit.io/orders?_page=${page}&_limit=1000`,
    );
  }
}
