import React from "react";
import Account from "../Component/Account";
import OrderPage from "../Component/Account/OrderPage";
const OrderAccount = () => {
  return (
    <>
      <Account component={<OrderPage />} />
    </>
  );
};

export default OrderAccount;
