import ICustomer from './customer.interface';

export default interface IOrder {
  id: string;
  date: Date;
  customer: ICustomer;
}
