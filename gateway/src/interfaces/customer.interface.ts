import IItem from './item.interface';

export default interface ICustomer {
  id: string;
  name: string;
  items: IItem[];
}
