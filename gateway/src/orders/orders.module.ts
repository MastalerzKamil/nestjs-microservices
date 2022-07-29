import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orders',
      redis: {
        host: process.env.REDIS_URL || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    // ClientsModule.register([
    //   {
    //     name: 'ORDERS',
    //     transport: Transport.REDIS,
    //     options: {
    //       port: 3001,
    //     },
    //   },
    // ]),
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
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
