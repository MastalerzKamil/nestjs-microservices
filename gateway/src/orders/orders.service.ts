import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS') private readonly ordersClient: ClientProxy,
    @InjectQueue('orders') private readonly ordersQueue: Queue,
  ) {}

  async getHealthCheck(): Promise<any> {
    return this.ordersClient.send({ cmd: 'health' }, {});
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async createBulk(): Promise<void> {
    await this.ordersQueue.add('createBulk', {
      jobName: 'createBulk',
    });
  }
}
