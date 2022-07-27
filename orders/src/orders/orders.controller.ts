import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @MessagePattern({ cmd: 'getOrders' })
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Post('/bulk')
  @MessagePattern({ cmd: 'createOrdersBulk' })
  async createOrdersBulk() {
    try {
      await this.ordersService.createOrdersBulk();
      return { success: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
