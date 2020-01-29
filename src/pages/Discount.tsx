import React, { Component } from "react";

interface DiscountDetail {
  name: string;
  rate: number;
}

interface DiscountState {
  discounts: {
    [key: string]: DiscountDetail;
  };
}

export default class Discount extends Component {
  state: DiscountState = {
    discounts: {}
  };

  async componentDidMount() {
    const discountList = await fetch(
      "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData"
    )
      .then(res => res.json())
      .then(res => res.discounts);
    this.setState({
      discounts: discountList
    });
  }

  render() {
    return (
      <div className="container" style={{ height: "100vh" }}>
        <div className="row">
          <div className="col-md-4" />
          {Object.values(this.state.discounts).map(discount => {
            return <div>{`${discount.name} ${discount.rate}`}</div>;
          })}
        </div>
      </div>
    );
  }
}
