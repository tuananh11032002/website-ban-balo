import React, { useEffect } from "react";
import Account from "../Component/Account";
import Address from "../Component/Account/Address";
const AddressAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 250);
  }, []);
  return (
    <>
      <Account indexActive={3} component={<Address />} />
    </>
  );
};

export default AddressAccount;
