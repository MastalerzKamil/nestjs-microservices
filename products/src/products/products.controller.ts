import { Controller, Get, HttpException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';
import { BestSellersDto } from './dto/best-sellers.dto';
import { MostBoughtDto } from './dto/most-bought.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/best-sellers')
  @MessagePattern({ cmd: 'getBestSellers' })
  async getBestSellers(): Promise<BestSellersDto[]> {
    try {
      const result = await this.productsService.getBestSellers();
      return result.map((item) => {
        return {
          name: item.name,
          totalSale: item.totalSale,
        };
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/most-bought')
  @MessagePattern({ cmd: 'getMostBought' })
  async getMostBought(): Promise<MostBoughtDto[]> {
    try {
      const result = await this.productsService.getMostBought();
      return result.map((item) => {
        return {
          name: item.name,
          totalProductTransaction: item.totalProductTransaction,
        };
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/most-bought/yesterday')
  @MessagePattern({ cmd: 'getMostBoughtYesterday' })
  async getMostBoughtYesterday(): Promise<MostBoughtDto[]> {
    try {
      const date = new Date(new Date().setDate(new Date().getDate() - 1));
      const result = await this.productsService.getMostBoughtYesterday(date);
      return result.map((item) => {
        return {
          name: item.name,
          totalProductTransaction: item.totalProductTransaction,
        };
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
