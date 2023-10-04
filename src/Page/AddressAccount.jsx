import React from "react";
import Account from "../Component/Account";
import Address from "../Component/Account/Address";
const AddressAccount = () => {
  return (
    <>
      <Account component={<Address />} />
    </>
  );
};

export default AddressAccount;
