import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import {
  AddProductIntoOrder,
  GetProductIntoOrder,
  getProductApi,
} from "../../Axios/web";

import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
import { useLocation } from "react-router-dom";
import ProductAddedMessage from "./ProductAddedMessage";

const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const [{ productdetail, quantity, cart, user }, dispatch] =
    useStateProvider();
  const navigate = useNavigate();
  const params = useParams();
  const { pathname } = useLocation();
  const [showProductAdded, setShowProductAdded] = useState(false);
  console.log("productdetail", user);

  const handleAddToCart = () => {
    setShowProductAdded(true);
  };

  const handleCloseMessage = () => {
    setShowProductAdded(false);
  };
  useEffect(() => {
    window.scrollTo(0, 100);
  }, [pathname]);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getProductApi(params.productId);
      dispatch({ type: reducerCases.SET_PRODUCTDETAIL, productdetail: data });
    };
    fetchdata();
  }, [params.productId]);
  const handlerClick = () => {
    const SaveData = async (productdetail) => {
      const datafilter = cart.filter((cart) => {
        return cart?.product.id == productdetail.id;
      });
      let response;
      if (user) {
        if (datafilter.length > 0) {
          response = await AddProductIntoOrder(
            params.productId,

            {
              Price: productdetail.price,
              Quantity: datafilter[0].quantity + count,
            },
            user.token.accessToken
          );
        } else {
          response = await AddProductIntoOrder(
            params.productId,
            {
              Price: productdetail.price,
              Quantity: count,
            },
            user.token.accessToken
          );
        }
      } else {
        var cartTemp = localStorage.getItem("webbanbalo_cart");

        if (datafilter.length > 0) {
          const result = JSON.stringify(
            JSON.parse(cartTemp)?.map((pro) =>
              datafilter[0].product.id == pro.product.id
                ? {
                    quantity: count + pro.quantity,
                    product: productdetail,
                    price: pro.price,
                  }
                : pro
            )
          );
          localStorage.setItem("webbanbalo_cart", result);
          dispatch({
            type: reducerCases.SET_CART,
            cart: JSON.parse(localStorage.getItem("webbanbalo_cart")),
          });
        } else {
          localStorage.setItem(
            "webbanbalo_cart",
            JSON.stringify([
              ...JSON.parse(cartTemp),
              {
                price: productdetail.price,
                quantity: count,
                product: productdetail,
              },
            ])
          );
          dispatch({
            type: reducerCases.SET_CART,
            cart: JSON.parse(localStorage.getItem("webbanbalo_cart")),
          });
        }
      }

      handleAddToCart();
      if (response) {
        dispatch({ type: reducerCases.SET_LOADING, loading: true });

        setTimeout(() => {
          dispatch({ type: reducerCases.SET_LOADING, loading: false });
        }, 400);
        dispatch({ type: reducerCases.SET_PRODUCTDETAIL, productdetail });
      }
    };

    SaveData(productdetail);
  };
  return (
    <div>
      <Header />
      <Container>
        <ProductAddedMessage
          show={showProductAdded}
          onClose={handleCloseMessage}
        />

        <div className="productdetail__image">
          <img src={productdetail?.image || null} />
        </div>
        <div className="productdetail__infor">
          <div style={{ fontSize: "2rem", borderBottom: "1px solid black" }}>
            {productdetail?.name}
          </div>
          <div style={{ color: "red", fontSize: "1.5rem" }}>
            {productdetail?.price.toLocaleString()}đ
          </div>
          <div className="introduce">
            Chẳng ai muốn phải lục tìm món đồ mình cần trong một chiếc balo. Để
            chuẩn bị cho hành trang gọn gàng, sắp xếp mọi thứ tối ưu hơn thì bạn
            không thể bỏ lỡ Slash Backpack. Rung động trong thiết kế ngăn đa
            dạng và thể tích chứa lớn, sẵn sàng giúp bạn tự tin gói gọn nhiều
            món đồ cần mang theo.
          </div>
          <br />
          <div>
            {productdetail?.description || null}
            THÔNG TIN SẢN PHẨM: Chất liệu: Vải Polyester Canvas cao cấp trượt
            nước Kích thước: 42cm x 32cm x 16cm Bao gồm 12 ngăn: 1 ngăn chống
            sốc, 3 ngăn lớn, 5 ngăn phụ, 2 ngăn bên hong, 1 ngăn phụ phía sau
            Ngăn chống sốc đựng vừa laptop 15.6 inch
          </div>
          <div>
            <span className="color"></span>
            <span className="color"></span>
            <span className="color"></span>
            <span className="color"></span>
            <span className="color"></span>
          </div>
          <div style={{ display: "flex" }}>
            Số lượng: &nbsp;
            <div className="total">
              <button
                className="add"
                onClick={() => {
                  setCount((pre) => {
                    if (pre > 0) {
                      setCount(pre - 1);
                    } else {
                      setCount(0);
                    }
                  });
                }}
              >
                -
              </button>
              <div>{count}</div>
              <button
                className="add"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="button-parent">
            <>
              <div
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlerClick();
                }}
              >
                Thêm vào giỏ hàng
              </div>
              <div
                className="button red"
                onClick={() => {
                  navigate("/pay");
                }}
              >
                Mua ngay
              </div>
            </>
          </div>

          {/* <div className="button-parent">
            {productdetail?.soluong != 0 ? (
              <>
                <div
                  className="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlerClick();
                  }}
                >
                  Thêm vào giỏ hàng
                </div>
                <div
                  className="button red"
                  onClick={() => {
                    navigate("/pay");
                  }}
                >
                  Mua ngay
                </div>
              </>
            ) : (
              <div className="button">Hàng tạm hết</div>
            )}
          </div> */}
        </div>
      </Container>
      <div>
        <Footer />
      </div>
    </div>
  );
};
const Container = styled.div`
  padding: 0 80px;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #ededed;
  overflow: hidden;
  .red {
    background-color: red;
    color: white;
  }
  .color {
    display: inline-block;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
  }
  .button-parent {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    .button {
      border: 1px solid;
      width: 176px;
      height: 47px;
      border-color: red;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: bold;

      justify-content: center;
      &:first-child {
        margin-right: 20px;
      }
      flex: 1;
    }
  }

  .productdetail__infor {
    flex: 0.5;
  }
  .productdetail__image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 70%;
  }
  .total {
    width: 9rem;
    border: 1px solid;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .add {
    outline: none;
    border: none;
    width: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      color: red;
    }
  }
  @media screen and (max-width: 756px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .productdetail__image {
      flex: none;
      width: 100%;
      img {
        object-fit: cover;
      }
    }
    .productdetail__infor {
      flex: 1;
    }
  }
`;

export default ProductDetail;
