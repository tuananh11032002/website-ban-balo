import React from "react";
import OrderList from "../Component/OrderList";
import Admin from "../Admin";

const OrderListPage = () => {
  return <Admin indexActive={4} Child={OrderList}></Admin>;
};

export default OrderListPage;
