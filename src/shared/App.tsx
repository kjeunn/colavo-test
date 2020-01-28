import React from "react";
import { Route, Switch } from "react-router-dom";
import { PaymentList, Item, Discount } from "../pages";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={PaymentList} />
        <Route exact path="/item" component={Item} />
        <Route exact path="/discount" component={Discount} />
      </Switch>
    </div>
  );
}

export default App;
