import { autobind } from "core-decorators";

interface ItemDetail {
  name: string;
  price: number;
  count: number;
}

interface Items {
  [key: string]: ItemDetail;
}

@autobind
export default class ItemStore {
  items: Items = {};
  totalPrice: number = 0;

  addItem(item: ItemDetail) {
    this.items[item.name] = item;
    this.totalPrice += item.count * item.price;
  }

  deleteItem(item: ItemDetail) {
    this.totalPrice -=
      this.items[item.name].count * this.items[item.name].price;
    delete this.items[item.name];
  }

  changeCount(item: ItemDetail, count: number) {
    this.totalPrice +=
      (count - this.items[item.name].count) * this.items[item.name].price;
    this.items[item.name].count = count;
  }
}
