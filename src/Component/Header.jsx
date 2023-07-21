import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiTwotonePhone,
  AiOutlineMail,
} from "react-icons/ai";
import styled from "styled-components";
import Information from "./Header/Information";
import Controller from "./Header/Controller";
import { useStateProvider } from "../StateProvider/StateProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { reducerCases } from "../StateProvider/reducer";
import {
  DeleteProductIntoOrder,
  GetProductIntoOrder,
  GetProductSearch,
} from "../Axios/web";
import _ from "lodash";
import SearchMini from "./Header/SearchMini";

const Header = () => {
  console.log("Header");
  const navigate = useNavigate();
  const [{ quantity, cart }, dispatch] = useStateProvider();
  const [showCart, setShowCart] = useState(false);
  const vdRef = useRef(null);
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [productSearch, setProductSearch] = useState([]);

  const handlerClick = () => {
    setShowCart(!showCart);
  };
  const handlerClickSearch = () => {
    setIsFocused(!isFocused);
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
  const handlerRemove = async (productid) => {
    const response = await DeleteProductIntoOrder(productid);
    dispatch({ type: reducerCases.SET_CART, cart: [] });
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
    const fetchCart = async () => {
      const data = await GetProductIntoOrder();

      if (JSON.stringify(data) !== JSON.stringify(cart)) {
        dispatch({ type: reducerCases.SET_CART, cart: data });
      }
    };
    fetchCart();
  }, [cart]);

  useEffect(() => {
    dispatch({ quantity: cart?.length, type: reducerCases.SET_QUANTITY });
  }, [cart]);
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

  return (
    <Container>
      <div className="container_nobo">
        <div className="branch hover">
          <LinkCustome to={"/"}>TuanAnh Brand ®</LinkCustome>
        </div>
        <div className="details">
          <h3 className="space hover">
            <AiTwotonePhone /> 0987654321
          </h3>
          <h3 className="space hover">
            <AiOutlineMail />
            ttuananh372@gmail.com
          </h3>
          <div className="search" ref={searchRef}>
            <input
              ref={inputRef}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={() => handlerChange()}
              type="text"
              placeholder="Nhập sản phẩm cần tìm"
            ></input>
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
          <div className="cart" ref={vdRef}>
            <AiOutlineShoppingCart onClick={() => handlerClick()} />
            <span className="cart-count">{quantity}</span>
            {showCart && (
              <div className="vd">
                {cart?.length > 0 ? (
                  <>
                    <ul>
                      {cart?.map((cart, index) => (
                        <li
                          key={cart?.product.id}
                          style={{ "--index": index + 1 }}
                        >
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
                    <div className="direction">
                      <div
                        onClick={() => {
                          setShowCart(false);

                          navigate("/cart");
                        }}
                      >
                        Tuỳ chỉnh
                      </div>
                      <div>Thanh toán</div>
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
        </div>
      </div>

      <div className="information">
        <Information />
        <hr />
        <Controller />
        <hr />
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
  /* position: relative; */

  .vd {
    z-index: 4;
    width: 300px;
    height: auto;
    background-color: white;
    position: absolute;
    top: 70px;
    right: 0px;
    overflow: auto;
    ul {
      width: 100%;
      padding-inline-start: 0;
      width: 100%;
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
  .sticky {
    position: sticky;
    width: 100%;
  }
  .information {
    position: relative;
    box-sizing: border-box;
    padding-left: 5rem;
    padding-right: 5rem;
    hr {
      margin-top: 2rem;
    }
  }
  .container_nobo {
    font-size: 1rem;
    top: 0;
    position: sticky;
    margin: 0;

    padding-left: 6rem;
    padding-right: 6rem;
    box-sizing: border-box;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 100000000;
    .hover {
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
    .details {
      display: flex;
      justify-content: end;
      .space {
        margin: 2rem;
        svg {
          position: absolute;
          left: -1.2rem;
          bottom: 0.5rem;
        }
      }
      .search {
        position: relative;

        input {
          margin: 1.8rem 1.5rem 0 0;
          width: 90%;
        }
        button {
          margin-right: 0.5rem;
        }
        .searchmini {
          position: absolute;
          z-index: 20;
          top: 4rem;
          width: 94%;
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
          top: 5px;
          right: -10px;
          background-color: red;
          color: white;
          border-radius: 50%;
          padding: 4px 8px;
          font-size: 12px;
        }

        svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }
`;
export default Header;
