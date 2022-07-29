import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { BullModule } from '@nestjs/bull';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_URL || 'localhost',
          port: parseInt(process.env.REDIS_PORT) || 6379,
        },
      },
    ]),
    BullModule.registerQueue({
      name: 'orders',
      redis: {
        host: process.env.REDIS_URL || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
