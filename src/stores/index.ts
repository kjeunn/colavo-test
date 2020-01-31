import DiscountStore from "./discountStore";
import ItemStore from "./itemStore";

export default class RootStore {
  discount: DiscountStore;
  item: ItemStore;

  constructor() {
    this.discount = new DiscountStore(this);
    this.item = new ItemStore(this);
  }
}
