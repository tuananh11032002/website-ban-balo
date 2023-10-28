import React, { useEffect } from "react";
import Profile from "../Component/Account/Profile";
import Account from "../Component/Account";

const ProfileAccount = () => {
  useEffect(() => {
    window.scroll(0, 500);
  }, []);
  return (
    <>
      <Account indexActive={1} component={<Profile />} />
    </>
  );
};

export default ProfileAccount;
