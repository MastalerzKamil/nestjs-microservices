import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    OrdersModule,
    ClientsModule.register([
      {
        name: 'ORDERS',
        transport: Transport.TCP,
        options: {
          port: 3001,
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
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
