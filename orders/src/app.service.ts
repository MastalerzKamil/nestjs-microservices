import { Injectable } from '@nestjs/common';
<<<<<<< HEAD

@Injectable()
export class AppService {
  getHealthCheck(): boolean {
    return true;
  }
=======
import { ElasticsearchService } from '@nestjs/elasticsearch';
import axios from 'axios';
import IOrder from './interfaces/order.interface';
import { ordersIndex } from './indexes/order.index';

@Injectable()
export class AppService {
  constructor(private readonly elasticSearchService: ElasticsearchService) {}

  getHealthCheck(): boolean {
    return true;
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
    ordersResponse = await AppService.getOrdersFromApi(page);

    while (ordersResponse.data.length !== 0) {
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

    await this.elasticSearchService.bulk({
      refresh: true,
      operations: bulkOperations,
    });
  }

  private static async getOrdersFromApi(page: number) {
    return await axios.get(
      `https://recruitment-api.dev.flipfit.io/orders?_page=${page}&_limit=20001`,
    );
  }
>>>>>>> 70dc96528d7e7511f4a45a7a602bcf3407522480
}
