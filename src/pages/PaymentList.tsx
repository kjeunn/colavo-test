import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import { observer, inject } from "mobx-react";
import RootStore from "../stores/index";

interface PaymentListDetail {
  name: string;
  price: number;
  count: number;
}

interface InjectedProps {
  root: RootStore;
}

@inject("root")
@observer
export default class PaymentList extends Component<
  InjectedProps,
  PaymentListDetail
> {
  changedSelectCount = (item: PaymentListDetail, id: number) => {
    const itemStore = this.props.root.item;
    const selectedCount = (document.getElementById(
      `select-count-${id}`
    ) as HTMLSelectElement).value;
    if (selectedCount === "삭제") {
      itemStore.deleteItem(item);
    } else {
      itemStore.changeCount(item, Number(selectedCount));
    }
    this.setState({});
  };

  changedSelectItem = (discount: PaymentListDetail, id: number) => {
    // const { itemStore } = this.props;
    // const selectedItem = (document.getElementById(
    //   `select-item-${id}`
    // ) as HTMLSelectElement).value;
    // if (selectedItem === "삭제") {
    //   itemStore.de;
    // }
  };

  render() {
    const itemStore = this.props.root.item;
    const discountStore = this.props.root.discount;
    return (
      <div className="container">
        <div className="row align-self-center h-100">
          <div className="col-xs-6 col-md-4" />
          <div className="col-xs-6 col-md-4 p-3 m-3 justify-content-between">
            <h5 className="text-center">고객</h5>
            <Link to="item">
              <Input type="button" value="시술" />
            </Link>
            <Link to="Discount">
              <Input type="button" value="할인" />
            </Link>
          </div>
          {Object.values(itemStore.items).map((item, id) => {
            return (
              <div className="container" key={id}>
                <div className="row">
                  <div className="col-xs-6 col-md-4">
                    <h5>{item.name}</h5>
                    {item.price * item.count}
                  </div>
                  <div className="col-xs-6 col-md-4">
                    <select
                      id={`select-count-${id}`}
                      className="form-control"
                      onChange={() => this.changedSelectCount(item, id)}
                    >
                      <option value="1" selected={item.count === 1}>
                        1
                      </option>
                      <option value="2" selected={item.count === 2}>
                        2
                      </option>
                      <option value="3" selected={item.count === 3}>
                        3
                      </option>
                      <option value="4" selected={item.count === 4}>
                        4
                      </option>
                      <option value="5" selected={item.count === 5}>
                        5
                      </option>
                      <option value="삭제" selected={false}>
                        삭제
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
          {Object.values(discountStore.discounts).map((discount, id) => {
            return (
              <div className="container" key={id}>
                <div className="row">
                  <div className="col-xs-6 col-md-4">
                    <h5>{discount.name}</h5>
                    {`(${discount.rate * 100}%)`}
                  </div>
                  <div className="col-xs-6 col-md-4">
                    <label>수정</label>
                    <select
                      id={`select-item-${id}`}
                      className="form-control"
                      multiple
                      // onChange={() => this.changedSelectItem(discount, id)}
                    >
                      {Object.values(discount.items).map(item => {
                        return <option value={item.name}>{item.name}</option>;
                      })}
                      <option value="삭제" selected={false}>
                        삭제
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="col-xs-6 col-md-4 p-3 m-3">
            <div className="m-2">
              합계
              {itemStore.totalPrice}원
            </div>
            <Input type="button" value="다음" />
          </div>
        </div>
      </div>
    );
  }
}
