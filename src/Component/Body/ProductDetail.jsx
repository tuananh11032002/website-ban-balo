import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import {
  AddProductIntoOrder,
  GetProductIntoOrder,
  getProductApi,
} from "../../Axios/web";

import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const [{ productdetail, quantity, cart }, dispatch] = useStateProvider();

  const params = useParams();
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
        return cart?.product.id === productdetail.id;
      });
      if (datafilter.length > 0) {
        const response = await AddProductIntoOrder(params.productId, 1, {
          Price: productdetail.price,
          Quantity: datafilter[0].quantity + count,
        });
      } else {
        const response = await AddProductIntoOrder(params.productId, 1, {
          Price: productdetail.price,
          Quantity: count,
        });
      }
      dispatch({ type: reducerCases.SET_PRODUCTDETAIL, productdetail });
    };
    const getCart = async () => {
      const response = await GetProductIntoOrder();
      dispatch({ type: reducerCases.SET_CART, cart: response });
      dispatch({ type: reducerCases.SET_QUANTITY, quantity: response.length });
    };

    SaveData(productdetail);
    getCart();
  };
  console.log("productdetail");
  return (
    <div>
      <Header />
      <Container>
        <div className="productdetail__image">
          <img src={productdetail?.image || null} />
        </div>
        <div className="productdetail__infor">
          <div style={{ fontSize: "2rem" }}>{productdetail?.name}</div>
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

          <button
            onClick={() => {
              handlerClick();
            }}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </Container>
      <div>
        <Footer />
      </div>
    </div>
  );
};
const Container = styled.div`
  margin-bottom: 20vh;
  .color {
    background-color: red;
    display: inline-block;
    height: 2.5rem;
    width: 2.5rema;
    border-radius: 50%;
  }
  button {
  }
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: #ededed;
  .productdetail__infor {
  }
  .productdetail__image {
    display: flex;
    justify-content: center;
    align-items: center;
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
`;

export default ProductDetail;
