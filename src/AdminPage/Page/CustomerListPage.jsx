import React from "react";
import Admin from "../Admin";
import CustomerList from "../Component/CustomerList";

const CustomerListPage = () => {
  return <Admin indexActive={7} Child={CustomerList}></Admin>;
};

export default CustomerListPage;
