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
<<<<<<< HEAD
=======

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
>>>>>>> 70dc96528d7e7511f4a45a7a602bcf3407522480
}
