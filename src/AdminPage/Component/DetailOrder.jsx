import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaCartPlus } from "react-icons/fa";
import { getOrder } from "../../Axios/web";

const DetailOrder = () => {
  const { id } = useParams(); // Truy cập ID từ URL
  const [selectAll, setSelectAll] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [fee, setFee] = useState({});
  const [customer, setCustomer] = useState({});

  useEffect(()=>{
    const fetchData = async () => {
      const res = await getOrder(id);
      // setCustomer(res.data.);    
      // setDetailData(res.data.);
      // setFee(res.data.);
      //resetToken
      const userTmp = localStorage.getItem("webbanbalo_user");
      let userTmp1 = JSON.parse(userTmp);
      userTmp1.token = res.resetToken;
      await localStorage.setItem("webbanbalo_user", JSON.stringify(userTmp1));
      //end resetToken
    };
    fetchData(); 
  },[])

  const [checkboxes, setCheckboxes] = useState(Array(detailData.length).fill(false));

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setCheckboxes(Array(detailData.length).fill(!selectAll));
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  return (
    <Container>
      <div className="col1">
        <div className="wrapper-table">
          <h1>Order Detail</h1>
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
                <th>PRODUCT</th>

                <th>PRICE</th>
                <th>QTY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {detailData.map((product, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkboxes[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td>
                    <div className="td-flex">
                      <img
                        src={product.productImage}
                        alt=""
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <div>{product.productName}</div>
                        <div>{product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.qty}</td>
                  <td>{product.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="fee-container">
            <div class="fee-item">
              <div>Subtotal:</div>
              <div>{fee.subtotal}</div>
            </div>
            <div class="fee-item">
              <div>Discount:</div>
              <div>{fee.discount}</div>
            </div>
            <div class="fee-item">
              <div>Tax:</div>
              <div>{fee.tax}</div>
            </div>
            <div class="fee-item">
              <div>Total:</div>
              <div>{fee.total}</div>
            </div>
          </div>
        </div>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-circle"></div>
            <div class="timeline-content">
              <p>Đã đặt hàng</p>
              <p>1/10/2023</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-circle"></div>
            <div class="timeline-content">
              <p>Đang xử lý</p>
              <p>2/10/2023</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-circle"></div>
            <div class="timeline-content ">
              <p>Đang giao hàng</p>
              <p>3/10/2023</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col2">
        <div className="customer-detail">
          <h1>Customer details</h1>
          <div className="customer-infor">
            <img src={require("../../Assets/Image/account-male.png")} alt="" />
            <div>
              <div>{customer.customerName}</div>
              <div>CustomerId: {customer.customerId}</div>
            </div>
          </div>
          <div>
            <span className="order-svg">
              <FaCartPlus />
            </span>
            &nbsp;
            {customer.orderTotal} Order
          </div>
          <div>
            <div className="flex">
              <h1>Contact Info</h1>
              <span className="edit">Edit</span>
            </div>
            <div>Email: {customer.email}</div>
            <div>Phone: {customer.phone}</div>
          </div>
        </div>
        <div className="shipping">
          <div className="flex">
            <h1>Shipping Address</h1>
            <span className="edit">Edit</span>
          </div>
          <p>
            45 Roker <br /> Latheronwheel
            <br /> KW5 8NW,London UK
          </p>
        </div>
        <div className="billing">
          <div className="flex">
            <h1>Payment</h1>
            <span className="edit">Edit</span>
          </div>
          <div>
            <div>{customer.paymentName}</div>
            {customer.methodPayment === "online" ? (
              <div>Card Number:{customer.cardNumber} </div>
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: white;
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .edit {
    color: #9055fd;
    font-weight: bold;
    cursor: pointer;
  }
  .col1 {
    margin: 1rem;
    flex: 2;
    border-radius: 5px;

    .wrapper-table {
      max-width: 100%;
      overflow: auto;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      margin-bottom: 10px;
    }
    .datatable-product {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      border: 1px solid #ccc;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .datatable-product thead th,
    .datatable-product tbody td {
      border-bottom: 1px solid #e7e7e8;
    }
    .datatable-product thead th {
      background-color: #f5f5f5;
      font-weight: bold;
      text-align: center;
      padding: 1.5rem;
    }
    .datatable-product tbody td {
      padding: 1.5rem;
      text-align: center;
    }

    .datatable-product .td-flex {
      display: flex;
      justify-content: center;
      div {
        margin-left: 10px;
        text-align: left;
      }
    }
    input[type="checkbox"] {
      transform: scale(1.5);
      margin-right: 5px;
    }

    input[type="checkbox"]:checked {
      background-color: #007bff;
      border: 2px solid #007bff;
    }

    .fee-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
    }

    .fee-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      min-width: 30%;
    }
    .timeline {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      margin-bottom: 10px;
      padding: 20px;
    }

    .timeline-item {
      display: flex;
      margin-bottom: 10px;
      width: 100%;
    }

    .timeline-circle {
      width: 20px;
      height: 20px;
      background-color: #007bff;
      border-radius: 50%;
      margin-right: 10px;
      position: relative;
    }

    .timeline-content::before {
      content: "";
      width: 2px;
      height: 80%;
      background-color: #9055fd;
      position: absolute;
      left: -20px;
      top: 20px;
    }

    .timeline-circle:not(:last-child)::before {
      height: calc(100% + 10px); /* Khoảng cách giữa các timeline-item */
    }
    .none-timeline::before {
      content: none;
    }

    .timeline-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      min-height: 8rem;
      flex: 1;
      font-weight: bold;
      * {
        font-size: 17px;
      }
    }

    .timeline-item:nth-child(1) .timeline-circle {
      background-color: #007bff;
    }

    .timeline-item:nth-child(2) .timeline-circle {
      background-color: #28a745;
    }

    .timeline-item:nth-child(3) .timeline-circle {
      background-color: #ffc107;
    }
  }
  .col2 {
    flex: 1;
    margin: 1rem;
    border-radius: 5px;
    height: auto;
    * {
      font-size: 20px;
    }

    .customer-detail,
    .shipping,
    .billing {
      padding: 2rem;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      margin-bottom: 10px;
    }
    .customer-detail div {
      margin-bottom: 10px;
    }
    .customer-infor {
      display: flex;
      flex-direction: row;
      align-items: center;

      img {
        width: 40px;
        border-radius: 50%;
        height: 40px;
        margin-right: 10px;
      }
    }
    .customer-infor > div {
      margin: 0;
    }
    .order-svg {
      display: inline-flex;
      width: 40px;
      height: 40px;
      background-color: #e6f7d9;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

      svg {
        width: 24px;
        height: 24px;
        color: green;
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .col1 {
      min-width: 100%;
    }
  }
`;
export default DetailOrder;
