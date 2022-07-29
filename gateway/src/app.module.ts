import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsModule } from './products/products.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'ORDERS',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_URL || 'localhost',
          port: parseInt(process.env.REDIS_PORT) || 6379,
        },
      },
      {
        name: 'PRODUCTS',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_URL || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    ScheduleModule.forRoot(),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
