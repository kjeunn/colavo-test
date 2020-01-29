import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";

interface PaymentListDetail {
  name: string;
  price: number;
  count: number;
}

interface PaymentListState {
  items: {
    [key: string]: PaymentListDetail;
  };
  totalPrice: number;
}

export default class PaymentList extends Component<PaymentListState> {
  state = {
    items: {},
    totalPrice: 0
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-md-4" />
          <div className="col-xs-6 col-md-4 p-3 m-3">
            <Link to="item">
              <Input type="button" value="시술" />
            </Link>
            <Link to="Discount">
              <Input type="button" value="할인" />
            </Link>
          </div>
          <div className="col-xs-6 col-md-4 p-3 m-3">
            <div className="m-2">합계 {this.state.totalPrice}원</div>
            <Input type="button" value="다음" />
          </div>
        </div>
      </div>
    );
  }
}
