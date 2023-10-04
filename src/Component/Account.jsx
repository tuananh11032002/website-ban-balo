import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

import { styled } from "styled-components";
import { useStateProvider } from "../StateProvider/StateProvider";
import { AiOutlineEdit } from "react-icons/ai";

import { MdOutlineAccountCircle } from "react-icons/md";
import Profile from "./Account/Profile";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Address from "./Account/Address";
import OrderPage from "./Account/OrderPage";

const Account = ({ component }) => {
  const { pathname } = useLocation();
  const [{ user }, dispatch] = useStateProvider();
  const state = pathname === "/account/profile" ? 1 : 0;
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <Header />
      <Container>
        <div className="slidebar">
          <div className="user slidebar-child">
            <img src={require("../Assets/Image/nologin.jpg")} alt="" />

            <div className="user-button">
              <div>{user?.userName}</div>
              <div>
                <AiOutlineEdit />
                <i>Sửa hồ sơ</i>
              </div>
            </div>
          </div>
          <div
            className="myaccount hover slidebar-child"
            onClick={() => {
              navigate("/account/profile");
            }}
          >
            <img
              src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4"
              alt=""
            />
            Tài khoản của tôi
          </div>
          {state == 1 ? (
            <ul className="slidebar-child">
              <li
                onClick={() => {
                  navigate("/account/profile");
                }}
              >
                Hồ sơ
              </li>
              <li>Đổi mật khẩu</li>
              <li
                onClick={() => {
                  navigate("/account/address");
                }}
              >
                Địa chỉ
              </li>
            </ul>
          ) : null}
          <div
            className="order hover slidebar-child"
            onClick={() => {
              navigate("/account/order");
            }}
          >
            <img
              src="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078"
              alt=""
            />
            Đơn mua
          </div>
        </div>

        <div className="main">{component}</div>
      </Container>
      <Footer />
    </div>
  );
};
const Container = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: auto;
  min-height: 600px;
  display: grid;
  overflow-x: hidden;
  overflow-y: none;
  grid-template-columns: 2fr 8fr;
  .main {
    margin-right: 40px;
    margin-top: 1rem;
    padding: 2rem;
    background-color: white;
    margin-bottom: 20px;
  }
  .hover {
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
  .slidebar-child {
    font-size: 14px;
    text-align: left;
    &:not(:first-child) {
      margin-top: 20px;
    }
    li {
      list-style: none;
      font-size: 14px;
    }
  }
  .slidebar-child {
    list-style: none;
    padding: 0;
  }

  .slidebar-child li {
    margin: 10px 0;
    padding: 5px 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .slidebar-child li:hover {
    background-color: #ddd;
  }

  .slidebar-child li {
    color: #333;
    font-size: 14px;
  }
  .user {
    display: flex;
    .user-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 10px;
      text-align: right;
    }
  }
  .slidebar {
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: transparent;
    padding-left: 5vw;
    img {
      height: 20px;
      width: 20px;
    }
    @media screen and (max-width: 1000px) {
      padding-left: 0;
    }

    img {
      max-width: 40px;
      max-height: 40px;
    }
  }
`;
export default Account;
