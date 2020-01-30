import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import { observer, inject } from "mobx-react";
import ItemStore from "../stores/itemStore";

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

interface InjectedProps {
  itemStore: ItemStore;
}

@inject("itemStore")
@observer
export default class Item extends Component<InjectedProps, ItemState> {
  state: ItemState = {
    items: {}
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

  toggle = (item: ItemDetail) => {
    item.isChecked = !item.isChecked;
    this.setState(this.state);
  };

  changedSelectCount = (item: ItemDetail, id: number) => {
    const selectedCount = (document.getElementById(
      `select-count-${id}`
    ) as HTMLSelectElement).value;
    item.count = Number(selectedCount);
    this.setState(this.state);
  };

  handleClickedCompleteButton = () => {
    const { itemStore } = this.props;
    for (let key in this.state.items) {
      if (this.state.items[key].isChecked) {
        itemStore.addItem(this.state.items[key]);
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-md-4" />
          <div className="col-xs-6 col-md-4 p-3 m-3">
            <div>
              <Link to="/cart">
                <Input type="button" value="X" />
              </Link>
              <h5 className="text-center">시술메뉴</h5>
            </div>
            {Object.values(this.state.items).map((item, id) => {
              return (
                <div className="container" key={id}>
                  <div
                    className="row"
                    style={{ width: "auto" }}
                    onClick={() => this.toggle(item)}
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
                        checked={item.isChecked}
                      />
                    </div>
                    <div className="col-xs-6 col-md-4">
                      <h5>{item.name}</h5>
                      {item.price}
                    </div>
                  </div>
                  {item.isChecked && (
                    <div className="col-xs-6 col-md-4">
                      <select
                        id={`select-count-${id}`}
                        className="form-control"
                        onChange={() => this.changedSelectCount(item, id)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="col-xs-6 col-md-4 p-3 m-3">
            <h6 className="text-center">
              <small>서비스를 선택하세요(여러 개 선택가능)</small>
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
