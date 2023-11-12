import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import {
  AddProductIntoOrder,
  GetProductIntoOrder,
  getProductApiById,
} from "../../Axios/web";

import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
import { useLocation } from "react-router-dom";
import ProductAddedMessage from "./ProductAddedMessage";
import processApiImagePath from "../../Helper/EditLinkImage";

const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const [{ productdetail, quantity, cart, user }, dispatch] =
    useStateProvider();
  const navigate = useNavigate();
  const params = useParams();
  const { pathname } = useLocation();
  const [showProductAdded, setShowProductAdded] = useState(false);

  const handleAddToCart = () => {
    setShowProductAdded(true);
  };

  const handleCloseMessage = () => {
    setShowProductAdded(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handlerClick = () => {
    const SaveData = async (productdetail) => {
      const datafilter = cart?.filter((cart) => {
        return cart.id == productdetail.id;
      });
      let response;
      if (user) {
        if (datafilter?.length > 0) {
          response = await AddProductIntoOrder(
            params.productId,

            {
              Price: productdetail.price,
              Quantity: datafilter[0].quantity + count,
            }
          );
        } else {
          response = await AddProductIntoOrder(params.productId, {
            Price: productdetail.price,
            Quantity: count,
          });
        }
        dispatch({ type: reducerCases.SET_LOADING, loading: true });

        const data = await GetProductIntoOrder();
        setTimeout(() => {
          dispatch({ type: "SET_LOADING", loading: false });
        }, 20000);
        dispatch({ type: reducerCases.SET_CART, cart: data.result });
      } else {
        navigate("/login");
        // var cartTemp = localStorage.getItem("webbanbalo_cart");
        // if (datafilter?.length > 0) {
        //   const result = JSON.stringify(
        //     JSON.parse(cartTemp)?.map((pro) =>
        //       datafilter[0].product.id == pro.product.id
        //         ? {
        //             quantity: count + pro.quantity,
        //             product: productdetail,
        //             price: pro.price,
        //           }
        //         : pro
        //     )
        //   );
        //   localStorage.setItem("webbanbalo_cart", result);
        //   dispatch({
        //     type: reducerCases.SET_CART,
        //     cart: JSON.parse(localStorage.getItem("webbanbalo_cart")),
        //   });
        // } else {
        //   localStorage.setItem(
        //     "webbanbalo_cart",
        //     JSON.stringify([
        //       ...JSON.parse(cartTemp),
        //       {
        //         price: productdetail.price,
        //         quantity: count,
        //         product: productdetail,
        //       },
        //     ])
        //   );
        //   dispatch({
        //     type: reducerCases.SET_CART,
        //     cart: JSON.parse(localStorage.getItem("webbanbalo_cart")),
        //   });
        // }
      }

      handleAddToCart();
      if (response) {
        dispatch({ type: reducerCases.SET_ADDPRODUCT, addproduct: true });

        setTimeout(() => {
          dispatch({ type: reducerCases.SET_ADDPRODUCT, addproduct: false });
        }, 200);
        dispatch({ type: reducerCases.SET_PRODUCTDETAIL, productdetail });
      }
    };

    SaveData(productdetail);
  };
  useEffect(() => {
    const fetchData = async () => {
      const dataDetail = await getProductApiById(params.productId);
      if (productdetail?.result !== dataDetail) {
        dispatch({
          type: reducerCases.SET_PRODUCTDETAIL,
          productdetail: dataDetail.result,
        });
      }
    };
    fetchData();
  }, [params.productId]);

  return (
    <div>
      <Header />
      <Container>
        <ProductAddedMessage
          show={showProductAdded}
          onClose={handleCloseMessage}
        />

        <div className="body">
          <div className="productdetail__image">
            <img src={processApiImagePath(productdetail?.image[0]) || null} />
          </div>
          <div className="productdetail__infor">
            <div style={{ fontSize: "2rem", borderBottom: "1px solid black" }}>
              {productdetail?.name}
            </div>
            <div style={{ color: "red", fontSize: "1.5rem" }}>
              {productdetail?.price.toLocaleString()}đ
            </div>
            <div className="introduce">
              Chẳng ai muốn phải lục tìm món đồ mình cần trong một chiếc balo.
              Để chuẩn bị cho hành trang gọn gàng, sắp xếp mọi thứ tối ưu hơn
              thì bạn không thể bỏ lỡ Slash Backpack. Rung động trong thiết kế
              ngăn đa dạng và thể tích chứa lớn, sẵn sàng giúp bạn tự tin gói
              gọn nhiều món đồ cần mang theo.
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
            <div className="quantity-container">
              <span className="quantity-label">Số lượng:</span>
              <div className="total">
                <button
                  className="add"
                  onClick={() => setCount(Math.max(0, count - 1))}
                >
                  -
                </button>
                <div className="count-container">
                  <input
                    className="count"
                    value={count}
                    type="number"
                    onChange={(e) => {
                      setCount(
                        e.target.value > productdetail?.soluong
                          ? productdetail?.soluong
                          : e.target.value
                      );
                    }}
                  />
                </div>
                <button
                  className="add"
                  onClick={() =>
                    setCount(
                      count + 1 > productdetail?.soluong
                        ? productdetail?.soluong
                        : count + 1
                    )
                  }
                >
                  +
                </button>
              </div>

              <span className="quantity-label">
                {productdetail?.soluong} sản phẩm có sẵn
              </span>
            </div>
            {/* <div className="button-parent">
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
            </div> */}
            <div className="button-parent">
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
                <div className="button" style={{ backgroundColor: "red" }}>
                  Hàng tạm hết
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      <div>
        <Footer />
      </div>
    </div>
  );
};
const Container = styled.div`
  max-width: 100%;

  background-color: #ededed;
  overflow: hidden;
  padding-bottom: 20px;
  .body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 0 20px;
  }
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
    margin-top: 20px;
    .button {
      cursor: pointer;
      padding: 10px 20px;
      background-color: #3498db;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      transition: background-color 0.3s;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }

    .button.red {
      background-color: #e74c3c;
    }

    .button.red:hover {
      background-color: red;
    }
    .button:hover {
      background-color: #2980b9;
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
    max-width: 50%;
  }
  .productdetail__image img {
    width: 100%;
  }

  .quantity-container {
    display: flex;
    align-items: center;
    .quantity-label {
      font-size: 1.2rem;
      margin-right: 10px;
    }

    .total {
      display: flex;
      align-items: center;
    }

    .count-container {
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 5px 10px;
      display: flex;
      align-items: center;
    }

    .count {
      background-color: #f2f2f2;
      border: none;
      outline: none;
      font-size: 1.2rem;
      margin: 0 10px;
      max-width: 50px;
    }

    .add {
      width: 30px;
      height: 30px;
      background-color: #3498db;
      color: #fff;
      border: none;
      cursor: pointer;
      font-weight: bold;
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin: 0 10px;
    }

    .add:hover {
      background-color: #2980b9;
    }
  }

  @media screen and (max-width: 756px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .productdetail__image {
      flex: none;
      width: 100%;
    }
    .productdetail__image img {
      object-fit: cover;
    }
    .productdetail__infor {
      flex: 1;
    }
  }
  @media screen and (max-width: 950px) {
    .productdetail__image {
      flex: 0.5;
    }
  }
  @media screen and (max-width: 765px) {
    .productdetail__image,
    .productdetail__infor {
      min-width: 100%;
    }
  }
`;

export default ProductDetail;
