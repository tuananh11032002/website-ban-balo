import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { FaCartArrowDown, FaEllipsisV, FaMoneyBillAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { AdminContext } from '../Admin';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerWithId } from '../../Axios/web';
import processApiImagePath from '../../Helper/EditLinkImage';
import ProcessDate from '../../Helper/ProcessDate';
import ConfirmationDialog from '../../Sharing/MessageBox';

const CustomerDetail = () => {
   const { id } = useParams();
   console.log(id, 'id');
   const { closeMenu } = useContext(AdminContext);

   const [customerData, setCustomerData] = useState({
      hoTen: 'Lorine Hischke',
      id: '#45678',
      numberOrder: 5674,
      totalSpent: 19800000,
      userName: 'lorine.hischke',
      email: 'vafgot@vultukir.org',
      status: 'Active',
      contact: '(123) 456-7890',
   });
   const [orderList, setOrderList] = useState([
      {
         id: '#9957',
         date: 'Nov 29, 2022',
         status: {
            id: 11,
            orderId: 1080,
            order: null,
            status: 'Delivered',
            updateTime: '2023-11-15T21:03:52.5289741',
         },

         spent: '59.28',
      },
      {
         id: '#9958',
         date: 'Nov 29, 2022',
         status: 'Out for delivery',
         spent: '59.28',
         status: {
            id: 11,
            orderId: 1080,
            order: null,
            status: 'Delivered',
            updateTime: '2023-11-15T21:03:52.5289741',
         },
      },
      {
         id: '#9959',
         date: 'Nov 29, 2022',
         status: {
            id: 11,
            orderId: 1080,
            order: null,
            status: 'Delivered',
            updateTime: '2023-11-15T21:03:52.5289741',
         },

         spent: '59.28',
      },
      {
         id: '#9960',
         date: 'Nov 29, 2022',
         status: {
            id: 11,
            orderId: 1080,
            order: null,
            status: 'Delivered',
            updateTime: '2023-11-15T21:03:52.5289741',
         },

         spent: '59.28',
      },
   ]);
   const [isOptionsVisible, setIsOptionsVisible] = useState(false);

   const toggleOptions = () => {
      setIsOptionsVisible(!isOptionsVisible);
   };
   const [selectAll, setSelectAll] = useState(false);
   const [openDetailProduct, setOpenDetailProduct] = useState(false);
   const [contentDetailProduct, setContentDetailProduct] = useState(null);
   const [checkboxes, setCheckboxes] = useState(
      Array(orderList.length).fill(false)
   );
   const messageBoxRef = useRef();

   const handleYes = () => {
      console.log('User clicked Yes');
   };

   const handleNo = () => {
      console.log('User clicked No');
   };

   const showConfirmationDialog = () => {
      messageBoxRef.current.show();
   };
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
   const fetchCustomerWithId = async (id) => {
      const dataApi = await getCustomerWithId(id);

      console.log('dataApi', dataApi);
      if (dataApi.status) {
         if (JSON.stringify(dataApi.result !== JSON.stringify(customerData))) {
            setCustomerData(dataApi.result);
         }
         if (
            JSON.stringify(
               dataApi.result.orderList !== JSON.stringify(orderList)
            )
         ) {
            console.log('dataApi.result.orderList', dataApi.result.orderList);
            setOrderList(dataApi.result.orderList);
         }
      }
   };
   useEffect(() => {
      fetchCustomerWithId(id);
   }, []);
   return (
      <>
         <ConfirmationDialog
            ref={messageBoxRef}
            onYesClick={handleYes}
            onNoClick={handleNo}
         />

         {openDetailProduct ? (
            <DetailProduct>
               <div className={`fade ${openDetailProduct ? 'show' : 'hidden'}`}>
                  <span
                     className="fade-close"
                     onClick={() => {
                        setOpenDetailProduct(false);
                     }}
                  >
                     <AiOutlineClose />
                  </span>
                  <div className="fade-header">
                     Detail of {contentDetailProduct.id}
                  </div>
                  <div className="fade-main">
                     <table>
                        <tbody>
                           <tr>
                              <td>Order</td>
                              <td>{contentDetailProduct.id}</td>
                           </tr>
                           <tr>
                              <td>DateTime</td>
                              <td>{ProcessDate(contentDetailProduct.date)}</td>
                           </tr>

                           <tr>
                              <td>Spent</td>
                              <td>
                                 {contentDetailProduct.spent.toLocaleString()}đ
                              </td>
                           </tr>

                           <tr>
                              <td>Status</td>
                              <td>
                                 <span
                                    className={contentDetailProduct.status.status
                                       .toLowerCase()
                                       .substring(0, 3)}
                                 >
                                    {contentDetailProduct.status.status}
                                 </span>
                              </td>
                           </tr>
                           <tr>
                              <td>Action</td>
                              <td>
                                 <div className="options">
                                    <div
                                       className="menu-icon"
                                       onClick={toggleOptions}
                                    >
                                       <FaEllipsisV />
                                    </div>
                                    {isOptionsVisible && (
                                       <ul className="options-list">
                                          <li>
                                             <p
                                                onClick={() => {
                                                   showConfirmationDialog();
                                                }}
                                             >
                                                Xóa
                                             </p>
                                          </li>
                                          <li>
                                             <p>Sửa</p>
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
                  {console.log('customer,', customerData)}
                  <img
                     src={
                        processApiImagePath(customerData.image) ||
                        require('../../Assets/Image/account-male.png')
                     }
                     alt=""
                  />
                  <div className="name">{customerData.hoTen}</div>
                  <div style={{ fontWeight: 'bold' }}>
                     Customer ID: #{customerData.id}
                  </div>
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
                           <div>
                              {customerData?.totalSpent.toLocaleString()}đ
                           </div>
                           <div>Spent</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="customer-detail">
                  <div className="title">DETAIL</div>
                  <div className="info">Username: {customerData.userName}</div>
                  <div className="info">Email: {customerData.email}</div>
                  <div
                     className={`status ${customerData?.status.toLowerCase()}`}
                  >
                     Status: <span>{customerData?.status}</span>
                  </div>
                  <div className="info">Contact: {customerData.contact}</div>
               </div>
            </div>
            <div className="order">
               <div
                  style={{
                     fontSize: '26px',
                     fontWeight: 'bold',
                     marginBottom: '20px',
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
                                 style={{
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                 }}
                                 onClick={() => {
                                    navigate(`/admin/order-detail/${order.id}`);
                                 }}
                              >
                                 {order.id}
                              </td>
                              <td>{ProcessDate(order.date)}</td>
                              <td>
                                 <span
                                    className={order.status?.status
                                       ?.toLocaleLowerCase()
                                       .substring(0, 3)}
                                 >
                                    {order.status?.status}
                                 </span>
                              </td>
                              <td>{order.spent.toLocaleString()}đ</td>
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
      padding: 20px;

      border-radius: 10px;
      background-clip: padding-box;
      transform: translateY(0%);
      transition: transform 0.4s;
      height: auto;
      max-height: 500px;
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
   .fade .fade-header {
      font-weight: bold;
   }
   /* table {
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
   } */

   /* CSS cho table */
   svg {
      font-size: 20px;
      font-weight: bold;
   }

   table {
      width: 100%;
      margin-top: 20px;
   }

   td {
      padding: 20px;
   }
   tr {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }

   .options {
      position: relative;
      display: inline-block;
   }

   .menu-icon {
      cursor: pointer;
   }

   .options-list {
      position: absolute;
      top: 20px;
      right: 0;
      list-style: none;
      padding: 8px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: none;
   }

   .options-list li {
      margin-bottom: 8px;
   }

   .options-list p {
      text-decoration: none;
      color: #333;
      font-weight: bold;
   }

   .options-list p:hover {
      color: blue;
   }

   /* Hiển thị menu options khi được kích */
   .options:hover .options-list {
      display: block;
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
   .del {
      background-color: #e6f7d9 !important ;
      border-radius: 50rem !important;
      padding: 8px;
      color: #008000; /* Màu xanh dương cho trạng thái 'delivered' */
   }

   .out,
   .not {
      color: #9a65fd;
      background-color: #eee6ff !important;
      border-radius: 50rem !important;
      padding: 8px;
      font-weight: bold;
   }

   .dis {
      color: #ffb400; /* Màu cam cho trạng thái không 'Scheduled' */
      font-weight: bold;

      background-color: #fff4d9 !important;
      border-radius: 50rem !important;
      padding: 8px;
   }

   .rea {
      color: #41bfff; /* Màu cam cho trạng thái không 'Scheduled' */
      font-weight: bold;

      background-color: #dde9f4 !important;
      border-radius: 50rem !important;
      padding: 8px;
   }
   /* .options-list {
      display: none;
      list-style: none;
      padding: 0;
      margin: 0;
      position: absolute;
      background-color: #fff;
      border: 1px solid #ccc;
   } */

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
      table tbody tr,
      table thead tr {
         box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
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

      .del {
         background-color: #e6f7d9 !important ;
         border-radius: 50rem !important;
         padding: 8px;
         color: #008000; /* Màu xanh dương cho trạng thái 'del' */
      }

      .out,
      .not {
         color: #9a65fd;
         background-color: #eee6ff !important;
         border-radius: 50rem !important;
         padding: 8px;
         font-weight: bold;
      }

      .dis {
         color: #ffb400; /* Màu cam cho trạng thái không 'dispatched' */

         background-color: #fff4d9 !important;
         border-radius: 50rem !important;
         padding: 8px;
         font-weight: bold;
      }

      .rea {
         color: #41bfff; /* Màu cam cho trạng thái không 'ready' */
         font-weight: bold;

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
