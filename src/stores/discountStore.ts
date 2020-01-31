import { autobind } from "core-decorators";
import RootStore from "./index";
import { Items } from "./itemStore";

export interface DiscountDetail {
  name: string;
  rate: number;
  isChecked: boolean;
  items: Items;
}

export interface Discounts {
  [key: string]: DiscountDetail;
}

@autobind
export default class DiscountStore {
  discounts: Discounts = {};
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  addDiscount(discount: DiscountDetail) {
    this.discounts[discount.name] = Object.assign(discount, {
      items: this.root.item.items
    });
  }
}
