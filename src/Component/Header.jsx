import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiTwotonePhone,
  AiOutlineMail,
  AiOutlineBell,
} from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import styled from "styled-components";
import Information from "./Header/Information";
import Controller from "./Header/Controller";
import { useStateProvider } from "../StateProvider/StateProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { reducerCases } from "../StateProvider/reducer";
import { BsSearch } from "react-icons/bs";
import {
  DeleteProductIntoOrder,
  GetOrder,
  GetProductIntoOrder,
  GetProductSearch,
} from "../Axios/web";
import _ from "lodash";
import SearchMini from "./Header/SearchMini";
import Notification from "./Body/Notification";

const Header = () => {
  const navigate = useNavigate();
  const [{ quantity, cart, loading, user }, dispatch] = useStateProvider();
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const vdRef = useRef(null);
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [productSearch, setProductSearch] = useState([]);
  const [order, setOrder] = useState(null);

  console.log("header");
  //get user
  const handlerClick = () => {
    setShowCart(!showCart);
  };
  const handleLogout = () => {
    dispatch({ type: reducerCases.SET_USER, user: null });
    dispatch({ type: reducerCases.SET_CART, cart: null });

    localStorage.setItem("webbanbalo_user", "null");
  };
  const handleAccountMouseOver = () => {
    setShowAccount(true);
  };

  const handleAccountMouseOut = () => {
    setShowAccount(false);
  };
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    // Sử dụng setTimeout để cho phép người dùng bấm vào các thẻ <li> trước khi ẩn search
    setTimeout(() => {
      setIsFocused(false);
    }, 500);
  };

  // Sử dụng debounce để giới hạn số lần gọi hàm GetProductSearch
  const debouncedHandlerChange = _.debounce(async (keyword) => {
    if (keyword != undefined && keyword != "") {
      const data = await GetProductSearch(keyword);
      setProductSearch(data);
    } else {
      setProductSearch([]);
    }
  }, 500); // Thay đổi số 500 thành khoảng thời gian chờ mong muốn (milliseconds)
  const handlerChange = () => {
    if (inputRef.current) {
      const keyword = inputRef.current.value;
      // Gọi hàm debouncedHandlerChange với từ khoá sau khi chờ 500ms
      debouncedHandlerChange(keyword);
    }
  };
  useEffect(() => {
    // Thêm sự kiện "click" cho toàn bộ trang
    const handleClickOutside = (event) => {
      if (vdRef.current && !vdRef.current.contains(event.target)) {
        setShowCart(false); // Đóng giỏ hàng nếu người dùng click bên ngoài lớp `vd`
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false); //
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //remove product on order
  const handlerRemove = async (productid) => {
    if (user) {
      const response = await DeleteProductIntoOrder(productid);
      if (response) dispatch({ type: reducerCases.SET_CART, cart: [] });
    } else {
      const cartTemp = JSON.parse(localStorage.getItem("webbanbalo_cart"));
      let index;
      for (let i = 0; i < cartTemp.length; i++) {
        if (cartTemp[i].product.id === productid) {
          index = i; // Gán chỉ mục của phần tử bằng i nếu tìm thấy
          break; // Dừng vòng lặp sau khi tìm thấy phần tử đầu tiên
        }
      }
      cartTemp.splice(index, 1);
      localStorage.setItem("webbanbalo_cart", JSON.stringify(cartTemp));
      dispatch({ type: reducerCases.SET_CART, cart: [] });
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const data = await GetProductIntoOrder();
        if (JSON.stringify(data) != JSON.stringify(cart)) {
          dispatch({ type: reducerCases.SET_CART, cart: data });
          console.log("da set header 1");
        }
      } else {
        var data = localStorage.getItem("webbanbalo_cart");
        if (data == null) {
          localStorage.setItem("webbanbalo_cart", JSON.stringify([]));
          data = localStorage.getItem("webbanbalo_cart");
          console.log(data, "data1");
        }
        console.log(JSON.stringify(data), "data");
        console.log(cart, "cart");
        if (data != JSON.stringify(cart)) {
          dispatch({ type: reducerCases.SET_CART, cart: JSON.parse(data) });
          console.log("da set header 2");
        }
      }
    };
    fetchCart();
  }, [cart]);

  useEffect(() => {
    console.log("da set header 3", cart?.length, cart);

    if (cart?.length != quantity) {
      dispatch({
        quantity: cart ? cart.length : 0,
        type: reducerCases.SET_QUANTITY,
      });
    }
    console.log("da set header 3");
  }, [cart]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const orderAPi = await GetOrder();

        if (JSON.stringify(orderAPi) != JSON.stringify(order) && orderAPi) {
          setOrder(orderAPi);
        }
      } else {
        let result = cart?.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price * currentValue.quantity;
        }, 0);
        if (result != order?.totalAmount) {
          setOrder({
            totalAmount: result,
          });
        }
      }
    };
    fetchCart();
  }, [cart]);

  return (
    <Container>
      {console.log("cart", cart)}
      <div className="container_nobo">
        <div className="branch hover ">
          <LinkCustome to={"/"}>TuanAnh Brand ®</LinkCustome>
        </div>
        <div className="details">
          <div className=" hover container_nobo-item1 details-child">
            <AiTwotonePhone className="svg" />
            0987654321
          </div>
          <div className=" hover hidden container_nobo-item2 details-child">
            <AiOutlineMail className="svg" />
            ttuananh372@gmail.com
          </div>
          <div
            className="search  container_nobo-item3 details-child"
            ref={searchRef}
          >
            <input
              ref={inputRef}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={() => handlerChange()}
              type="text"
              placeholder="Nhập sản phẩm cần tìm"
            ></input>
            <button>
              <BsSearch />
            </button>
            {isFocused && (
              <div className="searchmini">
                <SearchMini
                  inputRef={inputRef}
                  dataProduct={productSearch}
                  setProductSearch={setProductSearch}
                />
              </div>
            )}
          </div>
          <div className="cart container_nobo-item4 details-child" ref={vdRef}>
            <AiOutlineShoppingCart onClick={() => handlerClick()} />
            <span className="cart-count">
              {loading ? <FaSpinner className="loading-icon" /> : quantity}
            </span>
            {showCart && (
              <div className="vd">
                {cart?.length > 0 ? (
                  <>
                    <ul>
                      {cart?.map((cart, index) => (
                        <li key={cart?.product.id}>
                          <img src={cart?.product.image} alt="" />
                          <div>
                            <div>{cart?.product.name}</div>
                            <div>{cart?.price.toLocaleString()}đ</div>
                            <div>Số lượng: {cart?.quantity}</div>
                          </div>
                          <button
                            onClick={() => {
                              handlerRemove(cart.product.id);
                            }}
                          >
                            Xóa
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div style={{ textAlign: "right" }}>
                      Tổng tiền: &nbsp;
                      {order
                        ? `${order.totalAmount.toLocaleString()}đ`
                        : "-----"}
                    </div>
                    <div className="direction">
                      <div
                        onClick={() => {
                          setShowCart(false);

                          navigate("/cart");
                        }}
                      >
                        Tuỳ chỉnh
                      </div>
                      <div
                        onClick={() => {
                          setShowCart(false);

                          navigate("/pay");
                        }}
                      >
                        Thanh toán
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    Đơn hàng rỗng.Tiếp tục mua hàng{" "}
                    <Link
                      to={"/"}
                      onClick={() => {
                        setShowCart(false);
                      }}
                    >
                      tại đây
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className="details-child notification"
            onMouseEnter={() => setIsNotification(true)}
            onMouseLeave={() => setIsNotification(false)}
          >
            <div className="notification-count">1</div>

            <AiOutlineBell />
            {isNotification && <Notification />}
          </div>
          <div className="details-child ">
            {user ? (
              <>
                <div
                  className="account"
                  onMouseOver={handleAccountMouseOver}
                  onMouseOut={handleAccountMouseOut}
                >
                  <img src={require("../Assets/Image/nologin.jpg")} alt="" />
                  <div>{user?.userName}</div>
                  {showAccount && (
                    <div className="account-child">
                      <div
                        onClick={() => {
                          navigate("/account/profile");
                        }}
                      >
                        Thông tin cá nhân
                      </div>
                      <div onClick={handleLogout}>Đăng xuất</div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                onClick={() => {
                  navigate("/login");
                }}
                style={{ cursor: "pointer" }}
              >
                Đăng nhập
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="information">
        <Information />

        <Controller />
      </div>
    </Container>
  );
};

const LinkCustome = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
`;
const Container = styled.header`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  height: auto;

  .vd {
    z-index: 2;
    width: 300px;
    height: auto;
    background-color: white;
    position: absolute;
    top: 40px;
    right: 0px;
    overflow: auto;
    ul {
      width: 100%;
      padding-inline-start: 0;
      li {
        box-sizing: border-box;
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 4fr 1fr;
        left: 0;
        width: 100%;
        list-style: none;
        color: black;
        border: 1px solid black;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }

    .direction {
      width: 100%;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        cursor: pointer;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-content: center;
        align-items: center;

        border: 1px solid black;
        height: 2rem;
      }
    }
  }

  .information {
    max-width: 100%;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding-left: 5rem;
    padding-right: 5rem;
    margin-top: 10px;
    hr {
      margin-top: 2rem;
    }
  }

  .container_nobo {
    width: 100%;
    font-size: 12px;

    margin: 0;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    z-index: 2;
    box-sizing: border-box;
    .details,
    .branch {
      /* flex: 1; */
    }
    .account {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        border-radius: 50%;
        width: 32px;
        height: 32px;
      }
      &:hover {
        cursor: pointer;
      }
      .account-child {
        /* z-index: 2;
        position: absolute;
        left: -150px;
        top: 50px;
        border: 1px solid;
        width: 200px;
        height: 200px; */
      }
    }
    /* App.css */
    .account-child {
      display: none;
      position: absolute;
      top: 100%;
      right: 20%;
      background-color: white;
      border: 1px solid gray;
      padding: 8px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      width: 200px; /* Đặt chiều rộng cho menu */
    }

    .account:hover .account-child {
      display: block;
    }

    .account-child div {
      padding: 6px 10px;
      cursor: pointer;
    }

    .account-child div:hover {
      background-color: lightgray; /* Màu nền khi hover */
    }

    .account-child div:first-child {
      border-bottom: 1px solid gray;
    }

    .hover {
      &:hover {
        color: red;
        cursor: pointer;
      }
    }

    .details {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      width: auto;

      .details-child {
        display: flex;
        align-items: center;

        .svg {
          margin-right: 5px;
          color: red;
        }
        &:not(last-child) {
          margin-right: 10px;
        }
      }
      .search {
        position: relative;
        margin: auto;

        input {
          width: 200px;

          height: 30px;
        }
        button {
          width: auto;
          height: 30px;
          background-color: #6e7072;
          color: white;
          border: none;
          padding: 5px 10px; /* Giảm khoảng cách đệm để nút trông nhỏ hơn */
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        button svg {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }
      .searchmini {
        position: absolute;
        z-index: 20;
        top: 3.5rem;
        width: 100%;
        height: auto;
        background-color: #f5f5f5;
      }
    }
    .cart {
      position: relative;
      display: inline-block;

      color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      .cart-count {
        position: absolute;
        top: -15px;
        right: -8px;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 4px 8px;
        font-size: 12px;
        .loading-icon {
          font-size: 12px;
          color: #6e7072;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      svg {
        width: 2rem;
        height: 2rem;
      }
    }
    @media (max-width: 768px) {
      margin: 0;
      padding: 0 25px;
      box-sizing: border-box;

      .hidden {
        display: none;
      }
    }
  }

  @media screen and (max-width: 756px) {
    .information {
      padding: 0 20px;
    }
  }
  @media screen and (max-width: 1300px) {
    .container_nobo {
      height: auto;
      padding-bottom: 10px;
    }
    .container_nobo .details .container_nobo-item1 {
      order: 1;
      margin-bottom: 22px;
    }
    .container_nobo .details .container_nobo-item2 {
      order: 2;
      margin-bottom: 22px;
    }
    .container_nobo .details .container_nobo-item3 {
      order: 4;
    }
    .container_nobo .details .container_nobo-item4 {
      order: 3;
    }
  }
  @media screen and (max-width: 462px) {
    .container_nobo .details .container_nobo-item1 {
      flex: 1;
      margin: 0;
      padding: 22px 0 22px 0px;
    }
  }
  .notification {
    .notification-count {
      border-radius: 50%;
      height: 26px;
      width: 26px;
      background-color: red;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -14px;
      left: 11px;
    }
    svg {
      height: 26px;
      width: 26px;
    }
  }
`;

export default Header;
