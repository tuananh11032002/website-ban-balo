import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaCartPlus } from 'react-icons/fa';
import {
   DeleteOrder,
   GetOrderDetailAndCustomerInfo,
   UpdateStatusOrder,
} from '../../Axios/web';
import processApiImagePath from '../../Helper/EditLinkImage';
const DetailOrder = () => {
   const { id } = useParams(); // Truy cập ID từ URL
   const [selectAll, setSelectAll] = useState(false);
   const [detailData, setDetailData] = useState([
      {
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/products/woodenchair.png',
         name: 'Wooden Chair',
         price: 1876,
         quantity: 454,
         total: 3409,
      },
      {
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/products/woodenchair.png',
         name: 'Wooden Chair',
         price: 1876,
         quantity: 454,
         total: 3409,
      },
      {
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/products/woodenchair.png',
         name: 'Wooden Chair',
         price: 1876,
         quantity: 454,
         total: 3409,
      },
      {
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/products/woodenchair.png',
         name: 'Wooden Chair',
         price: 1876,
         quantity: 454,
         total: 3090909,
      },
   ]);
   const [fee, setFee] = useState({
      subtotal: '500025',
      discount: '0000',
      total: ' 510025',
   });
   const [customer, setCustomer] = useState({
      userNameReceive: 'Hoang',
      displayName: 'Shamus Tuttle',
      userId: '#58909',
      totalOrder: 256,
      email: 'Shamus889@yahoo.com',
      shippingAdress: '',
      contact: '+1 (609) 972-22-22',
      cardNumber: '******4291',
      methodPayment: 'online',
      payment: 'Mastercard',
   });
   const [orderStatus, setOrderStatus] = useState([]);
   const [selectOrderStatus, setSelectOrderStatus] = useState('');

   const [checkboxes, setCheckboxes] = useState(
      Array(detailData.length).fill(false)
   );
   const navigate = useNavigate();
   const handleDeleteOrder = async () => {
      const data = await DeleteOrder(id);
      console.log(data);
      if (data?.status) {
         navigate('/admin/order-list');
      }
   };
   const toggleSelectAll = () => {
      setSelectAll(!selectAll);
      setCheckboxes(Array(detailData.length).fill(!selectAll));
   };

   const handleCheckboxChange = (index) => {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[index] = !newCheckboxes[index];
      setCheckboxes(newCheckboxes);
   };
   const handleChangStatus = async () => {
      const data = await UpdateStatusOrder(id);
      console.log(data);
      if (data?.status) {
         fetchData();
      }
   };
   const fetchData = async () => {
      const data = await GetOrderDetailAndCustomerInfo(id);
      console.log('dataApi', data);
      if (data?.status) {
         const value = data.result;
         setDetailData(value.orderItems);
         setFee({
            subtotal: value.subtotal,
            discount: value.discount,
            total: value.totalMoney,
            feeShip: value.feeShip,
         });
         setOrderStatus(value.orderStatus);
         setCustomer({ ...value.customerInfo, ...value.userInfor });
         setSelectOrderStatus(value.orderStatus[0].status);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);
   console.log('orderStatus', orderStatus);
   return (
      <Container>
         <div className="delete-button-container">
            {orderStatus.length > 0 ? (
               <>
                  <span>Status: {orderStatus[0]?.status}</span>
                  <button onClick={() => handleChangStatus()}>
                     Cập nhật đến bước tiếp theo
                  </button>
               </>
            ) : null}
            <button
               className="delete-button"
               onClick={() => handleDeleteOrder()}
            >
               Xóa
            </button>
         </div>
         <div className="container-order">
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
                                       src={processApiImagePath(product.image)}
                                       alt=""
                                       width="40px"
                                       height="40px"
                                    />
                                    <div>
                                       <div>{product.name}</div>
                                       <div>{product.title}</div>
                                    </div>
                                 </div>
                              </td>
                              <td>{product.price.toLocaleString()}đ</td>
                              <td>{product.quantity}</td>
                              <td>{product.total.toLocaleString()}đ</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  <div className="fee-container">
                     <div className="fee-item">
                        <div>Subtotal:</div>
                        <div>{fee.subtotal.toLocaleString()}đ</div>
                     </div>
                     <div className="fee-item">
                        <div>Fee Ship:</div>
                        <div>{fee?.feeShip?.toLocaleString()}đ</div>
                     </div>
                     <div className="fee-item">
                        <div>Discount:</div>
                        <div>{fee.discount.toLocaleString()}đ</div>
                     </div>

                     <div className="fee-item">
                        <div>Total:</div>
                        <div>{fee.total.toLocaleString()}đ</div>
                     </div>
                  </div>
               </div>
               {/* <div className="timeline">
                  <div className="timeline-item">
                     <div className="timeline-circle"></div>
                     <div className="timeline-content">
                        <p>Đã đặt hàng</p>
                        <p>1/10/2023</p>
                     </div>
                  </div>
                  <div className="timeline-item">
                     <div className="timeline-circle"></div>
                     <div className="timeline-content">
                        <p>Đang xử lý</p>
                        <p>2/10/2023</p>
                     </div>
                  </div>
                  <div className="timeline-item">
                     <div className="timeline-circle"></div>
                     <div className="timeline-content ">
                        <p>Đang giao hàng</p>
                        <p>3/10/2023</p>
                     </div>
                  </div>
               </div> */}
            </div>
            <div className="col2">
               <div className="customer-detail">
                  <h1>Customer details</h1>
                  <div className="customer-infor">
                     <img
                        src={require('../../Assets/Image/account-male.png')}
                        alt=""
                     />
                     <div>
                        <div>{customer.displayName}</div>
                        <div>CustomerId: #{customer.userId}</div>
                     </div>
                  </div>
                  <div>
                     <span className="order-svg">
                        <FaCartPlus />
                     </span>
                     &nbsp;
                     {customer.totalOrder} Order
                  </div>
                  <div>
                     <div className="flex">
                        <h1>Contact Info</h1>
                        <span className="edit">Edit</span>
                     </div>
                     <div>People Receive: {customer.userNameReceive}</div>

                     <div>Email: {customer.email}</div>
                     <div>Phone: {customer.contact}</div>
                  </div>
               </div>
               <div className="shipping">
                  <div className="flex">
                     <h1>Shipping Address</h1>
                     <span className="edit">Edit</span>
                  </div>
                  <p>{customer.shippingAdress}</p>
               </div>
               <div className="billing">
                  <div className="flex">
                     <h1>Payment</h1>
                     <span className="edit">Edit</span>
                  </div>
                  <div>
                     <div>
                        {customer.payment === 'Momo'
                           ? 'VNPAY'
                           : customer.payment}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
};
const Container = styled.div`
   .delete-button-container {
      text-align: right;
      span {
         font-weight: bold;
         color: #333;
         margin-bottom: 10px;
         margin-right: 10px;
      }

      button {
         padding: 10px 15px;
         margin-right: 10px;
         cursor: pointer;
         background-color: #3498db;
         color: #fff;
         border: none;
         border-radius: 4px;
         transition: background-color 0.3s ease;
      }

      button:hover {
         background-color: #2980b9;
      }

      .delete-button {
         background-color: #dc3545;
         color: #fff;
         border: none;
         padding: 10px 20px;
         cursor: pointer;
         border-radius: 5px;
         transition: background-color 0.3s ease;
      }

      .delete-button:hover {
         background-color: #c82333;
      }

      .delete-button:active {
         background-color: #bd2130;
      }
   }

   .container-order {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      background-color: white;
   }

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
         padding: 1.5rem;
      }
      .datatable-product tbody td {
         padding: 1.5rem;
      }

      .datatable-product .td-flex {
         display: flex;
         div {
            margin-left: 10px;
            text-align: left;
         }
      }
      input[type='checkbox'] {
         transform: scale(1.5);
         margin-right: 5px;
      }

      input[type='checkbox']:checked {
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
         content: '';
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
