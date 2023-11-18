import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import styled from 'styled-components';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { getCustomerApi } from '../../Axios/web';
import processApiImagePath from '../../Helper/EditLinkImage';

const CustomerList = () => {
   const navigate = useNavigate();
   const [data, setData] = useState([
      {
         hoTen: 'xxxx',
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/17.png',
         id: '#1234',
         totalSpent: '$125',
         order: 110,
         country: 'Ukraine',
         email: 'zarton8@weibo.com',
      },
      {
         hoTen: 'xxxx',
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/17.png',
         id: '#1234',
         totalSpent: '$125',
         order: 110,
         country: 'Ukraine',
         email: 'zarton8@weibo.com',
      },
      {
         hoTen: 'xxxx',
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/17.png',
         id: '#1234',
         email: 'zarton8@weibo.com',
         totalSpent: '$125',
         order: 110,
         country: 'Ukraine',
      },
      {
         hoTen: 'xxxx',
         email: 'zarton8@weibo.com',
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/17.png',
         id: '#1234',
         totalSpent: '$125',
         order: 110,
         country: 'Ukraine',
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
   const [selectedValue, setSelectedValue] = useState('7');
   const [pageNow, setPageNow] = useState(1);
   const [search, setSearch] = useState('');
   const [totalCustomer, setTotalCustomer] = useState(100);
   const fetchData = async () => {
      const dataApi = await getCustomerApi(search, pageNow, selectedValue);
      console.log('data', dataApi);

      if (dataApi.status) {
         if (JSON.stringify(dataApi.result.customer) !== JSON.stringify(data)) {
            setData(dataApi.result.customer);
            setTotalCustomer(dataApi.result.totalCustomer);
         }
      }
   };
   useEffect(() => {
      fetchData();
   }, [data, search]);
   return (
      <Container>
         <h1>eCommerce / Customer List</h1>

         <div className="datatable">
            <div className="datatable-action">
               <input
                  className="search-input"
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
               <div className="dttable-action-button">
                  <select
                     className="action-select"
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
                        <th colSpan="3">CUSTOMER</th>
                        <th>CUSTOMER ID</th>

                        <th>COUNTRY</th>
                        <th>ORDER</th>
                        <th>TOTAL SPENT</th>
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
                           <td colSpan="3">
                              <div className="td-flex">
                                 <img
                                    src={processApiImagePath(product.image)}
                                    alt=""
                                    width="40px"
                                    height="40px"
                                 />
                                 <div>
                                    <div
                                       style={{
                                          fontWeight: 'bold',
                                          cursor: 'pointer',
                                       }}
                                       onClick={() => {
                                          navigate(
                                             `/admin/customer-detail/${product.id}`
                                          );
                                       }}
                                    >
                                       {product.hoTen}
                                    </div>
                                    <div>{product.email}</div>
                                 </div>
                              </div>
                           </td>
                           <td>{product.id}</td>

                           <td>{product.country}</td>
                           <td>{product.order}</td>
                           <td>{product?.totalSpent.toLocaleString()}đ</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
         <Pagination
            setPageNow={setPageNow}
            obj={{
               pageNow: pageNow,
               size: selectedValue,
               totalProduct: totalCustomer,
            }}
         />
      </Container>
   );
};
const boxShadow = '0 0.375rem 1rem 0 rgba(58, 53, 65, 0.12)';
const borderRadius = '0.375rem';

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
         content: '';
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
      .datatable-product thead th {
         background-color: #f5f5f5;
         font-weight: bold;
         padding: 1.5rem;
      }

      .datatable-product tbody td {
         padding: 1.5rem;
      }

      .datatable-product input[type='checkbox'] {
         margin: 0;
      }
      input[type='checkbox'] {
         transform: scale(1.5);
         margin-right: 5px;
      }

      input[type='checkbox']:checked {
         background-color: #007bff;
         border: 2px solid #007bff;
      }
      /* Đặt kiểu cho cột "ACTIONS" */
      .datatable-product td:last-child {
      }
      .datatable-product td:nth-child(2) .td-flex {
         display: flex;
         align-items: center;
      }
      .td-flex img {
         border-radius: 50%;
         margin-right: 10px;
      }
      .td-flex > div {
         display: flex;
         flex-direction: column;
         justify-content: flex-start;
         text-align: left;
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
            content: '';
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

export default CustomerList;
