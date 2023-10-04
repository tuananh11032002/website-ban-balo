import React, { useState } from "react";
import styled from "styled-components";

const OrderPage = () => {
  const [data, setData] = useState([
    {
      orderID: "12345",
      customerName: "Nguyễn Văn A",
      orderDate: "2023-09-10",
      totalAmount: 250.0,
      status: "Hoàn thành",
      shippingAddress: "123 Đường ABC, Quận XYZ, Thành phố HCM",
      items: [
        {
          productID: "789",
          productName: "Sản phẩm A",
          quantity: 2,
          pricePerUnit: 50.0,
          imageURL:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
        {
          productID: "456",
          productName: "Sản phẩm B",
          quantity: 3,
          pricePerUnit: 30.0,
          imageURL:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
        {
          productID: "789",
          productName: "Sản phẩm C",
          quantity: 1,
          pricePerUnit: 70.0,
          imageURL:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
      ],
    },
    {
      orderID: "12345",
      customerName: "Nguyễn Văn A",
      orderDate: "2023-09-10",
      totalAmount: 250.0,
      status: "Hoàn thành",
      shippingAddress: "123 Đường ABC, Quận XYZ, Thành phố HCM",
      items: [
        {
          productID: "789",
          productName: "Sản phẩm A",
          quantity: 2,
          pricePerUnit: 50.0,
          imageURL:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
        {
          productID: "456",
          productName: "Sản phẩm B",
          quantity: 3,
          pricePerUnit: 30.0,
          imageURL:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
        {
          productID: "789",
          productName: "Sản phẩm C",
          quantity: 1,
          pricePerUnit: 70.0,
          imageURL:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
      ],
    },
  ]);
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  return (
    <Container>
      <div className="navbar">
        <div
          className={`nav-item ${activeItem === 0 ? "active" : ""}`}
          onClick={() => handleItemClick(0)}
        >
          Tất cả
        </div>
        <div
          className={`nav-item ${activeItem === 1 ? "active" : ""}`}
          onClick={() => handleItemClick(1)}
        >
          Chờ thanh toán
        </div>
        <div
          className={`nav-item ${activeItem === 2 ? "active" : ""}`}
          onClick={() => handleItemClick(2)}
        >
          Đang giao
        </div>
        <div
          className={`nav-item ${activeItem === 3 ? "active" : ""}`}
          onClick={() => handleItemClick(3)}
        >
          Hoàn thành
        </div>
        <div
          className={`nav-item ${activeItem === 4 ? "active" : ""}`}
          onClick={() => handleItemClick(4)}
        >
          Đã hủy
        </div>
      </div>
      {data?.length >= 0
        ? data.map((da, index) => {
            return (
              <div className="order-child">
                <div className="header">
                  <div>Mã số đơn hàng: {da.orderID}</div>
                  <div>Tình trạng đơn hàng: {da.status}</div>
                </div>
                <div className="body">
                  {da.items.map((item, index) => {
                    return (
                      <div className="item">
                        <img src={item.imageURL} alt="" />
                        <div>
                          <span>{item.productName}</span>
                          <span>Số lượng {item.quantity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="footer">
                  <div className="price">
                    <div className="price-total">
                      <div>Tổng tiền: </div>
                      <div className="price-label">
                        {da.totalAmount.toLocaleString()}00000đ
                      </div>
                    </div>
                    <div className="price-total">
                      <div>Phí vận chuyển:</div>
                      <div className="price-label">
                        {da.totalAmount.toLocaleString()}00000đ
                      </div>
                    </div>
                    <div className="price-total">
                      <div>Giảm giá:</div>
                      <div className="price-label">
                        {da.totalAmount.toLocaleString()}00000đ
                      </div>
                    </div>
                    <div className="price-total">
                      <div>Thành tiền: </div>
                      <div className="price-label">
                        {" "}
                        {da.totalAmount.toLocaleString()}00000đ
                      </div>
                    </div>
                  </div>

                  <div className="button">
                    <div>Liên hệ người bán</div>
                    <div>Mua lại</div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </Container>
  );
};
const Container = styled.div`
  padding: 20px;
  .navbar {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #007bff;
  }

  .nav-item {
    cursor: pointer;
    padding: 5px 20px;
    color: #ffffff;
    text-align: center;
  }

  .nav-item.active {
    border-bottom: 1px solid #ffffff;
  }
  .order-child {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      font-weight: bold;
    }
    .body {
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        & > div {
          display: grid;
        }
        img {
          max-width: 80px;
          max-height: 80px;
          margin-right: 10px;
        }
        .item-details {
          display: flex;
          flex-direction: column;
          span {
            margin: 2px 0;
          }
        }
      }
    }
    .footer {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-top: 10px;
      align-items: flex-end;

      button {
        padding: 5px 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
        margin-left: 10px;
        &:first-child {
          background-color: #28a745;
        }
      }
      .price-total {
        display: flex;
        justify-content: flex-end;
        .price-label {
          min-width: 15rem;
          text-align: right;
          font-size: 14px;
        }
      }
    }
  }
`;

export default OrderPage;
