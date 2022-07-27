import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DBConnections } from './config/db-connections';
import { OrdersModule } from './orders/orders.module';
=======
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
>>>>>>> 70dc96528d7e7511f4a45a7a602bcf3407522480

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
<<<<<<< HEAD
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('ORDERS_DB_URI'),
      }),
    }),
    OrdersModule,
=======
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_URL'),
        // auth: {
        //   username: configService.get('ELASTICSEARCH_USERNAME'),
        //   password: configService.get('ELASTICSEARCH_PASSWORD'),
        // },
      }),
      inject: [ConfigService],
    }),
>>>>>>> 70dc96528d7e7511f4a45a7a602bcf3407522480
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
