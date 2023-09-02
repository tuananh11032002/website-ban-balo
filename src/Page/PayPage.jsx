import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useStateProvider } from "../StateProvider/StateProvider";
import { reducerCases } from "../StateProvider/reducer";
import { GetOrder, GetProductIntoOrder } from "../Axios/web";
import { Link } from "react-router-dom";
const PayPage = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    //api province
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
        );
        setProvinces(response.data.data.data);
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
        `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`
      );
      setDistricts(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  //api wards
  const fetchDataWard = async (code) => {
    try {
      const response = await axios.get(
        `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${code}&limit=-1`
      );
      setWards(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [{ cart, user }, dispatch] = useStateProvider();
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const data = await GetProductIntoOrder();

        if (JSON.stringify(data) !== JSON.stringify(cart)) {
          dispatch({ type: reducerCases.SET_CART, cart: data });
        }
        const orderAPi = await GetOrder(user?.token.accessToken);
        if (orderAPi) {
          setOrder(orderAPi);
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
  return (
    <Container>
      <div className="column">
        <div className="introduce">
          <h2>TranTuanAnh Brand</h2>
          <h3>Thông tin thanh toán</h3>
        </div>
        <div className="input-container">
          <div className="input-row">
            <input type="text" className="input" placeholder="Tên của bạn" />
          </div>
          <div className="input-row">
            <div className="input-column">
              <input type="text" className="input" placeholder="Email" />
            </div>
            <div className="input-column">
              <input
                type="text"
                className="input"
                placeholder="Số điện thoại"
              />
            </div>
          </div>
          <div className="input-row">
            <input
              type="text"
              className="input"
              placeholder="Số nhà và tên đường"
            />
          </div>
        </div>

        <div className="select">
          <select
            className="custom-select"
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              const code = e.target.selectedOptions[0].getAttribute("data-key");
              fetchDataDistrict(code);
              //setDistricts(provinces[key].districts);
            }}
          >
            <option value="">Chọn Tỉnh</option>
            {provinces?.map((province, index) => (
              <option
                key={index}
                value={province.name}
                data-key={province.code}
              >
                {province.name}
              </option>
            ))}
          </select>
          <select
            className="custom-select"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              const code = e.target.selectedOptions[0].getAttribute("data-key");
              fetchDataWard(code);
            }}
          >
            <option value="">Chọn Huyện</option>
            {districts.map((district, index) => (
              <option
                key={index}
                value={district.name}
                data-key={district.code}
              >
                {district.name}
              </option>
            ))}
          </select>
          <select
            className="custom-select"
            value={selectedWard}
            onChange={(e) => {
              setSelectedWard(e.target.value);
            }}
          >
            <option value="">Chọn Xã</option>
            {wards.map((ward, index) => (
              <option key={index} value={ward.name}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className="button-container"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link to="/cart">Quay lại giỏ hàng</Link>
          </div>
          <button
            style={{
              backgroundColor: "#338dbc",
              color: "white",
              height: "60px",
            }}
          >
            <h6>Phương thức thanh toán</h6>
          </button>
        </div>
      </div>
      <div className="column">
        <ul
          className="cart"
          style={{ height: "50vh", overflow: "auto", paddingTop: "10px" }}
        >
          {cart?.map((ca, index) => (
            <li
              key={index}
              style={{
                height: "50px",
                width: "100%",
                marginBottom: "5vh",
                borderBottom: "1px solid",
              }}
            >
              <div className="image">
                <img
                  src={ca.product.image}
                  alt=""
                  style={{ height: "90%", width: "50px" }}
                />
                <span
                  ref={spanRef}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "gray",
                    position: "absolute",
                    color: "white",
                    height: "45%",
                    width: "22px",
                    textAlign: "center",
                    left: "30%",
                    top: "-10%",
                  }}
                >
                  {ca.quantity}
                </span>
              </div>

              <span>{ca.product.name}</span>
              <span style={{ textAlign: "right" }}>
                {(ca.product.price * ca.quantity).toLocaleString()}đ
              </span>
            </li>
          ))}
        </ul>
        <div class="code-container">
          <input
            type="text"
            placeholder="Nhập mã giảm giá tại đây"
            class="discount-input"
          />
          <button class="apply-button">Áp dụng</button>
        </div>
        <div className="price-ship">
          <div className="price">
            <div>Tạm tính</div>
            <div>1000 đ</div>
          </div>
          <div className="ship">
            <div>Phí ship</div>
            <div>
              {order ? `${order.totalAmount.toLocaleString()}đ` : "-----"}
            </div>
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
  height: auto;
  > .column > div {
    padding-left: 2rem;
  }
  li {
    list-style-type: none;
  }
  .cart {
    width: 100%;
    li {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
    }
  }
  .input-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  .input-row {
    display: flex;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      flex-direction: column;
      margin: 0;
      margin-bottom: 10px;

      .input-column {
        width: 100%;

        margin-bottom: 10px;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        &:last-child {
          margin-bottom: 0px;
        }
        &:not(:first-child) {
          margin-left: 0px;
        }
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

  .column {
    flex: 1;
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 15vh 0;
    padding: 0 5%;
    box-sizing: border-box;
    .select {
      select {
        width: 100%;
        margin: 0 0 10px 0;
      }
      flex: 1;

      flex-direction: column;
    }
    > .column > div {
      padding-left: 0;
    }
    .select,
    .input-column {
      margin: auto;
    }
  }
  .select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5%;
  }
  .custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 30%; /* Chiều dài cố định */
    height: 40px; /* Chiều cao cố định */
    max-width: 100%;
    padding: 5px 30px 5px 5px;
    border: 1px solid gray;
    background: linear-gradient(
        90deg,
        transparent 0,
        transparent calc(100% - 30px),
        gray calc(100% - 30px),
        gray calc(100% - 28px),
        transparent calc(100% - 28px),
        transparent 100%
      ),
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='7'><polygon points='0,0 10,0 5,7' fill='gray'/></svg>")
        no-repeat right center / 14px 7px; /* Thay đổi kích thước của tam giác */
    background-position-x: calc(100% - 17px);
  }

  .custom-select:focus {
    outline: none;
  }

  .code-container {
    width: 100%;
    display: flex;
    align-items: center; /* Căn giữa theo chiều dọc */
  }

  .discount-input {
    flex: 1; /* Để input chiếm phần còn lại của flex container */
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 0.5rem;
  }

  .apply-button {
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .apply-button:hover {
    background-color: #0056b3;
  }

  .price-ship {
    .ship,
    .price {
      margin: 20px 0;

      display: flex;
      justify-content: space-between;
    }
  }
`;
export default PayPage;
