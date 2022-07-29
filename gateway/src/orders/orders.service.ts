import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS') private readonly ordersClient: ClientProxy,
    @InjectQueue('orders') private readonly ordersQueue: Queue,
  ) {}

  async getHealthCheck(): Promise<any> {
    return this.ordersClient.send('health', {});
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async createBulk(): Promise<void> {
    await this.ordersQueue.add('createBulk', {
      jobName: 'createBulk',
    });
  }
}
