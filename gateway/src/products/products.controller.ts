import { Controller, Get, HttpException } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/health')
  async getHealthCheck() {
    return await this.productsService.getHealthCheck();
  }

  @Get('/best-sellers')
  async getBestSellers() {
    try {
      return await this.productsService.getBestSellers();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/most-bought')
  async getMostBought() {
    try {
      return await this.productsService.getMostBought();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/most-bought/yesterday')
  async getMostBoughtYesterday() {
    try {
      return await this.productsService.getMostBoughtYesterday();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
