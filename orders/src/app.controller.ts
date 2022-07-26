import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @MessagePattern({ cmd: 'health' })
  getHealthCheck(): boolean {
    return this.appService.getHealthCheck();
  }

  @Get('/orders')
  @MessagePattern({ cmd: 'getOrders' })
  async getOrders() {
    return await this.appService.getOrders();
  }

  @Post('/orders/bulk')
  @MessagePattern({ cmd: 'createOrdersBulk' })
  async createOrdersBulk() {
    try {
      await this.appService.createOrdersBulk();
      return { success: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
