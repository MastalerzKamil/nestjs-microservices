import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    // BullModule.registerQueue({
    //   name: 'products',
    //   redis: {
    //     host: process.env.REDIS_URL || 'localhost',
    //     port: parseInt(process.env.REDIS_PORT) || 6379,
    //   },
    // }),
    // ClientsModule.registerAsync([
    //   {
    //     name: 'PRODUCTS',
    //     imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) => ({
    //       transport: Transport.REDIS,
    //       options: {
    //         host: configService.get<string>('REDIS_URL'),
    //         port: +configService.get<number>('REDIS_PORT'),
    //       },
    //     }),
    //     inject: [ConfigService],
    //   },
    // ]),
    ClientsModule.register([
      {
        name: 'PRODUCTS',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
