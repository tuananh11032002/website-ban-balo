import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const AccountDetail = () => {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({
    displayName: "Lorine Hischke",
    userId: "#45678",
    numberOrder: 5674,
    spent: 19800000,
    userName: "lorine.hischke",
    email: "vafgot@vultukir.org",
    status: "Active",
    contact: "(123) 456-7890",
  });
  const [isOpenEditAccount, setisOpenEditAccount] = useState(false);
  const [paymentData, setPaymentData] = useState([
    {
      id: 1,
      imagePayment:
        "data:image/png;base64,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",
      owner: "TRAN TUAN ANH",
      numberCard: "09878769",
      namePayment: "MOMO",
    },
    {
      id: 2,

      imagePayment:
        "data:image/png;base64,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",
      owner: "TRAN TUAN ANH",
      numberCard: "09878769",
      namePayment: "VNPay",
    },
    {
      id: 3,

      imagePayment:
        "https://www.taichinhz.com/wp-content/uploads/2021/10/zalopay-la-gi.jpg",
      owner: "TRAN TUAN ANH",
      numberCard: "09878769",
      namePayment: "ZaloPay",
    },
  ]);
  return (
    <>
      {isOpenEditAccount ? (
        <Overlay>
          <div className="main-overlay">
            <div className="user-edit">
              <header>
                <h1>Edit User Information</h1>
                <p>Updating user details will receive a privacy audit.</p>
              </header>
              <div className="form-container">
                <form>
                  <div className="form-group">
                    <label for="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" />
                  </div>

                  <div className="form-group">
                    <label for="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" />
                  </div>

                  <div className="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" />
                  </div>

                  <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" />
                  </div>
                  <div className="form-group">
                    <label for="phone">Phone</label>
                    <input type="phone" id="phone" name="phone" />
                  </div>

                  <div className="form-group">
                    <label for="status">Status</label>
                    <select id="status" name="status">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="button-container">
                    <button type="submit" className="submit-button">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => {
                        setisOpenEditAccount(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Overlay>
      ) : null}
      <Container>
        <div className="card">
          <div className="customer-avatar">
            <img src={require("../../Assets/Image/account-male.png")} alt="" />
            <div className="name">{customerData.displayName}</div>
            <div>USER ID: {customerData.userId}</div>
          </div>
          <div className="customer-detail">
            <div className="title">DETAIL</div>
            <div className="info">
              <span className="bold">Username:</span> {customerData.userName}
            </div>
            <div className="info">
              <span className="bold">Email:</span> {customerData.email}
            </div>
            <div className={`status ${customerData?.status.toLowerCase()}`}>
              <small className="bold">Status:</small>
              <span>{customerData.status}</span>
            </div>
            <div className="info">
              <span className="bold">Contact:</span> {customerData.contact}
            </div>
          </div>
          <div className="custom-div">
            <button
              onClick={() => {
                setisOpenEditAccount(true);
              }}
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
        <div className="other">
          <div className="address"></div>
          <div className="payment">
            <div className="payment-header">
              <h1 className="bold">Payment Method</h1>
              <div className="payment-button">
                <button>Add Method</button>
              </div>
            </div>
            <div className="payment-body">
              {paymentData?.map((payment, index) => (
                <div className="payment-items">
                  <div>
                    <img src={payment.imagePayment} alt="" />
                    <div>{payment.namePayment}</div>
                    <div>{payment.owner}</div>
                    <div>{payment.numberCard}</div>
                  </div>
                  <div>
                    <button>Sửa</button>
                    <button>Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
const Overlay = styled.div`
  background-color: rgba(137, 134, 141, 0.9);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  .main-overlay {
    max-width: 40rem;
    max-height: 80vh;
    min-height: 20vh;
    width: 40rem;
    background-color: white;
    header {
      text-align: center;
      padding: 20px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    h1 {
      font-size: 1.5rem;
      margin: 0;
      padding: 0;
    }

    p {
      font-size: 1rem;
      margin: 0;
      padding: 0;
      margin-top: 10px; /* Khoảng cách giữa tiêu đề và đoạn mô tả */
    }

    .form-container {
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 20px;
      max-width: 40rem;
    }

    .form-group {
      margin-bottom: 5px;
    }

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input,
    select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .button-container {
      display: flex;
      justify-content: space-evenly;
    }

    .submit-button {
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
    }

    .submit-button:hover {
      background-color: #0056b3;
    }

    .submit-button:active {
      background-color: #004599;
    }
    .cancel-button {
      background-color: #ff6666;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
    }

    .cancel-button:hover {
      background-color: #ff3333;
    }

    .cancel-button:active {
      background-color: #ff0000;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  h1 {
    font-size: 24px;
  }
  .bold {
    font-weight: bold;
  }
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

    .active {
      background-color: white !important ;
      span {
        background-color: #e6f7d9 !important ;
        border-radius: 50rem !important;
        padding: 8px;
        color: #088208;
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
    .custom-div {
      padding: 15px;
      display: flex;
      justify-content: center;
    }

    .custom-div button {
      background-color: #9055fd;
      color: #fff;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    .custom-div button:hover {
      background-color: #804be0;
    }
  }
  .other {
    flex: 2;
    background-color: white;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .payment {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-radius: 5px;
      flex-direction: column;
    }

    .payment-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 10px;
    }

    h1 {
      font-size: 1.5rem;
      margin: 0;
      margin-right: 10px;
      color: #333;
    }

    .payment-button {
      display: flex;
      align-items: center;
    }

    button {
      margin: 0 5px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    button:active {
      background-color: #004599;
    }

    .payment-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: space-between;
    }
    .payment-body .col {
      display: flex;
    }
    .payment-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .payment-items img {
      max-width: 100px;
      max-height: 100px;
    }
  }
  @media screen and (max-width: 1000px) {
    .card {
      min-width: 100%;
    }
  }
`;
export default AccountDetail;
