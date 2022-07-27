import { ProductDao } from './product.dao';

export type ItemDao = {
  quantity: number;
  product: ProductDao;
};
