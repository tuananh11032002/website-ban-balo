import React, { useContext, useState, useEffect } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FaCartArrowDown, FaMoneyBillAlt } from "react-icons/fa";
import styled from "styled-components";
import { AdminContext } from "../Admin";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAccountById } from "../../Axios/web";

const CustomerDetail = () => {
  const { closeMenu } = useContext(AdminContext);
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({});
  const [orderList, setOrderList] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      const res = await getAccountById(id);
      setCustomerData(res.data.user);    
      setOrderList(res.data.user.orderList);
      //resetToken
      const userTmp = localStorage.getItem("webbanbalo_user");
      let userTmp1 = JSON.parse(userTmp);
      userTmp1.token = res.resetToken;
      await localStorage.setItem("webbanbalo_user", JSON.stringify(userTmp1));
      //end resetToken
    };
    fetchData(); 
  },[])
  
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const toggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [openDetailProduct, setOpenDetailProduct] = useState(false);
  const [contentDetailProduct, setContentDetailProduct] = useState(null);
  const [checkboxes, setCheckboxes] = useState(
    Array(orderList.length).fill(false)
  );
  const actionButtonClick = (product) => {
    closeMenu();
    setContentDetailProduct(product);
    setOpenDetailProduct(true);
  };
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setCheckboxes(Array(orderList.length).fill(!selectAll));
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  const navigate = useNavigate();
  return (
    <>
      {openDetailProduct ? (
        <DetailProduct>
          <div className={`fade ${openDetailProduct ? "show" : "hidden"}`}>
            {/* close-button */}
            <span
              className="fade-close"
              onClick={() => {
                setOpenDetailProduct(false);
              }}
            >
              <AiOutlineClose />
            </span>
            <div className="fade-header">
              Detail of {contentDetailProduct.name}
            </div>
            <div className="fade-main">
              <table>
                <tbody>
                  <tr>
                    <td>Order</td>
                    <td>{contentDetailProduct.orderId}</td>
                  </tr>
                  <tr>
                    <td>DateTime</td>
                    <td>{contentDetailProduct.dateTime}</td>
                  </tr>

                  <tr>
                    <td>Spent</td>
                    <td>{contentDetailProduct.spent}</td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>
                      <span
                        className={
                          contentDetailProduct.status
                            .toLowerCase()
                            .split(" ")[0]
                        }
                      >
                        {contentDetailProduct.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Action</td>
                    <td>
                      <div className="options">
                        <div className="menu-icon" onClick={toggleOptions}>
                          ⋮
                        </div>
                        {isOptionsVisible && (
                          <ul className="options-list">
                            <li>
                              <a href="#">Xóa</a>
                            </li>
                            <li>
                              <a href="#">Sửa</a>
                            </li>
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </DetailProduct>
      ) : null}
      <Container>
        <div className="card">
          <div className="customer-avatar">
            <img src={require("../../Assets/Image/account-male.png")} alt="" />
            <div className="name">{customerData.name}</div>
            <div>Customer ID: {customerData.id}</div>
            <div className="card-icons">
              <div className="icons">
                <FaCartArrowDown />
                <div>
                  <div>{customerData.numberOrder}</div>
                  <div>Order</div>
                </div>
              </div>
              <div className="icons">
                <FaMoneyBillAlt />
                <div>
                  {/* <div>${customerData.spent.toLocaleString()}</div> */}
                  <div>Spent</div>
                </div>
              </div>
            </div>
          </div>
          <div className="customer-detail">
            <div className="title">DETAIL</div>
            <div className="info">Username: {customerData.userName}</div>
            <div className="info">Email: {customerData.userName}</div>
            {/* <div className={`status ${customerData?.status.toLowerCase()}`}>
              Status: <span>{customerData.status}</span>
            </div> */}
            <div className="info">Contact: {customerData.contact}</div>
          </div>
        </div>
        <div className="order">
          <div
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            ORDER LIST
          </div>
          <div className="wrapper-table">
            <table className="datatable-product">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>ORDER</th>
                  <th>DATE</th>

                  <th>STATUS</th>
                  <th>SPENT</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order, index) => (
                  <tr key={index}>
                    <td
                      className="td-action"
                      onClick={() => {
                        actionButtonClick(order);
                        setCurrentIndex(index);
                      }}
                    >
                      <span>
                        <AiOutlinePlus />
                      </span>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxes[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/admin/order-detail/${order.orderId}`);
                      }}
                    >
                      {order.orderId}
                    </td>
                    <td>{order.dateTime}</td>
                    <td>
                      <span
                        className={
                          order.status.toLocaleLowerCase().split(" ")[0]
                        }
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>${order.spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};
const DetailProduct = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  transform: translateY(0%);

  .fade {
    background-color: white;
    max-width: 40rem;
    width: 40rem;

    border-radius: 10px;
    background-clip: padding-box;
    transform: translateY(0%);
    transition: transform 0.4s;
    height: auto;
    max-height: 80%;
    &.show {
      transform: translateY(10%);
    }

    &.hidden {
      transform: translateY(-100%);
    }
  }
  .fade .fade-close {
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 2;

    cursor: pointer;
  }
  table {
    width: 100%;
  }
  table {
    border-collapse: collapse;
  }
  table tbody tr {
    border-bottom: 1px solid gray;
  }

  table tbody tr td {
    padding: 1.6rem 1.25rem;
  }

  .td-flex {
    display: flex;
    justify-content: center;
    div {
      text-align: left;
    }
    img {
      max-width: 40px;

      max-height: 40px;
    }
  }
  .delivered {
    background-color: #e6f7d9 !important ;
    border-radius: 50rem !important;
    padding: 8px;
    color: #008000; /* Màu xanh dương cho trạng thái 'Active' */
  }

  .out {
    color: #9a65fd;
    background-color: #eee6ff !important;
    border-radius: 50rem !important;
    padding: 8px;
  }

  .dispatched {
    color: #ffb400; /* Màu cam cho trạng thái không 'Scheduled' */

    background-color: #fff4d9 !important;
    border-radius: 50rem !important;
    padding: 8px;
  }

  .ready {
    color: #41bfff; /* Màu cam cho trạng thái không 'Scheduled' */

    background-color: #dde9f4 !important;
    border-radius: 50rem !important;
    padding: 8px;
  }
  .options-list {
    display: none;
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
  }

  .menu-icon {
    cursor: pointer;
  }

  .options:hover .options-list {
    display: block;
  }

  .options-list li {
    padding: 10px;
  }

  .options-list a {
    text-decoration: none;
    color: #333;
  }

  .options-list a:hover {
    color: #007bff;
  }
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;

  .card {
    flex: 1;
    background-color: white;
    padding: 10px;
    margin-right: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .customer-avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .customer-avatar img {
      width: 120px;
      height: 120px;
      border-radius: 5px;

      margin-bottom: 10px;
    }
    .name {
      font-size: 20px;
      font-weight: bold;
      color: black;
      margin-bottom: 10px;
    }
    .card-icons {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      margin-top: 10px;
    }
    .card-icons .icons {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    svg {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .active {
      background-color: white !important ;
      span {
        background-color: #e6f7d9 !important ;
        border-radius: 50rem !important;
        padding: 8px;
        color: #008000;
      }
    }

    .inactive {
      color: #ff0000; /* Màu đỏ cho trạng thái không 'Active' */
      span {
        background-color: #ffe4e5 !important;
        border-radius: 50rem !important;
        padding: 8px;
      }
    }
    .customer-detail {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .customer-detail .title {
      font-size: 24px;
      font-weight: bold;
    }

    .customer-detail .info {
      margin-top: 10px;
      font-size: 16px;
    }

    .customer-detail .status {
      margin-top: 10px;
      font-size: 16px;
    }
  }

  .order {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    background-color: white;
    flex: 2;
    .wrapper-table {
      max-width: 100%;
      overflow: scroll;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table tbody tr {
      border-bottom: 1px solid gray;
      text-align: center;
    }
    table thead tr {
      border-bottom: 1px solid gray;
      text-align: center;
    }

    table tbody tr td {
      padding: 1.6rem 1.25rem;
    }
    .td-action svg {
      fill: white;
    }
    .td-action span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      background-color: #9055fd;
      border: 2px solid #fff;
      box-shadow: 0 0 3px rgba(58, 53, 65, 0.8);
      border-radius: 50%;
    }

    .delivered {
      background-color: #e6f7d9 !important ;
      border-radius: 50rem !important;
      padding: 8px;
      color: #008000; /* Màu xanh dương cho trạng thái 'Active' */
    }

    .out {
      color: #9a65fd;
      background-color: #eee6ff !important;
      border-radius: 50rem !important;
      padding: 8px;
    }

    .dispatched {
      color: #ffb400; /* Màu cam cho trạng thái không 'Scheduled' */

      background-color: #fff4d9 !important;
      border-radius: 50rem !important;
      padding: 8px;
    }

    .ready {
      color: #41bfff; /* Màu cam cho trạng thái không 'Scheduled' */

      background-color: #dde9f4 !important;
      border-radius: 50rem !important;
      padding: 8px;
    }
  }
  @media screen and (max-width: 1000px) {
    .card {
      min-width: 100%;
      margin-bottom: 20px;
    }
  }
`;

export default CustomerDetail;
