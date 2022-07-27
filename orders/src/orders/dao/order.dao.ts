import { CustomerDao } from './customer.dao';
import { ItemDao } from './items.dao';

export type OrderDao = {
  id: string;
  date: Date;
  customer: CustomerDao;
  items: ItemDao[];
};
