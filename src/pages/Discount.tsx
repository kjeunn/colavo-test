import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import { observer, inject } from "mobx-react";
import { DiscountDetail, Discounts } from "../stores/discountStore";
import RootStore from "../stores/index";

interface DiscountState {
  discounts: Discounts;
}

interface InjectedProps {
  root: RootStore;
}

@inject("root")
@observer
export default class Discount extends Component<InjectedProps, DiscountState> {
  state: DiscountState = {
    discounts: {}
  };

  async componentDidMount() {
    const discountList = await fetch(
      "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData"
    )
      .then(res => res.json())
      .then(res => res.discounts);
    for (let key in discountList) {
      discountList[key].isChecked = false;
    }
    this.setState({
      discounts: discountList
    });
  }

  toggle = (discount: DiscountDetail) => {
    discount.isChecked = !discount.isChecked;
    this.setState(this.state);
  };

  handleClickedCompleteButton = () => {
    const discountStore = this.props.root.discount;
    for (let key in this.state.discounts) {
      if (this.state.discounts[key].isChecked) {
        discountStore.addDiscount(this.state.discounts[key]);
      }
    }
  };

  render() {
    return (
      <div className="container" style={{ height: "100vh" }}>
        <div className="row">
          <div className="col-xs-6 col-md-4" />
          <div className="col-xs-6 col-md-4 p-3 m-3">
            <div>
              <Link to="/cart">
                <Input type="button" value="X" />
              </Link>
              <h5 className="text-center">할인</h5>
            </div>
            {Object.values(this.state.discounts).map((discount, id) => {
              return (
                <div className="container" key={id}>
                  <div
                    className="row"
                    style={{ width: "auto" }}
                    onClick={() => this.toggle(discount)}
                  >
                    <div
                      className="col-xs-6 col-md-4"
                      style={{ height: "21px" }}
                    >
                      <Input
                        type="checkbox"
                        id="blankCheckbox"
                        value="option1"
                        aria-label="..."
                        readOnly
                        checked={discount.isChecked}
                      />
                    </div>
                    <div className="col-xs-6 col-md-4">
                      <h5>{discount.name}</h5>
                      {discount.rate}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-xs-6 col-md-4 p-3 m-3">
            <h6 className="text-center">
              <small>할인을 선택하세요(여러 개 선택가능)</small>
            </h6>
            <Link to="/cart">
              <Input
                type="button"
                value="완료"
                onClick={this.handleClickedCompleteButton}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
