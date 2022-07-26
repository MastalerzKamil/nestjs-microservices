import { Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/health')
  async getHealthCheck(): Promise<any> {
    return await this.ordersService.getHealthCheck();
  }

  @Get()
  async getOrders(): Promise<any> {
    return await this.ordersService.getOrders();
  }

  @Post('/bulk')
  async createBulk(): Promise<any> {
    return await this.ordersService.createBulk();
  }
}
