import React, { useContext, useState, useEffect } from "react";
import { AiOutlineUser, AiOutlinePlus } from "react-icons/ai";
import { BiSolidDiscount, BiUser, BiUserCheck } from "react-icons/bi";
import { TbAffiliate } from "react-icons/tb";
import { MdWeb } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";

import styled from "styled-components";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../Admin";
import { GrUserAdmin } from "react-icons/gr";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
import { getListAccount } from "../../Axios/web";

const UserList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [{ listCustomer }, dispatch] = useStateProvider();
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState();
  const [selectedValue, setSelectedValue] = useState("7");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    selection: "User",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListAccount({ index: selectedValue, page:page });
      setData(res.data.userList);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi biểu mẫu ở đây
  };
  const { closeMenu } = useContext(AdminContext);
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);
  return (
    <>
      {isOpenEditUser ? (
        <Overlay>
          {closeMenu()}
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Nhập full name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Nhập email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Nhập số điện thoại:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="selection">Chọn vai trò:</label>
                <select
                  name="selection"
                  value={formData.selection}
                  onChange={handleChange}
                >
                  <option value="User">User</option>
                  <option value="Role">Role</option>
                </select>
              </div>

              <div className="button-group">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setIsOpenEditUser(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      ) : null}
      <Container>
        <h1>eCommerce / User List</h1>
        <div className="card-widget-saparater-wrapper">
          {/* <div className="card">
         <div>
           <p>Session</p>
           <h1>$5,345.43</h1>
           <p>
             <span> 5k orders</span>
             <span className="card-widget-rate-increase">+5.7%</span>
           </p>
         </div>
         <div>
           <AiOutlineUser />
         </div>
       </div>
       <div className="card">
         <div>
           <p> Paid Users</p>
           <h1>$674,347.12</h1>
           <p>
             <span> 21k orders</span>
             <span className="card-widget-rate-increase">+12.4%</span>
           </p>
         </div>
         <div>
           <FiUserPlus />
         </div>
       </div> */}
          <div className="card">
            <div>
              <p>Active Users</p>
              <h1>$14,235.12</h1>
              <p>
                <span> 6k orders</span>
                <span className="card-widget-rate-increase">+5.7%</span>
              </p>
            </div>
            <div>
              <BiUserCheck />
            </div>
          </div>
          <div className="card">
            <div>
              <p> Pending Users</p>
              <h1>$8,345.23</h1>
              <p>
                <span> 150 orders</span>
                <span className="card-widget-rate-decrease">-3.5%</span>
              </p>
            </div>
            <div>
              <FaUserPen />
            </div>
          </div>
        </div>
        <div className="datatable">
          <div className="datatable-filter">
            <div className=" product_status">
              <select>
                <option value=""> Select Role </option>
                <option value="Admin">Admin</option>
                <option value="Author">User</option>
              </select>
            </div>

            <div className="product_stock">
              <select>
                <option value=""> Select Status </option>
                <option value="Pending" class="text-capitalize">
                  Pending
                </option>
                <option value="Active" class="text-capitalize">
                  Active
                </option>
                <option value="Inactive" class="text-capitalize">
                  Inactive
                </option>
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
              <div
                class="action-button"
                onClick={() => {
                  setIsOpenEditUser(true);
                }}
              >
                <AiOutlinePlus />
                <span>Add User</span>
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
                  <th>USER</th>
                  <th>EMAIL</th>

                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
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
                    <td>
                      <div className="td-flex">
                        <img
                          src={product.image}
                          alt=""
                          width="40px"
                          height="40px"
                        />
                        <div>
                          <div
                            onClick={() => {
                              navigate(`/admin/account-detail/${product.id}`);
                            }}
                          >
                            {product.name}
                          </div>
                          <div>{product.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{product.email}</td>
                    <td className={`td-role ${product.role}`}>
                      {product.role === "admin" ? <GrUserAdmin /> : <BiUser />}
                      {product.role}
                    </td>

                    {/* <td className={`${product.status.toLowerCase()}-user`}>
                      <span>{product.status}</span>
                    </td> */}
                    <td>{product.action}</td>
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
    </>
  );
};
const boxShadow = "0 0.375rem 1rem 0 rgba(58, 53, 65, 0.12)";
const borderRadius = "0.375rem";
const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  width: 100%;
  z-index: 1;
  height: 100vh;
  display: flex;
  justify-content: flex-end;

  .form-container {
    background-color: white;
    padding: 20px;
    max-width: 400px;
    width: 400px;
    border: 1px solid #ddd;
    z-index: 2;
    animation: slide 0.2s linear;
    @keyframes slide {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0%);
      }
    }
  }

  .form-group {
    margin: 10px 0;
  }

  label {
    display: block;
  }

  input,
  select {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
  }

  .button-group {
    margin-top: 10px;
  }

  .cancel-button {
    background-color: #ff6666;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
  }

  .submit-button {
    background-color: #3399ff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 5px;
    transition: box-shadow 0.1s;
  }

  .cancel-button:active {
    background-color: red;
  }

  .submit-button:active {
    background-color: #0066cc;
  }
  .submit-button:hover,
  .cancel-button:hover {
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  }
`;
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
    .datatable-product thead th,
    .datatable-product tbody td {
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
    .datatable-product .td-role {
      text-align: left;
    }
    .datatable-product .td-role svg {
      width: 22px;
      height: 22px;
    }
    .datatable-product .admin svg {
      color: red;
    }
    .datatable-product .user svg {
      color: blue;
    }
    .datatable-product td:nth-child(2) {
      .td-flex {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .td-flex img {
        border-radius: 50%;
        margin-right: 10px;
      }
      .td-flex > div {
        text-align: left;
      }
      .td-flex > div > div:first-child {
        font-weight: 500;
        cursor: pointer;
      }
    }

    /* Đặt kiểu cho cột "STATUS" */
    .datatable-product .active-user {
      text-align: center;
      font-weight: bold;
      color: #008000; /* Màu xanh dương cho trạng thái 'Active' */
      span {
        background-color: #e6f7d9 !important ;
        border-radius: 50rem !important;
        padding: 8px;
      }
    }

    .datatable-product .inactive-user {
      color: #ff0000; /* Màu đỏ cho trạng thái không 'Active' */
      span {
        background-color: #ffe4e5 !important;
        border-radius: 50rem !important;
        padding: 8px;
      }
    }
    .datatable-product .pending-user {
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

export default UserList;
