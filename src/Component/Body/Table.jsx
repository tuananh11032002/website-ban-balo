import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { AddProductIntoOrder } from "../../Axios/web";
import { reducerCases } from "../../StateProvider/reducer";
const Table = () => {
  console.log("table");
  const [{ cart }, dispatch] = useStateProvider();
  const [count, setCount] = useState(cart);
  useEffect(() => {
    setCount(cart);
  }, [cart]);

  const handleIncrease = (index) => {
    setCount((pre) => {
      return pre.map((pres, i) =>
        index == i ? { ...pres, quantity: pres.quantity + 1 } : pres
      );
    });
  };
  const handleDecrease = (index) => {
    setCount((pre) => {
      return pre.map((pres, i) =>
        index == i ? { ...pres, quantity: pres.quantity - 1 } : pres
      );
    });
  };
  const handleClick = (cart, count) => {
    const SaveData = async (productdetail, dem) => {
      const response = await AddProductIntoOrder(productdetail.id, 1, {
        Price: productdetail.price,
        Quantity: dem,
      });
    };
    cart?.forEach((element, index) => {
      console.log(element.quantity, "element.quantity");
      console.log(count[index].quantity, "count");
      if (element.quantity != count[index].quantity) {
        SaveData(element.product, count[index].quantity);
        dispatch({ type: reducerCases.SET_CART, cart: count });
      }
    });
  };
  return (
    <>
      <Container>
        <thead>
          <tr>
            <th colSpan="2">Thông tin sản phẩm</th>
            <th>Đơn giá</th>
            <th> Số lượng</th>
            <th>Tổng giá</th>
          </tr>
        </thead>
        <tbody>
          {count?.map((count, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={count.product.image} alt="" />
                </td>
                <td>{count.product.name}</td>
                <td>{count.price.toLocaleString()}đ</td>
                <td>
                  <div>
                    <div
                      onClick={() => {
                        handleDecrease(index);
                      }}
                    >
                      -
                    </div>
                    <div>{count.quantity}</div>
                    <div
                      onClick={() => {
                        handleIncrease(index);
                      }}
                    >
                      +
                    </div>
                  </div>
                </td>
                <td>{(count.quantity * count.price).toLocaleString()}đ</td>
              </tr>
            );
          })}
        </tbody>
      </Container>
      <DivContainer>
        <div
          onClick={() => {
            handleClick(cart, count);
          }}
        >
          Cập nhật
        </div>
        <div>Thanh toán</div>
      </DivContainer>
    </>
  );
};
const DivContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 5% 10%;

  div {
    margin-right: 2%;
    height: 2rem;
    width: 6rem;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }
`;
const Container = styled.table`
  margin: 5% 10%;

  thead {
    tr {
      th {
        border: 1px solid;
        width: 20vw;
        background-color: black;
        color: white;
      }
    }
  }
  tbody {
    tr {
      td {
        border: 1px solid #ddd;
        text-align: center;
        div {
          margin: 0 10%;
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid;
            user-select: none;
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;

export default Table;
