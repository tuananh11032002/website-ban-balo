import React, { useEffect } from "react";
import Account from "../Component/Account";
import OrderPage from "../Component/Account/OrderPage";
const OrderAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 250);
  }, []);
  return (
    <>
      <Account indexActive={4} component={<OrderPage />} />
    </>
  );
};

export default OrderAccount;
