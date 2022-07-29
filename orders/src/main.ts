import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: `${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
