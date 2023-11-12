import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GetOrderDone } from "../../Axios/web";
import processApiImagePath from "../../Helper/EditLinkImage";
import Pagination from "../../AdminPage/Component/Pagination";

const OrderPage = () => {
  const [data, setData] = useState([
    {
      orderId: "12345",
      customerName: "Nguyễn Văn A",
      orderDate: "2023-09-10",
      totalAmount: 2500,
      status: "Hoàn thành",
      feeShip: 0,
      grandTotal: 0,
      shippingAddress: "123 Đường ABC, Quận XYZ, Thành phố HCM",
      product: [
        {
          id: "789",
          name: "Sản phẩm A",
          quantity: 2,
          price: 50.0,
          image:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
        {
          id: "456",
          name: "Sản phẩm B",
          quantity: 3,
          price: 30.0,
          image:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
        {
          id: "789",
          name: "Sản phẩm C",
          quantity: 1,
          price: 70.0,
          image:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
      ],
    },
    {
      orderId: "12345",
      customerName: "Nguyễn Văn A",
      orderDate: "2023-09-10",
      totalAmount: 250.0,
      status: "Hoàn thành",
      feeShip: 0,
      grandTotal: 0,
      shippingAddress: "123 Đường ABC, Quận XYZ, Thành phố HCM",
      product: [
        {
          id: "789",
          name: "Sản phẩm A",
          quantity: 2,
          price: 50.0,
          image:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
        {
          id: "456",
          name: "Sản phẩm B",
          quantity: 3,
          price: 30.0,
          image:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
        {
          id: "789",
          name: "Sản phẩm C",
          quantity: 1,
          price: 70.0,
          image:
            "https://down-vn.img.susercontent.com/file/a7fe67a8837d5c1b9d2858fe13d8d66b_tn",
        },
      ],
    },
  ]);
  const [pageNow, setPageNow] = useState(1);

  const [activeItem, setActiveItem] = useState(0);
  const [totalOrder, setTotalOrder] = useState(100);
  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  const fetchData = async () => {
    const dataApi = await GetOrderDone({ pageNow, pageSize: 3 });
    if (dataApi?.status === true) {
      if (JSON.stringify(dataApi.result.data) !== JSON.stringify(data)) {
        setData(dataApi.result.data);
        setTotalOrder(dataApi.result.totalOrder);
      }
    }
    console.log(dataApi, "data");
  };
  useEffect(() => {
    fetchData();
  }, [pageNow]);
  console.log(data);
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
              <div className="order-child" key={index}>
                <div className="header">
                  <div>Mã số đơn hàng: #{da.orderId}</div>
                  <div>Tình trạng đơn hàng: {da.status}</div>
                </div>
                <div className="body">
                  {da.product.map((item, index2) => {
                    return (
                      <div className="item" key={index2}>
                        <img src={processApiImagePath(item.image)} alt="" />
                        <div>
                          <span>{item.name}</span>
                          <span>Số lượng {item.quantity}</span>
                          <span>Giá tiền {item.price.toLocaleString()} đ</span>
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
                        {da?.totalAmount.toLocaleString()}đ
                      </div>
                    </div>
                    <div className="price-total">
                      <div>Phí vận chuyển:</div>
                      <div className="price-label">
                        {da?.feeShip.toLocaleString()}đ
                      </div>
                    </div>
                    <div className="price-total">
                      <div>Giảm giá:</div>
                      <div className="price-label">
                        {da?.discount?.toLocaleString()}đ
                      </div>
                    </div>
                    <div className="price-total">
                      <div>Thành tiền: </div>
                      <div className="price-label">
                        {da?.grandTotal.toLocaleString()}đ
                      </div>
                    </div>
                  </div>

                  {/* <div className="button">
                    <div>Liên hệ người bán</div>
                    <div>Mua lại</div>
                  </div> */}
                </div>
              </div>
            );
          })
        : null}
      <Pagination
        obj={{ totalProduct: totalOrder, pageNow, size: 3 }}
        setPageNow={setPageNow}
      />
    </Container>
  );
};
const Container = styled.div`
  .navbar {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #f5f5f5;
    margin-bottom: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .nav-item {
    cursor: pointer;
    padding: 5px 20px;
    color: black;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
  }

  .nav-item.active {
    border-bottom: 1px solid black;
  }
  .order-child {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.1);
          max-width: 80px;
          max-height: 80px;
          margin: 10px;
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
