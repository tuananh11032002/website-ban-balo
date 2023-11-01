import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlinePendingActions, MdOutlineSmsFailed } from "react-icons/md";

import styled from "styled-components";
import Pagination from "./Pagination";
import { RiRefundFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
import { getListOrder } from "../../Axios/web";

const OrderList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [{ listCustomer }, dispatch] = useStateProvider();
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState();
  const [selectedValue, setSelectedValue] = useState("7");
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await getListOrder({ index: selectedValue, page:page });
      setData(res.data.orderList);
      setTotalItem(res.data.totalItemCount);
      //resetToken
      const userTmp = localStorage.getItem("webbanbalo_user");
      let userTmp1 = JSON.parse(userTmp);
      userTmp1.token = res.resetToken;
      await localStorage.setItem("webbanbalo_user", JSON.stringify(userTmp1));
      //end resetToken
    };
    fetchData();      
  }, [page, selectedValue])
  const [checkboxes, setCheckboxes] = useState(Array(data.length).fill(false));

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setCheckboxes(Array(data.length).fill(!selectAll));
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  
  return (
    <Container>
      <h1>eCommerce / OrderList </h1>
      <div className="card-widget-saparater-wrapper">
        <div className="card">
          <div>
            <p>Pending Payment</p>
            <h1>56</h1>
          </div>
          <div>
            <MdOutlinePendingActions />
          </div>
        </div>
        <div className="card">
          <div>
            <p> Completed</p>
            <h1>12,689</h1>
          </div>
          <div>
            <IoMdDoneAll />
          </div>
        </div>
        <div className="card">
          <div>
            <p>Refunded</p>
            <h1>124</h1>
          </div>
          <div>
            <RiRefundFill />
          </div>
        </div>
        <div className="card">
          <div>
            <p> Failed</p>
            <h1>23</h1>
          </div>
          <div>
            <MdOutlineSmsFailed />
          </div>
        </div>
      </div>
      <div className="datatable">
        <div class="datatable-action">
          <input class="search-input" type="text" placeholder="Search" />
          <div class="dttable-action-button">
            <select
              class="action-select"
              name=""
              id=""
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="7">7</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className="wrapper-table">
          <table className="datatable-product">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>ORDER</th>
                <th>DATE</th>

                <th>CUTOMER</th>
                <th>PAYMENT</th>
                <th>STATUS</th>
                <th>METHOD</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkboxes[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="td-order">
                    <div
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/admin/order-detail/${product.orderId}`);
                      }}
                    >
                      {product.order}
                    </div>
                  </td>
                  <td>{product.date}</td>

                  <td className="td-customer">
                    <div className="td-flex">
                      <img
                        src={product.customerImage}
                        alt=""
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <div>{product.customerName}</div>
                        <div>{product.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-payment">
                    <div className={product.payment.toLowerCase()}>
                      {product.payment}
                    </div>
                  </td>

                  <td className="td-status">
                    <span
                      className={product.status.split(" ")[0].toLowerCase()}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="td-methodPayment">
                    <img src={product.imageMethodPayment} alt="" />
                    <span>{product.methodPament}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        obj={{
          pageNow: page,
          size: selectedValue,
          totalProduct: totalItem,
        }}
        setPageNow={setPage}
      />
    </Container>
  );
};
const boxShadow = "0 0.375rem 1rem 0 rgba(58, 53, 65, 0.12)";
const borderRadius = "0.375rem";

const Container = styled.div`
  h1 {
    font-size: 2rem;
  }
  .card-widget-saparater-wrapper {
    display: flex;
    flex-wrap: wrap;
    border-radius: ${borderRadius};
    margin-bottom: 10px;

    box-shadow: ${boxShadow};
    background-color: white;
    .card {
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;
      flex-direction: row;
      margin: 10px;
      border: none;
      position: relative; /* Thêm position relative */
    }

    .card:not(:last-child)::after {
      content: "";
      width: 1px;
      background-color: #e7e7e8;
      position: absolute;
      top: 10px;
      bottom: 10px;
      right: -10px;
    }

    .card svg {
      width: 40px;
      height: 40px;
    }
    @media (max-width: 1215px) {
      .card {
        min-width: calc(50% - 20px);
        border-bottom: 1px solid #e7e7e8 !important;
      }
    }

    @media (max-width: 480px) {
      .card {
        min-width: calc(100% - 20px);
      }
    }
  }
  .wrapper-table {
    max-width: 100%;
    overflow: scroll;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
  }
  .datatable {
    background-color: white;
    margin: 10px 0 0 0;

    /* Đặt kiểu cho bảng */
    .datatable-product {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      border: 1px solid #ccc;
      overflow: hidden;
    }
    .datatable-product thead tr,
    .datatable-product tbody tr {
      border-bottom: 1px solid #e7e7e8;
    }
    /* Đặt kiểu cho header của bảng */
    .datatable-product thead th {
      background-color: #f5f5f5;
      font-weight: bold;
      text-align: center;
      padding: 1.5rem;
    }

    /* Đặt kiểu cho ô trong tbody */
    .datatable-product tbody td {
      padding: 1.5rem;
      text-align: center;
      height: 100%;
    }

    /* Đặt kiểu cho checkbox */
    .datatable-product input[type="checkbox"] {
      margin: 0;
    }
    input[type="checkbox"] {
      transform: scale(1.5);
      margin-right: 5px;
    }

    input[type="checkbox"]:checked {
      background-color: #007bff;
      border: 2px solid #007bff;
    }
    /* Đặt kiểu cho cột "ACTIONS" */
    .datatable-product td:last-child {
      text-align: center;
    }
    .td-order {
      color: #9055fd;
    }
    .td-customer .td-flex {
      display: flex;
      align-items: center;
      div {
        display: flex;
        text-align: left;
        flex-direction: column;
      }
    }
    .td-customer .td-flex img {
      border-radius: 50%;
      margin-right: 10px;
    }
    .td-methodPayment {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 20px;
        height: 12px;
      }
    }
    .td-payment {
      div::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: black;
        position: absolute;
        top: 8px;
        left: -8px;
      }
      .paid {
        color: #56ca00;
        &::before {
          background-color: #56ca00;
        }
      }
      .cancelled {
        color: #8d9096;
        &::before {
          background-color: #8d9096;
        }
      }
      .failed {
        color: #ff4c51;
        &::before {
          background-color: #ff4c51;
        }
      }
      .pending {
        color: #ffb503;
        &::before {
          background-color: #ffb503;
        }
      }
    }

    /* Đặt kiểu cho cột "STATUS" */
    .datatable-product .td-status {
      text-align: center;
      font-weight: bold;
      .delivered {
        background-color: #e6f7d9 !important ;
        border-radius: 50rem !important;
        padding: 8px;
        color: #008000; /* Màu xanh dương cho trạng thái 'Active' */
      }
    }

    .datatable-product .td-status {
      .out {
        color: #9a65fd;
        background-color: #eee6ff !important;
        border-radius: 50rem !important;
        padding: 8px;
      }
    }
    .datatable-product .td-status {
      .dispatched {
        color: #ffb400; /* Màu cam cho trạng thái không 'Scheduled' */

        background-color: #fff4d9 !important;
        border-radius: 50rem !important;
        padding: 8px;
      }
    }
    .datatable-product .td-status {
      .ready {
        color: #41bfff; /* Màu cam cho trạng thái không 'Scheduled' */

        background-color: #dde9f4 !important;
        border-radius: 50rem !important;
        padding: 8px;
      }
    }

    .datatable-action {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;

      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .search-input {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
    }

    .dttable-action-button {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .action-select {
      background-color: #fff;
      padding: 8px;
      border-radius: 5px;
      font-size: 14px;
      margin-right: 10px;
    }
  }
`;

export default OrderList;
