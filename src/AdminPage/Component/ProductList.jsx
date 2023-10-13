import React, { useState } from "react";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { BiSolidDiscount } from "react-icons/bi";
import { TbAffiliate } from "react-icons/tb";
import { MdWeb } from "react-icons/md";

import styled from "styled-components";
import Pagination from "./Pagination";

const ProductList = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "xxxx",
      image:
        "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png",
      category: "Shoes",
      price: "$125",
      qty: 110,
      stock: true,
      status: "publish",
      action: "none",
    },
    {
      id: 1,
      name: "xxxx",
      image:
        "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png",
      category: "Shoes",
      price: "$125",
      qty: 110,
      stock: true,
      status: "publish",
      action: "none",
    },
    {
      id: 1,
      name: "xxxx",
      image:
        "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png",
      category: "Shoes",
      price: "$125",
      qty: 110,
      stock: true,
      status: "Scheduled",
      action: "none",
    },
    {
      id: 1,
      name: "xxxx",
      image:
        "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png",
      category: "Shoes",
      price: "$125",
      qty: 110,
      stock: true,
      status: "Inactive",
      action: "none",
    },
  ]);
  const [selectAll, setSelectAll] = useState(false);
  const [checkStock, setCheckStock] = useState(data.map((item) => item.stock));

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
  const [selectedValue, setSelectedValue] = useState("7");
  console.log(selectedValue);
  return (
    <Container>
      <h1>eCommerce / Product List</h1>
      <div className="card-widget-saparater-wrapper">
        <div className="card">
          <div>
            <p>In Store Sales</p>
            <h1>$5,345.43</h1>
            <p>
              <span> 5k orders</span>
              <span className="card-widget-rate-increase">+5.7%</span>
            </p>
          </div>
          <div>
            <AiOutlineHome />
          </div>
        </div>
        <div className="card">
          <div>
            <p> Website Sales</p>
            <h1>$674,347.12</h1>
            <p>
              <span> 21k orders</span>
              <span className="card-widget-rate-increase">+12.4%</span>
            </p>
          </div>
          <div>
            <MdWeb />
          </div>
        </div>
        <div className="card">
          <div>
            <p>Discount</p>
            <h1>$14,235.12</h1>
            <p>
              <span> 6k orders</span>
              <span className="card-widget-rate-increase">+5.7%</span>
            </p>
          </div>
          <div>
            <BiSolidDiscount />
          </div>
        </div>
        <div className="card">
          <div>
            <p> Affiliate</p>
            <h1>$8,345.23</h1>
            <p>
              <span> 150 orders</span>
              <span className="card-widget-rate-decrease">-3.5%</span>
            </p>
          </div>
          <div>
            <TbAffiliate />
          </div>
        </div>
      </div>
      <div className="datatable">
        <div className="datatable-filter">
          <div className=" product_status">
            <select>
              <option value="">Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Publish">Publish</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="product_category">
            <select>
              <option value="">Category</option>
              <option value="Household">Household</option>
              <option value="Office">Office</option>
              <option value="Electronics">Electronics</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
              <option value="Game">Game</option>
            </select>
          </div>
          <div className="product_stock">
            <select id="ProductStock">
              <option value=""> Stock </option>
              <option value="Out_of_Stock">Out of Stock</option>
              <option value="In_Stock">In Stock</option>
            </select>
          </div>
        </div>
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
            <div class="action-button">
              <AiOutlinePlus />
              <span>Add Product</span>
            </div>
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
                <th colSpan="3">PRODUCT</th>
                <th>CATEGORY</th>

                <th>STOCK</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {console.log(data)}
              {data.map((product, index) => (
                <tr key={index}>
                  {console.log("pro", product)}
                  <td>
                    <input
                      type="checkbox"
                      checked={checkboxes[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td colSpan="3">
                    <div className="td-flex">
                      <div>{product.name}</div>
                      <img
                        src={product.image}
                        alt=""
                        width="40px"
                        height="40px"
                      />
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <label class="toggle-label">
                      <input
                        type="checkbox"
                        checked={checkStock[index]}
                        onChange={() => {
                          const newCheckStock = [...checkStock];
                          newCheckStock[index] = !newCheckStock[index];
                          setCheckStock(newCheckStock);
                        }}
                      />
                      <span class="toggle-slider"></span>
                    </label>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.qty}</td>
                  <td className={product.status}>
                    <span>{product.status}</span>
                  </td>
                  <td>{product.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        obj={{
          pageNow: 1,
          size: 7,
          totalProduct: 100,
        }}
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

    box-shadow: ${boxShadow};
    background-color: white;
    .card {
      flex: 1;
      display: flex;
      justify-content: space-around;
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
    .card-widget-rate-increase {
      color: #56ca00 !important;
      background-color: #e6f7d9;
    }
    .card-widget-rate-decrease {
      background-color: #ffe4e5 !important;
      color: #ff4c51 !important;
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
  }
  .datatable {
    background-color: white;
    margin: 10px 0 0 0;
    .datatable-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 0;
      flex-wrap: wrap;
    }
    .datatable-filter div {
      display: flex;
      flex: 1;
      margin: 0 10px;
    }
    .datatable-filter select {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%; /* Chiều rộng bằng chiều rộng của cha */
      background-color: transparent; /* Loại bỏ màu nền của select */
      transition: border 0.3s; /* Hiệu ứng border */
    }

    .datatable-filter select:focus {
      border: 2px solid #9055fd; /* Hiệu ứng border khi được chọn */
    }

    /* Điều chỉnh màu nền và các kiểu khác cho các select phù hợp với mục tiêu của bạn */

    /* Đặt kiểu cho bảng */
    .datatable-product {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      border: 1px solid #ccc;
      overflow: hidden;
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
    .datatable-product td:nth-child(2) {
      .td-flex {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .datatable-product td {
      .toggle-label {
        position: relative;
        display: inline-block;
        width: 40px; /* Điều chỉnh chiều rộng */
        height: 20px; /* Điều chỉnh chiều cao */
      }

      .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        border-radius: 20px; /* Điều chỉnh độ cong của góc */
        transition: 0.4s;
      }

      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 16px; /* Điều chỉnh chiều cao của nút trượt */
        width: 16px; /* Điều chỉnh chiều rộng của nút trượt */
        left: 2px; /* Điều chỉnh vị trí từ trái */
        bottom: 2px; /* Điều chỉnh vị trí từ dưới */
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
      }
      .toggle-label input:checked + .toggle-slider {
        background-color: #007bff; /* Màu nền của toggle khi bật */
      }

      .toggle-label input:checked + .toggle-slider:before {
        transform: translateX(20px);
      }
    }
    /* Đặt kiểu cho cột "STATUS" */
    .datatable-product .publish {
      text-align: center;
      font-weight: bold;
      color: #008000; /* Màu xanh dương cho trạng thái 'Active' */
      span {
        background-color: #e6f7d9 !important ;
        border-radius: 50rem !important;
        padding: 8px;
      }
    }

    .datatable-product .Inactive {
      color: #ff0000; /* Màu đỏ cho trạng thái không 'Active' */
      span {
        background-color: #ffe4e5 !important;
        border-radius: 50rem !important;
        padding: 8px;
      }
    }
    .datatable-product .Scheduled {
      color: #ffb400; /* Màu cam cho trạng thái không 'Scheduled' */
      span {
        background-color: #fff4d9 !important;
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

    .action-button {
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      display: flex;
      align-items: center;
    }

    .action-button:hover {
      background-color: #0056b3;
    }
  }
  @media screen and (max-width: 756px) {
    .datatable-filter div {
      min-width: calc(100%);
      margin: 1rem 0 !important;
    }
  }
  @media screen and (max-width: 600px) {
    .action-button span {
      display: none;
    }
  }
`;

export default ProductList;
