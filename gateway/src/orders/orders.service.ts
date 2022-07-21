import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS') private readonly ordersClient: ClientProxy) {}

  async getOrders(): Promise<any> {
    return this.ordersClient.send({ cmd: 'getOrders' }, {});
  }

  async indexOrders(): Promise<any> {
    return this.ordersClient.send({ cmd: 'indexOrders' }, {});
  }
}
