import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('ORDERS') private readonly ordersClient: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }
}
