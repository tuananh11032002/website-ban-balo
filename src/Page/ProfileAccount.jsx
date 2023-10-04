import React from "react";
import Profile from "../Component/Account/Profile";
import Account from "../Component/Account";

const ProfileAccount = () => {
  return (
    <>
      <Account component={<Profile />} />
    </>
  );
};

export default ProfileAccount;
