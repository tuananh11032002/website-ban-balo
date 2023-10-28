import React, { useEffect } from "react";
import Admin from "../Admin";
import UserList from "../Component/UserList";
import { useLocation } from "react-router-dom";

const UserListPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return <Admin Child={UserList} indexActive={5}></Admin>;
};

export default UserListPage;
