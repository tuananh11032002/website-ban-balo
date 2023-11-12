import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useStateProvider } from "../../StateProvider/StateProvider";
import {
  AddProductIntoOrder,
  DeleteProductIntoOrder,
  GetOrder,
  GetProductIntoOrder,
} from "../../Axios/web";
import { reducerCases } from "../../StateProvider/reducer";
import { Link, useNavigate } from "react-router-dom";
import ProductAddedMessage from "./ProductAddedMessage";
import processApiImagePath from "../../Helper/EditLinkImage";
const Table = () => {
  const navigate = useNavigate();

  const [{ cart, loading, user }, dispatch] = useStateProvider();
  const [count, setCount] = useState(cart);
  const [showProductAdded, setShowProductAdded] = useState(false);
  const handleCloseMessage = () => {
    setShowProductAdded(false);
  };
  const handleAddToCart = () => {
    setShowProductAdded(true);
  };

  useEffect(() => {
    setCount(cart);
  }, [cart]);

  const handleIncrease = (index) => {
    const updatedCount = [...count];
    updatedCount[index] = { ...updatedCount[index] };
    updatedCount[index].quantity = updatedCount[index].quantity + 1;
    setCount(updatedCount);
  };
  const handleDecrease = (index) => {
    const updatedCount = [...count];
    updatedCount[index] = { ...updatedCount[index] };
    updatedCount[index].quantity =
      updatedCount[index].quantity - 1 >= 0
        ? updatedCount[index].quantity - 1
        : 0;
    setCount(updatedCount);
  };
  const SaveData = async (productdetail, dem) => {
    const response = await AddProductIntoOrder(productdetail.id, {
      Price: productdetail.price,
      Quantity: dem,
    });
  };
  const DeleteData = async (productdetail) => {
    const response = await DeleteProductIntoOrder(productdetail.id);
  };
  const fetchCart = async () => {
    if (user) {
      const data = await GetOrder();
      if (data?.status)
        dispatch({ type: reducerCases.SET_CART, cart: data.productOrder });
    } else {
      const data = localStorage.getItem("webbanbalo_cart");
      if (data)
        dispatch({ type: reducerCases.SET_CART, cart: JSON.parse(data) });
    }
  };
  const handleClick = (cart, count) => {
    cart?.forEach(async (element, index) => {
      if (
        element.quantity !== count[index].quantity &&
        count[index].quantity !== 0
      ) {
        if (user) {
          await SaveData(element, count[index].quantity);
          dispatch({ type: reducerCases.SET_CART, cart: count });
        } else {
          let cartTemp = JSON.parse(localStorage.getItem("webbanbalo_cart"));
          cartTemp[index].quantity = count[index].quantity;
          localStorage.setItem("webbanbalo_cart", JSON.stringify(cartTemp));
          dispatch({ type: reducerCases.SET_CART, cart: count });
        }
      } else if (count[index].quantity == 0) {
        if (user) {
          await DeleteData(element, user.token.accessToken);
          fetchCart();
        } else {
          let cartTemp = JSON.parse(localStorage.getItem("webbanbalo_cart"));
          cartTemp.splice(index, 1);
          localStorage.setItem("webbanbalo_cart", JSON.stringify(cartTemp));
          fetchCart();
        }
      }
    });

    setShowProductAdded(true);
    dispatch({ type: reducerCases.SET_LOADING, loading: true });

    setTimeout(() => {
      dispatch({ type: reducerCases.SET_LOADING, loading: false });
    }, 400);
  };
  return (
    <>
      <ProductAddedMessage
        show={showProductAdded}
        onClose={handleCloseMessage}
        child="Cập nhật thành công"
      />
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
                  <img src={processApiImagePath(count.image)} alt="" />
                </td>
                <td>{count.name}</td>
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
          className="custom-button update"
          onClick={() => {
            handleClick(cart, count);
          }}
        >
          Cập nhật
        </div>
        <div
          className="custom-button payment"
          onClick={() => {
            navigate("/pay");
          }}
        >
          Thanh toán
        </div>
      </DivContainer>
    </>
  );
};
const LinkCustome = styled(Link)`
  text-decoration: none;
  color: black;
`;
const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0 auto;
  margin-top: 20px;
  max-width: 80%;
  .custom-button {
    user-select: none;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
    text-align: center;
    transition: background-color 0.3s;
    color: #007bff;
    background-color: #fff;
  }
  .custom-button:first-child {
    margin-right: 10px;
  }

  .custom-button.update {
    background-color: #007bff;
    color: #fff;
  }

  .custom-button.payment {
    background-color: #ff6f61;
    color: #fff;
  }

  .custom-button.update:hover {
    background-color: #0056b3;
    color: #fff;
  }

  .custom-button.update:active {
    background-color: #007bff;
    color: #fff;
  }

  .custom-button.payment:hover {
    background-color: #f64333;
    color: #fff;
  }

  .custom-button.payment:active {
    background-color: #ff6f61;
    color: #fff;
  }
`;
const Container = styled.table`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  margin-top: 10px;
  thead tr {
    background-color: #333;
    color: #fff;
  }

  thead th {
    padding: 10px;
  }

  tbody td {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  tbody td img {
    max-width: 100px;
    max-height: 100px;
  }

  tbody td div {
    display: flex;
    align-items: center;
  }

  tbody td div > div {
    cursor: pointer;
    padding: 5px;
    width: 20px;
    height: 20px;
    justify-content: center;
    background-color: #007bff;
    color: #fff;
    user-select: none;

    border-radius: 50%;
    margin: 0 5px;
  }

  tbody td:last-child {
    font-weight: bold;
  }
`;

export default Table;
