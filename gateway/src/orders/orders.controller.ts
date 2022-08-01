import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('health')
  async getHealthCheck(): Promise<any> {
    return await this.ordersService.getHealthCheck();
  }

  @Post('/bulk')
  async createBulk(): Promise<any> {
    try {
      await this.ordersService.createBulk();
      return { success: true };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
