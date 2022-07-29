import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS') private readonly productsClient: ClientProxy,
  ) {}

  async getHealthCheck(): Promise<any> {
    return this.productsClient.send({ cmd: 'health' }, {});
  }

  async getBestSellers(): Promise<any> {
    return this.productsClient.send({ cmd: 'getBestSellers' }, {});
  }

  async getMostBought(): Promise<any> {
    return this.productsClient.send({ cmd: 'getMostBought' }, {});
  }

  async getMostBoughtYesterday(): Promise<any> {
    return this.productsClient.send({ cmd: 'getMostBoughtYesterday' }, {});
  }
}
