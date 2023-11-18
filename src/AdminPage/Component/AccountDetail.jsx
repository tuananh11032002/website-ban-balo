import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCustomerWithId, updateUserInfoforAdmin } from '../../Axios/web';
import { VscLoading } from 'react-icons/vsc';
import { ToastContainer, toast } from 'react-toastify';
import processApiImagePath from '../../Helper/EditLinkImage';
import { validateEmail } from '../../Helper/CheckInput';

const AccountDetail = () => {
   const { id } = useParams();

   const [customerData, setCustomerData] = useState({
      displayName: 'Lorine Hischke',
      userId: '#45678',
      numberOrder: 5674,
      spent: 19800000,
      userName: 'lorine.hischke',
      email: 'vafgot@vultukir.org',
      status: 'Active',
      contact: '(123) 456-7890',
   });

   const [tempCustomerData, setTempCustomerData] = useState({});
   const [isOpenEditAccount, setisOpenEditAccount] = useState(false);
   const [loading, setLoading] = useState(false);
   const [isReload, setIsReload] = useState(false);
   const fetchData = async (userId) => {
      const dataApi = await getCustomerWithId(userId);
      console.log('dataApi', dataApi);
      if (dataApi?.status) {
         if (JSON.stringify(dataApi.result) !== JSON.stringify(customerData)) {
            setCustomerData(dataApi.result);
         }
      }
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const data = await updateUserInfoforAdmin({
         id: tempCustomerData.id,
         hoTen: tempCustomerData.displayName,
         phone: tempCustomerData.contact,
         email: tempCustomerData.email,

         userStatus: tempCustomerData.status,
      });
      setLoading(false);
      if (data?.status === true) {
         toast.info(`Thay dổi thông tin thành công`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
         });
      } else {
         toast.error(`${data.result}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
         });
      }
      setIsReload(!isReload);
      console.log('dataUpdate ', data);
   };
   useEffect(() => {
      fetchData(id);
   }, [isReload]);
   return (
      <>
         {isOpenEditAccount ? (
            <Overlay>
               <ToastContainer />

               <div className="main-overlay">
                  <div className="user-edit">
                     <header>
                        <h1>Edit User Information</h1>
                        <p>
                           Updating user details will receive a privacy audit.
                        </p>
                     </header>
                     <div className="form-container">
                        <form>
                           <div className="form-group">
                              <label htmlForfor="last-name">Display Name</label>
                              <input
                                 type="text"
                                 id="last-name"
                                 name="last-name"
                                 value={tempCustomerData.displayName}
                                 onChange={(e) =>
                                    setTempCustomerData({
                                       ...tempCustomerData,
                                       displayName: e.target.value,
                                    })
                                 }
                              />
                           </div>

                           <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <input
                                 type="text"
                                 id="username"
                                 name="username"
                                 readOnly
                                 value={tempCustomerData.userName}
                                 onChange={(e) =>
                                    setTempCustomerData({
                                       ...tempCustomerData,
                                       userName: e.target.value,
                                    })
                                 }
                              />
                           </div>

                           <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                 type="email"
                                 id="email"
                                 name="email"
                                 value={tempCustomerData.email}
                                 onChange={(e) =>
                                    setTempCustomerData({
                                       ...tempCustomerData,
                                       email: e.target.value,
                                    })
                                 }
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="phone">Phone</label>
                              <input
                                 type="phone"
                                 id="phone"
                                 name="phone"
                                 value={tempCustomerData.contact}
                                 onChange={(e) =>
                                    setTempCustomerData({
                                       ...tempCustomerData,
                                       contact: e.target.value,
                                    })
                                 }
                              />
                           </div>

                           <div className="form-group">
                              <label htmlFor="status">Status</label>
                              <select
                                 id="status"
                                 name="status"
                                 value={tempCustomerData.status}
                                 onChange={(e) =>
                                    setTempCustomerData({
                                       ...tempCustomerData,
                                       status: e.target.value,
                                    })
                                 }
                              >
                                 <option value="Active">Active</option>
                                 <option value="Inactive">Inactive</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <label htmlFor="role">Role</label>
                              <select
                                 id="role"
                                 name="role"
                                 value={tempCustomerData.role}
                                 onChange={(e) =>
                                    setTempCustomerData({
                                       ...tempCustomerData,
                                       role: e.target.value,
                                    })
                                 }
                              >
                                 <option value="Admin">Admin</option>
                                 <option value="Customer">Customer</option>
                              </select>
                           </div>
                           <div className="button-container">
                              <button
                                 type="submit"
                                 className="submit-button"
                                 onClick={(e) => handleSubmit(e)}
                              >
                                 <span>Submit</span>
                                 {loading ? (
                                    <span className="loading-icons">
                                       <VscLoading />
                                    </span>
                                 ) : null}
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
                  <img
                     src={
                        processApiImagePath(customerData.image) ||
                        require('../../Assets/Image/account-male.png')
                     }
                     alt=""
                  />
                  <div className="name">{customerData.displayName}</div>
                  <div>USER ID: #{customerData.id}</div>
               </div>
               <div className="customer-detail">
                  <div className="title">DETAIL</div>
                  <div className="info">
                     <span className="bold">Username:</span>{' '}
                     {customerData.userName}
                  </div>
                  <div className="info">
                     <span className="bold">Email:</span> {customerData.email}
                  </div>
                  <div
                     className={`status ${customerData?.status.toLowerCase()}`}
                  >
                     <small className="bold">Status:</small>
                     <span>{customerData.status}</span>
                  </div>
                  <div className="info">
                     <span className="bold">Contact:</span>{' '}
                     {customerData.contact}
                  </div>
               </div>
               <div className="custom-div">
                  <button
                     onClick={() => {
                        setTempCustomerData((prevData) => ({
                           ...prevData,
                           ...customerData,
                        }));
                        setisOpenEditAccount(true);
                     }}
                  >
                     Chỉnh sửa
                  </button>
               </div>
            </div>
            {/* <div className="other">
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
        </div> */}
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
      .submit-button .loading-icons {
         margin-left: 10px;
      }
      .submit-button .loading-icons svg {
         animation: spin 2s linear infinite;
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
   justify-content: center;
   flex-wrap: wrap;
   font-size: 16px;
   background-color: white;
   min-height: 80vh;
   h1 {
      font-size: 24px;
   }
   .bold {
      font-weight: bold;
   }
   .card {
      padding: 10px;
      margin-right: 10px;
      min-width: 500px;
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
         background-color: white !important ;

         span {
            background-color: #ffe4e5 !important;
            border-radius: 50rem !important;
            padding: 8px;
            color: #ff0000; /* Màu đỏ cho trạng thái không 'Active' */
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

   /* .other {
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
   } */
   @media screen and (max-width: 1000px) {
      .card {
         min-width: 100%;
      }
   }
`;
export default AccountDetail;
