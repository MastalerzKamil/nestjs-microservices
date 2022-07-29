import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
}

bootstrap();
