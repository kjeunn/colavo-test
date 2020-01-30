import React from "react";
import { Route } from "react-router-dom";
import { PaymentList, Item, Discount } from "./pages";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Route exact path="/" component={PaymentList} />
      <Route exact path="/cart" component={PaymentList} />
      <Route exact path="/item" component={Item} />
      <Route exact path="/discount" component={Discount} />
    </div>
  );
}

export default App;
