import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useStateProvider } from "../StateProvider/StateProvider";
import { reducerCases } from "../StateProvider/reducer";
import { GetOrder } from "../Axios/web";
import { Link } from "react-router-dom";
import processApiImagePath from "../Helper/EditLinkImage";
import PaymentInfo from "./PaymentInfo";
import { validateEmail, validatePhone } from "../Helper/CheckInput";
const PayPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [order, setOrder] = useState(null);
  const [customerInfor, setCustomerInfo] = useState(() => {
    const data = JSON.parse(
      localStorage.getItem("webbanbalo-shippingInfor")
    ) || {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerProvince: "",
      customerWard: "",
      customerDistrict: "",
      orderNote: "",
    };
    const dataNew = {
      ...data,
      customerProvince: "",
      customerWard: "",
      customerDistrict: "",
    };
    return dataNew;
  });

  useEffect(() => {
    //api province
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vapi.vnappmob.com/api/province/"
        );
        setProvinces(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  //api district
  const fetchDataDistrict = async (code) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${code}`
      );

      setDistricts(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  //api wards
  const fetchDataWard = async (code) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${code}`
      );
      setWards(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const [{ cart, user }, dispatch] = useStateProvider();

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const orderAPi = await GetOrder();
        if (orderAPi?.status) {
          console.log(orderAPi.result);
          setOrder(orderAPi.result);
          if (
            JSON.stringify(orderAPi.result.productOrder) !==
              JSON.stringify(cart) &&
            JSON.stringify(orderAPi.result.productOrder)
          ) {
            dispatch({
              type: reducerCases.SET_CART,
              cart: orderAPi.result.productOrder,
            });
          }
        }
      } else {
        const data = JSON.parse(localStorage.getItem("webbanbalo_cart"));

        if (JSON.stringify(data) !== JSON.stringify(cart)) {
          dispatch({ type: reducerCases.SET_CART, cart: data });
        }
        let result = cart?.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price * currentValue.quantity;
        }, 0);
        if (result != order?.totalAmount) {
          setOrder({
            totalAmount: result,
          });
        }
      }
    };
    fetchCart();
  }, [cart]);
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      const spanHeight = spanRef.current.clientHeight;
      spanRef.current.style.width = `${spanHeight}px`;
    }
  }, []);
  const [numberState, setNumberState] = useState(1);
  console.log("customer", customerInfor);
  useEffect(() => {
    const data = localStorage.getItem("webbanbalo-shippingInfor");

    try {
      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData != null) {
          setCustomerInfo({ ...parsedData });
        }
      }
    } catch (error) {
      console.error("Lỗi phân tích cú pháp JSON:", error);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "webbanbalo-shippingInfor",
      JSON.stringify(customerInfor)
    );
  }, [customerInfor]);
  return (
    <Container>
      <div className="column">
        <nav>
          <span>Pay &gt; </span>
          <span
            onClick={() => setNumberState(1)}
            className={numberState === 1 ? "active" : ""}
          >
            Thông tin khách hàng
          </span>
          {numberState === 2 ? (
            <span className={numberState === 2 ? "active" : ""}>
              &gt; Phương thức thanh toán
            </span>
          ) : null}
        </nav>
        {numberState === 1 ? (
          <>
            <div className="introduce">
              <i>TranTuanAnh Brand</i>
              <h3>Thông tin thanh toán</h3>
            </div>
            <div className="input-container">
              <div className="input-row">
                <div className="input-column">
                  <label>Tên người nhận </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Tên của bạn"
                    name="name"
                    value={customerInfor.customerName}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfor,
                        customerName: e.target.value,
                      })
                    }
                  />
                  {customerInfor.customerName === "" ? (
                    <p className="red">Nhập giá trị cho Name</p>
                  ) : (
                    <p className="green">Đã nhập giá trị cho Name</p>
                  )}
                </div>
              </div>
              <div className="input-row">
                <div className="input-column">
                  <label htmlFor="">Email </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    name="email"
                    value={customerInfor.customerEmail}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfor,
                        customerEmail: e.target.value,
                      })
                    }
                  />
                  {customerInfor.customerEmail === "" ? (
                    <p className="red">Nhập giá trị cho Mail</p>
                  ) : !validateEmail(customerInfor.customerEmail) ? (
                    <p className="red">Mail chưa hợp lệ</p>
                  ) : (
                    <p className="green">Email hợp lệ</p>
                  )}
                </div>
                <div className="input-column">
                  <label htmlFor="">Phone </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Số điện thoại"
                    name="phone"
                    value={customerInfor.customerPhone}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfor,
                        customerPhone: e.target.value,
                      })
                    }
                  />

                  {customerInfor.customerPhone === "" ? (
                    <p className="red">Nhập giá trị cho Phone</p>
                  ) : !validatePhone(customerInfor.customerPhone) ? (
                    <p className="red">Số điện thoại chưa hợp lệ</p>
                  ) : (
                    <p className="green">Số điện thoại hợp lệ</p>
                  )}
                </div>
              </div>
              <div className="input-row">
                <div className="input-column">
                  <label htmlFor="">Số nhà </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Số nhà và tên đường"
                  />
                </div>
              </div>
            </div>
            <div className="select">
              <div>
                <label htmlFor="">Chọn tỉnh</label>

                <select
                  className="custom-select"
                  value={customerInfor.customerProvince}
                  onChange={(e) => {
                    setCustomerInfo({
                      ...customerInfor,
                      customerProvince: e.target.value,
                      customerDistrict: "",
                      customerWard: "",
                    });

                    const code =
                      e.target.selectedOptions[0].getAttribute("data-key");
                    fetchDataDistrict(code);
                  }}
                >
                  <option value="">Chọn Tỉnh</option>
                  {provinces?.map((province, index) => (
                    <option
                      key={index}
                      value={province.province_name}
                      data-key={province.province_id}
                    >
                      {province.province_name}
                    </option>
                  ))}
                </select>

                {customerInfor.customerProvince === "" ? (
                  <p className="red">Chọn tỉnh đi bạn yêu</p>
                ) : (
                  <p className="green">Đã chọn tỉnh</p>
                )}
              </div>

              <div>
                <label htmlFor="">Chọn huyện</label>

                <select
                  className="custom-select"
                  value={customerInfor.customerDistrict}
                  onChange={(e) => {
                    setCustomerInfo({
                      ...customerInfor,
                      customerDistrict: e.target.value,
                      customerWard: "",
                    });

                    const code =
                      e.target.selectedOptions[0].getAttribute("data-key");
                    fetchDataWard(code);
                  }}
                >
                  <option value="">Chọn Huyện</option>
                  {districts.map((district, index) => (
                    <option
                      key={index}
                      value={district.district_name}
                      data-key={district.district_id}
                    >
                      {district.district_name}
                    </option>
                  ))}
                </select>

                {customerInfor.customerDistrict === "" ? (
                  <p className="red">Chọn huyện đi bạn yêu </p>
                ) : (
                  <p className="green">Đã chọn huyện </p>
                )}
              </div>
              <div>
                <label htmlFor="">Chọn xã</label>

                <select
                  className="custom-select"
                  value={customerInfor.customerWard}
                  onChange={(e) => {
                    setCustomerInfo({
                      ...customerInfor,
                      customerWard: e.target.value,
                    });
                  }}
                >
                  <option value="">Chọn Xã</option>
                  {wards.map((ward, index) => (
                    <option key={index} value={ward.ward_name}>
                      {ward.ward_name}
                    </option>
                  ))}
                </select>

                {customerInfor.customerWard === "" ? (
                  <p className="red">Chọn xã đi bạn yêu</p>
                ) : (
                  <p className="green">Đã chọn xã</p>
                )}
              </div>
            </div>
            <div className="button-container">
              <div>
                <Link to="/cart">Quay lại giỏ hàng</Link>
              </div>
              <button
                onClick={() => {
                  if (
                    customerInfor.customerDistrict === "" ||
                    customerInfor.customerProvince === "" ||
                    customerInfor.customerWard === "" ||
                    customerInfor.customerEmail === "" ||
                    validateEmail(customerInfor.customerEmail) === false ||
                    customerInfor.customerName === "" ||
                    customerInfor.customerPhone === "" ||
                    validatePhone(customerInfor.customerPhone) === false
                  ) {
                  } else {
                    setNumberState(2);
                  }
                }}
              >
                Phương thức thanh toán
              </button>
            </div>
          </>
        ) : (
          <PaymentInfo customerInfor={customerInfor} orderId={order.id} />
        )}
      </div>

      <div className="column">
        <ul className="cart">
          {cart?.map((ca, index) => (
            <li key={index}>
              <div className="image">
                {console.log("ca", ca)}
                <img src={processApiImagePath(ca.image)} alt="" />
                <span className="quantity-badge">{ca.quantity}</span>
              </div>

              <span>{ca.name}</span>
              <span>{(ca.price * ca.quantity).toLocaleString()}đ</span>
            </li>
          ))}
        </ul>
        {numberState === 1 ? (
          <div className="code-container">
            <input
              type="text"
              placeholder="Nhập mã giảm giá tại đây"
              className="discount-input"
            />
            <button className="apply-button">Áp dụng</button>
          </div>
        ) : null}
        <div className="price-ship">
          <div className="price">
            <div>Tạm tính</div>
            <div>
              {order ? `${order.totalAmount.toLocaleString()}đ` : "-----"}
            </div>
          </div>
          <div className="ship">
            <div>Phí ship</div>
            <div>{order?.feeShip.toLocaleString()}đ</div>
          </div>
          <hr />
          <div className="ship">
            <h3>Tổng tiền</h3>
            <div></div>
          </div>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  margin: 15vh 10%;
  display: flex;
  flex-direction: row;
  .column {
    flex: 1;
    margin: 0 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
  }

  .cart {
    max-height: 300px;
    overflow: auto;
    padding: 10px;
    margin-bottom: 10px !important;
    list-style: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
    }

    .image {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }

    .image img {
      height: 90%;
      width: 50px;
      border-radius: 8px;
    }

    .quantity-badge {
      position: absolute;
      background-color: #3498db;
      color: #fff;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      text-align: center;
      line-height: 22px;
      top: -10px;
      right: -10px;
    }

    span {
      flex: 1;
    }

    span:last-child {
      text-align: center;
    }
  }
  nav span:first-child {
    color: #333;
    margin-right: 5px;
  }

  nav span.active {
    font-weight: bold;
    color: #0099ff;
    cursor: pointer;
  }

  nav span:last-child {
    margin-left: 5px;
  }
  nav span {
    cursor: pointer;
  }
  .input-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  .input-row {
    display: flex;
    margin-bottom: 10px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      margin: 0;
      margin-bottom: 10px;

      .input-column {
        width: 100%;
        margin-bottom: 10px;
      }
      .input-column:not(:last-child) {
        margin-bottom: 10px;
      }
      .input-column:last-child {
        margin-bottom: 0px;
      }
      .input-column:not(:first-child) {
        margin-left: 0px;
      }
    }
  }

  .input-column {
    flex: 1;
    display: flex;
    flex-direction: column;

    &:not(:first-child) {
      margin-left: 10px;
    }
  }
  .green {
    color: green !important;
  }
  .red {
    color: red !important;
  }

  label::after {
    content: " *";
    color: red;
  }
  .input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: all 0.3s;

    &::placeholder {
      font-size: 14px;
    }

    &:focus {
      padding: 5px;
      border-top-width: 2px;
    }
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button-container button {
    background-color: #338dbc;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
  }

  .select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    * {
      color: black;
    }
  }
  .select > div {
    flex: 1;
    margin: 10px;
  }
  .custom-select {
    width: 100%;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
    margin-right: 10px;
  }

  .custom-select:focus {
    outline: none;
  }

  .code-container {
    display: flex;
    align-items: center;
    .discount-input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    .apply-button {
      background-color: #3498db;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      padding: 10px 20px;
      cursor: pointer;
      margin-left: 10px;
    }

    .apply-button:hover {
      background-color: #2980b9;
    }
  }

  .price-ship {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .price,
    .ship {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
    }

    .price div,
    .ship div {
      font-size: 1.2rem;
    }

    hr {
      border: 1px solid #ccc;
      width: 100%;
    }

    .ship h3 {
      font-size: 1.4rem;
      color: #3498db;
      font-weight: bold;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 15vh 0;
    padding: 0 5%;
    box-sizing: border-box;
    .select {
      flex: 1;

      flex-direction: column;
    }
    .select > div {
      width: 100%;
      margin: 0 0 10px 0;
    }
    > .column > div {
      padding-left: 0;
    }
    .select,
    .input-column {
      margin: auto;
    }
  }
`;
export default PayPage;
