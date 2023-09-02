import React, { createContext, useContext, useEffect, useState } from "react";
import ProductForm from "./Component/Product";
import { Link, useNavigate } from "react-router-dom";
import ListProduct from "./Component/ListProduct";
import { styled } from "styled-components";
import Category from "./Component/Category";
import { AiOutlineMail, AiOutlineHome } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { SlSettings } from "react-icons/sl";
import { FcAddImage, FcRemoveImage } from "react-icons/fc";
import { LiaCheckSquare } from "react-icons/lia";
import Users from "./Component/Users";

const Admin = () => {
  console.log("admin");
  const navigate = useNavigate();
  const [state, setState] = useState(1);
  const [stateControll, setStateControll] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const [stateCheck, setStateCheck] = useState(true);
  const [listRemove, setListRemove] = useState([]);

  useEffect(() => {
    const handleClickLi = (e) => {};
    document.addEventListener("click", handleClickLi);
  }, []);
  const showCheckboxes = () => {
    if (stateCheck) {
      const checkboxes = document.querySelectorAll(".checkbox-item");
      checkboxes.forEach((checkbox) => {
        checkbox.style.display = "block";
        checkbox.style.position = "absolute";
        checkbox.style.left = "50px";
      });
    } else {
      const checkboxes = document.querySelectorAll(".checkbox-item");
      checkboxes.forEach((checkbox) => {
        checkbox.style.display = "none";
      });
    }
  };
  useEffect(() => {
    if (state == 1) {
      document.getElementById("product").classList.add("active");
    }
  });
  const handlerClick = (e, type) => {
    e.stopPropagation();
    const elementWithActiveClass = document.getElementsByClassName("active")[0];
    if (elementWithActiveClass) {
      elementWithActiveClass.classList.remove("active");
    }
    e.target.classList.add("active");

    if (type == "product") setState(1);
    else if (type == "category") {
      setState(2);
    } else if (type == "user") {
      setState(3);
    } else {
      setState(4);
    }
  };
  const handleCloseComponent2 = () => {
    setAddProduct(false);
  };
  const handleOpenComponent2 = () => {
    setAddProduct(true);
  };
  const handleRemoveList = (list) => {
    setListRemove(list);
  };
  return (
    <>
      <Container>
        <div className="areaControll">
          <div className="account">
            <div className="acount-image">
              <img src="https://img2.thuthuatphanmem.vn/uploads/2018/11/30/anh-dai-dien-che-hai_104205084.png" />
              <div>Admin Tuan Anh</div>
              <div className="account-icons">
                <SlSettings />
                <AiOutlineMail />
                <RiLogoutBoxRLine />
              </div>
            </div>
          </div>
          <div className="controller">
            <div
              id="product"
              onClick={(e) => {
                return handlerClick(e, "product");
              }}
            >
              Product
              {stateControll == 1 && <div className="pop_up"> Add Product</div>}
            </div>
            <div
              onClick={(e) => {
                return handlerClick(e, "category");
              }}
            >
              Category
            </div>
            <div
              onClick={(e) => {
                return handlerClick(e, "user");
              }}
            >
              User
            </div>
            <div
              onClick={(e) => {
                return handlerClick(e, "cart");
              }}
            >
              Cart
            </div>
          </div>
        </div>
        <div className="content">
          {state == 1 ? (
            <>
              {addProduct ? (
                <ProductForm
                  closeComponent2={handleCloseComponent2}
                  openComponent2={handleOpenComponent2}
                />
              ) : null}
              <div className="button-parent">
                <div className="button-home">
                  <AiOutlineHome />
                  <div
                    className="button"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Home
                  </div>
                </div>

                <div
                  className="button-add"
                  onClick={() => {
                    setAddProduct(!addProduct);
                  }}
                >
                  <FcAddImage />
                  <div className="button">Add Product</div>
                </div>

                <div
                  className="button-choose"
                  onClick={() => {
                    setStateCheck(!stateCheck);
                    setTimeout(showCheckboxes, 0);
                  }}
                >
                  <LiaCheckSquare />
                  <div className="button">Multil Choose</div>
                </div>
                <div className="button-remove" onClick={() => {}}>
                  <FcRemoveImage />
                  <div className="button">Remove</div>
                </div>
              </div>
              <ListProduct openComponent2={handleOpenComponent2} />
            </>
          ) : state == 2 ? (
            <Category />
          ) : state == 3 ? (
            <Users />
          ) : state == 4 ? null : null}
        </div>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  overflow-y: auto;
  .areaControll {
    margin-right: 10px;
    padding: 10px 0;
    background-color: #222a45;
    color: white;
    height: 100vh;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    width: 200px;
    z-index: 2;

    .acount-image {
      margin-bottom: 20px;
      border-bottom: 1px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: auto;
      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
      .account-icons {
        display: flex;

        svg {
          margin: 10px;
          height: 24px;
          width: 24px;
        }
      }
    }
    .active {
      background-color: #1a2036;

      border-left: 1px solid white;
    }

    .controller {
      div {
        width: 95%;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2%;
        position: relative;
        user-select: none;
        cursor: pointer;
        .pop_up {
          position: absolute;
          left: 125px;
          z-index: 10;
          color: black;
          width: 160%;
          height: auto;
          min-height: 100%;
          background-color: #696fa4;
        }
      }
    }
  }
  .content {
    max-height: 100vh;
    flex: 1;
    padding: 0 0;
    margin-left: 200px;
  }
  .button-parent {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transform-origin: top right;
    transition: display 0.2s;
    .button-add,
    .button-remove,
    .button-choose,
    .button-home {
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
    }
    .button {
      margin-left: 10px;
      &:not(:first-child) {
        margin: 20px;
      }
    }
  }
`;
export default Admin;
