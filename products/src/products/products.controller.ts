import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/best-sellers')
  async getBestSellers() {
    return await this.productsService.getBestSellers();
  }
}
