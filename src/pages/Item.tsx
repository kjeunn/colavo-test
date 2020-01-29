import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Label } from "reactstrap";

interface ItemDetail {
  name: string;
  price: number;
  count: number;
  isChecked: boolean;
}

interface ItemState {
  items: {
    [key: string]: ItemDetail;
  };
}

export default class Item extends Component<ItemState> {
  state: ItemState = {
    items: {}
  };

  toggle = (item: ItemDetail) => {
    item.isChecked = !item.isChecked;
    this.setState(this.state);
  };

  async componentDidMount() {
    const itemList = await fetch(
      "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData"
    )
      .then(res => res.json())
      .then(res => res.items);
    for (let key in itemList) {
      itemList[key].isChecked = false;
    }
    this.setState({
      items: itemList
    });
  }
  render() {
    return (
      <div className="container">
        {/* <div className="row"> */}
        <div className="col-xs-6 col-md-4" />
        <div className="col-xs-6 col-md-4 p-3 m-3">
          <div>
            <Link to="/">
              <Input type="button" value="X" />
            </Link>
            <h5 className="text-center">시술메뉴</h5>
          </div>
          {Object.values(this.state.items).map((item, id) => {
            return (
              <div className="container">
                <div
                  className="row"
                  style={{ width: "auto" }}
                  key={id}
                  onClick={() => this.toggle(item)}
                >
                  <div className="col-xs-6 col-md-4">
                    <Label>
                      <Input
                        type="checkbox"
                        id="blankCheckbox"
                        value="option1"
                        aria-label="..."
                        readOnly
                        checked={item.isChecked}
                      />
                    </Label>
                  </div>
                  <div className="col-xs-6 col-md-4">
                    <h5>{`${item.name}`}</h5>
                    {`${item.price}`}
                  </div>
                </div>
                {item.isChecked && (
                  <div className="col-xs-6 col-md-4">
                    <select className="form-control">
                      <option> {`${item.count}`}</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="col-xs-6 col-md-4" />
        {/* </div> */}
      </div>
    );
  }
}
