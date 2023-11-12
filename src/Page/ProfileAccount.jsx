import React, { useEffect } from "react";
import Profile from "../Component/Account/Profile";
import Account from "../Component/Account";

const ProfileAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 250);
  }, []);
  return (
    <>
      <Account indexActive={1} component={<Profile />} />
    </>
  );
};

export default ProfileAccount;
