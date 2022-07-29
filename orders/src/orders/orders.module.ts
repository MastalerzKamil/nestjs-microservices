import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orders',
      redis: {
        host: process.env.REDIS_URL,
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'ORDERS',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('REDIS_URL'),
            port: +configService.get<number>('REDIS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
