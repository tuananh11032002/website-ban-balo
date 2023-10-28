import React, { useEffect } from "react";
import Account from "../Component/Account";
import Address from "../Component/Account/Address";
const AddressAccount = () => {
  useEffect(() => {
    window.scroll(0, 500);
  }, []);
  return (
    <>
      <Account indexActive={3} component={<Address />} />
    </>
  );
};

export default AddressAccount;
