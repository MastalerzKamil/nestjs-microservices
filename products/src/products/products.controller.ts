import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';
import { Order } from './schemas/order.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/best-sellers')
  @MessagePattern({ cmd: 'getBestSellers' })
  async getBestSellers(): Promise<Order[]> {
    return await this.productsService.getBestSellers();
  }

  @Get('/most-bought')
  @MessagePattern({ cmd: 'getMostBought' })
  async getMostBought(): Promise<Order[]> {
    return await this.productsService.getMostBought();
  }

  @Get('/most-bought/yesterday')
  @MessagePattern({ cmd: 'getMostBoughtYesterday' })
  async getMostBoughtYesterday(): Promise<Order[]> {
    const date = new Date(new Date().setDate(new Date().getDate() - 1));
    return await this.productsService.getMostBoughtYesterday(date);
  }
}
