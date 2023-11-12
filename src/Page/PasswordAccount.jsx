import React, { useEffect } from "react";
import ChangePassword from "../Component/Account/ChangePassword";
import Account from "../Component/Account";

const PasswordAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 250);
  }, []);
  return (
    <>
      <Account indexActive={2} component={<ChangePassword />} />
    </>
  );
};

export default PasswordAccount;
