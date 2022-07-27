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
}
