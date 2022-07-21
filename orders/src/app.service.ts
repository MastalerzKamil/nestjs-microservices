import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import IOrder from './interfaces/order.interface';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly elasticSearchService: ElasticsearchService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async indexOrders() {
    const orders = await this.fetchOrdersFromApi();

    await this.elasticSearchService.bulk({
      index: 'orders',
      body: orders,
    });
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

  private async fetchOrdersFromApi(): Promise<IOrder[]> {
    const response = await axios.get(
      'https://recruitment-api.dev.flipfit.io/orders',
    );
    return response.data;
  }
}
