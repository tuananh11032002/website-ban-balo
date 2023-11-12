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
  getProductApi,
} from "../Axios/web";
import _ from "lodash";
import SearchMini from "./Header/SearchMini";
import Notification from "./Body/Notification";
import processApiImagePath from "../Helper/EditLinkImage";

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
  const [order, setOrder] = useState({ totalAmount: 0 });
  const containerRef = useRef(null);
  const [heightContainer, setHeightContainer] = useState(0);
  const [isWindow, setIsWindow] = useState(window.innerWidth > 756);
  console.log("header");
  //get user
  const handlerClick = () => {
    setShowCart(!showCart);
  };
  const mouseLeave = () => {
    setIsNotification(false);
  };
  const mouseOver = () => {
    setIsNotification(true);
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
    setTimeout(() => {
      setIsFocused(false);
    }, 500);
  };
  const handlerRemove = async (productid) => {
    if (user) {
      const response = await DeleteProductIntoOrder(productid);
      if (response?.status) dispatch({ type: reducerCases.SET_CART, cart: [] });
    } else {
      const cartTemp = JSON.parse(localStorage.getItem("webbanbalo_cart"));
      let index;
      for (let i = 0; i < cartTemp.length; i++) {
        if (cartTemp[i].product.id === productid) {
          index = i;
          break;
        }
      }
      cartTemp.splice(index, 1);
      localStorage.setItem("webbanbalo_cart", JSON.stringify(cartTemp));
      dispatch({ type: reducerCases.SET_CART, cart: [] });
    }
  };

  const debouncedHandlerChange = _.debounce(async (keyword) => {
    if (keyword != undefined && keyword != "") {
      const data = await getProductApi(keyword, null, null, null, null, 1, 20);
      const { product } = data.result;

      if (data?.status) setProductSearch(data.result?.product);
    } else {
      setProductSearch([]);
    }
  }, 500);
  const handlerChange = () => {
    if (inputRef.current) {
      const keyword = inputRef.current.value;
      // Gọi hàm debouncedHandlerChange với từ khoá sau khi chờ 500ms
      debouncedHandlerChange(keyword);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (vdRef.current && !vdRef.current.contains(event.target)) {
        setShowCart(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     if (user) {
  //       const data = await GetProductIntoOrder();

  //       if (data.status) {
  //         if (JSON.stringify(data.result) !== JSON.stringify(cart)) {
  //           dispatch({ type: reducerCases.SET_CART, cart: data.result });
  //         }
  //       }
  //     } else {
  //       var data = localStorage.getItem("webbanbalo_cart");
  //       if (data == null) {
  //         localStorage.setItem("webbanbalo_cart", JSON.stringify([]));
  //         data = localStorage.getItem("webbanbalo_cart");
  //       }

  //       if (data !== JSON.stringify(cart)) {
  //         dispatch({ type: reducerCases.SET_CART, cart: JSON.parse(data) });
  //       }
  //     }
  //   };
  //   fetchCart();
  // }, [cart]);

  // useEffect(() => {
  //   if (cart?.length != quantity) {
  //     dispatch({
  //       quantity: cart ? cart.length : 0,
  //       type: reducerCases.SET_QUANTITY,
  //     });
  //   }
  // }, [cart]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const orderAPi = await GetOrder();
        console.log(orderAPi?.result, "result");
        if (orderAPi?.status === true) {
          if (JSON.stringify(orderAPi.result) !== JSON.stringify(order)) {
            setOrder(orderAPi.result);
            dispatch({
              type: reducerCases.SET_CART,
              cart: orderAPi.result.productOrder,
            });
            dispatch({
              quantity: orderAPi.result.totalProduct,
              type: reducerCases.SET_QUANTITY,
            });
          }
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

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      if (heightContainer || containerHeight != heightContainer) {
        setHeightContainer(containerHeight);
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsWindow(window.innerWidth > 756);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Container height={heightContainer}>
      <div className="header-parent">
        <div className="container_nobo" ref={containerRef}>
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
            <div
              className="cart container_nobo-item4 details-child"
              ref={vdRef}
            >
              <AiOutlineShoppingCart onClick={() => handlerClick()} />
              <span className="cart-count">
                {loading ? <FaSpinner className="loading-icon" /> : quantity}
              </span>
              {showCart && (
                <div className="vd">
                  {cart?.length > 0 ? (
                    <>
                      <ul>
                        {console.log(cart, "cart")}
                        {cart?.map((cart, index) => (
                          <li key={cart?.id}>
                            <img
                              src={processApiImagePath(cart?.image)}
                              alt=""
                            />
                            <div>
                              <div>{cart?.name}</div>
                              <div>{cart?.price.toLocaleString()}đ</div>
                              <div>Số lượng: {cart?.quantity}</div>
                            </div>
                            <button
                              onClick={() => {
                                handlerRemove(cart.id);
                              }}
                            >
                              Xóa
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div style={{ textAlign: "right", paddingRight: "10px" }}>
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
              onMouseOver={mouseOver}
              onMouseLeave={mouseLeave}
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
                    <img
                      src={
                        processApiImagePath(user.image) ||
                        require("../Assets/Image/nologin.jpg")
                      }
                      alt=""
                    />
                    <div>{user?.displayName}</div>
                    {showAccount && (
                      <div className="account-child">
                        <div
                          onClick={() => {
                            navigate("/account/profile");
                          }}
                        >
                          Thông tin cá nhân
                        </div>
                        <div onClick={() => handleLogout()}>Đăng xuất</div>
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
      </div>
      {!isWindow ? (
        <div className="search" ref={searchRef}>
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
      ) : null}

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
  overflow: hidden;
  height: auto;
  z-index: 3;
  .header-parent {
    height: ${(props) => `${props.height}px`};
    margin-bottom: 10px;

    .container_nobo {
      padding: 10px;

      width: 100%;
      position: fixed;
      box-sizing: border-box;
      background-color: rgb(244, 245, 250);
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
      box-sizing: border-box;
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
      }
      .account-child {
        position: absolute;
        top: 40px;
        right: 10px;
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 200px;
        text-align: center;
      }

      .account-child div {
        padding: 10px;
        cursor: pointer;
        color: #333;
        transition: background-color 0.3s, color 0.3s;
      }

      .account-child div:hover {
        background-color: #5cb85c;
        color: #ffffff;
      }

      .hover:hover {
        color: red;
        cursor: pointer;
      }

      .details {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
        width: auto;
      }
      .details-child {
        display: flex;
        align-items: center;
      }
      .details-child.svg {
        margin-right: 5px;
        color: red;
      }
      .details-child:not(last-child) {
        margin-right: 10px;
      }
      .details-child .search {
        position: relative;
        margin: auto;
      }
      .search input {
        width: 200px;

        height: 30px;
      }
      .search button {
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

      .search button svg {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }

      .cart {
        position: relative;
        display: inline-block;

        color: red;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .cart .cart-count {
        position: absolute;
        top: -10px;
        right: -8px;
        background-color: red;
        color: white;
        border-radius: 50%;
        font-size: 12px;
        width: 20px;
        height: 20px;
        text-align: center;
      }
      .cart .cart-count .loading-icon {
        font-size: 12px;
        color: #6e7072;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .cart svg {
        width: 2rem;
        height: 2rem;
        color: black;
      }
      @media (max-width: 768px) {
        margin: 0;
        box-sizing: border-box;

        .hidden {
          display: none;
        }
        .search {
          display: none;
        }
      }
    }
  }
  .searchmini {
    position: absolute;
    top: 4.5rem;
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
    z-index: 3;
    background-color: #f5f5f5;
  }
  .search {
    display: flex;
    align-items: center;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    background-color: white;
  }

  .search input {
    flex: 1;
    border: none;
    padding: 10px;
    font-size: 16px;
  }

  .search button {
    background-color: #007bff;
    border: none;
    color: #fff;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .search button:hover {
    background-color: #0056b3;
  }

  .vd {
    z-index: 4;
    width: 300px;
    height: auto;

    background-color: white;
    position: absolute;
    top: 40px;
    right: 0px;
    overflow: auto;
    padding: 10px;
    ul {
      list-style: none;
      padding: 0;
      max-height: 300px;
      overflow-y: auto;
    }

    li {
      display: flex;
      margin: 10px 0;
      border: 1px solid #ddd;
    }
    li:first-child {
      margin-top: 0;
    }

    li img {
      max-width: 80px;
      max-height: 80px;
      margin-right: 10px;
    }

    /* Định dạng thông tin sản phẩm */
    li div {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* Định dạng tên sản phẩm */
    li div > div:first-child {
      font-weight: bold;
      font-size: 14px;
    }

    li div > div:nth-child(2) {
      font-size: 12px;
      color: #333;
    }

    /* Định dạng số lượng sản phẩm */
    li div > div:last-child {
      font-size: 12px;
      color: #777;
    }

    button {
      background-color: #835c59;
      color: #fff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 14px;
    }

    button:hover {
      background-color: #d32f2f;
    }

    div.vd {
      text-align: center;
    }

    div.vd > ul {
      margin: 0;
    }

    div.vd > div:last-child {
      font-size: 16px;
      margin-top: 10px;
      color: #007bff;
    }

    div.direction {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    div.direction > div {
      cursor: pointer;
      font-size: 16px;
      background-color: #007bff;
      border-radius: 5px;
      color: #fff;
      padding: 10px 20px;
      border: none;
      transition: background-color 0.3s;
    }

    div.direction > div:hover {
      background-color: #0056b3;
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

  @media screen and (max-width: 756px) {
    .information {
      padding: 0 20px;
    }
  }
  @media screen and (max-width: 1300px) {
    .container_nobo .details .container_nobo-item1 {
      /* display: none; */
      display: none;
    }
    .container_nobo .details .container_nobo-item2 {
      display: none;
    }
  }

  .notification {
    .notification-count {
      border-radius: 50%;
      height: 20px;
      width: 20px;
      background-color: red;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -10px;
      left: 11px;
    }
    svg {
      height: 26px;
      width: 26px;
    }
  }
`;

export default Header;
