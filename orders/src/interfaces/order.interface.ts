import ICustomer from './customer.interface';

export default interface IOrder {
  _id: string;
  date: Date;
  customer: ICustomer;
}
