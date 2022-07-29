import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsModule } from './products/products.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_URL || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    ScheduleModule.forRoot(),
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
      {
        name: 'PRODUCTS',
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
    // ClientsModule.register([
    //   {
    //     name: 'ORDERS',
    //     transport: Transport.REDIS,
    //     options: {
    //       port: 3001,
    //     },
    //   },
    //   {
    //     name: 'PRODUCTS',
    //     transport: Transport.REDIS,
    //     options: {
    //       port: 3002,
    //     },
    //   },
    // ]),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
