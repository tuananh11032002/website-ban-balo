import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import processApiImagePath from '../Helper/EditLinkImage';
import { ConfirmOrder, getVNPayLink } from '../Axios/web';
import { VscLoading } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function PaymentInfo({ customerInfor, orderId }) {
   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();
   const handlePaymentMethodSelect = (method) => {
      setSelectedPaymentMethod(method);
   };

   const handleSubmit = async () => {
      setLoading(true);
      const dataTranfer = {
         id: orderId,
         coupon: customerInfor.coupon,
         shippingAddress: `${customerInfor.customerProvince}
           ${customerInfor.customerDistrict}
           ${customerInfor.customerWard}`,
         billingAddress: selectedPaymentMethod.toString(),
         orderNote: customerInfor.customerPhone,
         paymentMethod: selectedPaymentMethod.toString(),
         customerName: customerInfor.customerName,
         customerPhone: customerInfor.customerPhone,
      };
      let data;
      data = await ConfirmOrder(dataTranfer);

      setLoading(false);
      if (data?.status) {
         navigate('/account/order');
      } else {
         toast.error(`${data.result}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
         });
      }
   };
   useEffect(() => {
      const fetchLink = async (dataTemp) => {
         if (selectedPaymentMethod !== 'COD') {
            const data = await getVNPayLink(dataTemp);
            if (data?.status) {
               window.open(data.result, '_blank');
            }
         }
      };

      fetchLink({
         id: orderId,
         coupon: customerInfor.coupon,
         shippingAddress: `${customerInfor.customerProvince}
        ${customerInfor.customerDistrict}
        ${customerInfor.customerWard}`,
         billingAddress: selectedPaymentMethod.toString(),
         orderNote: customerInfor.customerPhone,
         paymentMethod: selectedPaymentMethod.toString(),
         customerName: customerInfor.customerName,
         customerPhone: customerInfor.customerPhone,
      });
   }, [selectedPaymentMethod]);
   return (
      <Container className="payment-info-container">
         <ToastContainer />
         <div className="delivery-time">
            <p> Thời gian nhận hàng:</p>
            <div className="delivery-time-info">
               <div> Vận chuyển trong 2-4 ngày (trừ CN)</div>
               <div>30.000đ</div>
            </div>
         </div>
         <div className="payment-method">
            <p>Phương thức thanh toán:</p>
            <div className="payment-options">
               <label>
                  <input
                     type="radio"
                     value="COD"
                     checked={selectedPaymentMethod === 'COD'}
                     onChange={() => handlePaymentMethodSelect('COD')}
                  />
                  Thanh toán tiền mặt khi nhận hàng (COD)
               </label>
               <label>
                  <input
                     type="radio"
                     value="Momo"
                     checked={selectedPaymentMethod === 'Momo'}
                     onChange={() => handlePaymentMethodSelect('Momo')}
                  />
                  Chuyển khoản ngân hàng (Miễn phí thanh toán)
               </label>
            </div>
            {selectedPaymentMethod === 'Momo' && (
               <div className="momo-image">
                  <img
                     src={processApiImagePath(
                        'https://img.mservice.com.vn/app/img/portal_documents/mini-app_design-guideline_branding-guide-9-2.png'
                     )}
                     alt="Momo"
                  />
               </div>
            )}
         </div>
         <div className="complete-button">
            <button
               onClick={() => {
                  handleSubmit();
               }}
            >
               <span>Hoàn tất</span>
               {loading ? (
                  <span className="loading-icons">
                     <VscLoading />
                  </span>
               ) : null}
            </button>
         </div>
      </Container>
   );
}

export default PaymentInfo;
const Container = styled.div`
   border: 1px solid #ccc;
   padding: 20px;
   margin: 20px;
   max-width: 400px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
   border-radius: 5px;

   .delivery-time {
      font-size: 18px;
      margin-bottom: 10px;
   }
   .delivery-time p {
      font-weight: bold;
   }
   .delivery-time .delivery-time-info {
      display: flex;
      justify-content: space-between;
   }
   .delivery-time .delivery-time-info > :nth-child(2) {
      text-align: right;
   }

   .payment-method p {
      font-weight: bold;
      margin-bottom: 10px;
   }

   .payment-options label {
      display: block;
      margin-bottom: 10px;
   }

   .payment-options input {
      margin-right: 5px;
   }

   .momo-image img {
      max-width: 100px;
      margin-top: 10px;
   }
   .complete-button {
      text-align: right;
   }
   .complete-button button {
      background-color: #0099ff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;

      cursor: pointer;
   }

   .complete-button button:hover {
      background-color: #0077cc;
   }
   .loading-icons {
      margin-left: 10px;
   }
   .loading-icons svg {
      animation: spin 2s linear infinite;
   }
`;
