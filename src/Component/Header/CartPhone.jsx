import React from 'react';
import processApiImagePath from '../../Helper/EditLinkImage';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useStateProvider } from '../../StateProvider/StateProvider';
import { DeleteProductIntoOrder } from '../../Axios/web';
import { reducerCases } from '../../StateProvider/reducer';
import { GiReturnArrow } from 'react-icons/gi';

const CartPhone = ({ cart, onClose }) => {
   const navigate = useNavigate();
   const [{ user }, dispatch] = useStateProvider();
   const handlerRemove = async (productid) => {
      if (user) {
         const response = await DeleteProductIntoOrder(productid);
         if (response?.status)
            dispatch({ type: reducerCases.SET_CART, cart: [] });
      } else {
         navigate('/');
      }
   };
   return (
      <Container>
         <div className="container-cart">
            <div className="header">
               <h2>Giỏ hàng</h2>
               <GiReturnArrow onClick={() => onClose(false)} />
            </div>
            {cart?.productOrder?.length > 0 ? (
               <>
                  <ul>
                     {cart?.productOrder?.map((cart, index) => (
                        <li key={cart?.id}>
                           <img src={processApiImagePath(cart?.image)} alt="" />
                           <div>
                              <div>{cart?.name}</div>
                              <div>{cart?.priceNow.toLocaleString()}đ</div>
                              <div>Số lượng: {cart?.quantity}</div>
                           </div>
                           <button
                              onClick={() => {
                                 handlerRemove(cart.id);
                              }}
                           >
                              Xóa
                           </button>
                        </li>
                     ))}
                  </ul>
                  <h3
                     style={{
                        textAlign: 'right',
                        paddingRight: '10px',
                     }}
                  >
                     Tổng tiền: &nbsp;
                     {cart ? `${cart.totalAmount.toLocaleString()}đ` : '-----'}
                  </h3>
                  <div className="direction">
                     <div
                        onClick={() => {
                           onClose(false);

                           navigate('/cart');
                        }}
                     >
                        Tuỳ chỉnh
                     </div>
                     <div
                        onClick={() => {
                           onClose(false);

                           navigate('/pay');
                        }}
                     >
                        Thanh toán
                     </div>
                  </div>
               </>
            ) : (
               <div>
                  Đơn hàng rỗng.Tiếp tục mua hàng{' '}
                  <Link
                     to={'/'}
                     onClick={() => {
                        onClose(false);
                     }}
                  >
                     tại đây
                  </Link>
               </div>
            )}
         </div>
      </Container>
   );
};

export default CartPhone;
const Container = styled.div`
   z-index: 4;
   width: 100vw;
   height: 100vh;
   position: fixed;
   background-color: rgba(0, 0, 0, 0.6);
   top: 0px;
   left: 0px;
   .header {
      display: flex;
      justify-content: space-between;
      padding: 10px;
   }
   .container-cart {
      background-color: white;
      max-height: 350px;
      max-width: 250px;
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translate(0, -50%);
      border-radius: 5px;
      min-height: 350px;
      min-width: 250px;
   }
   ul {
      list-style: none;
      padding: 0;
      overflow-y: auto;
      width: 250px;
      height: 200px;
   }

   li {
      display: flex;
      margin: 10px 0;
      border: 1px solid #ddd;
   }
   li:first-child {
      margin-top: 0;
   }

   li img {
      max-width: 80px;
      max-height: 80px;
      margin-right: 10px;
   }

   li div {
      flex: 1;
      display: flex;
      flex-direction: column;
   }

   li div > div:first-child {
      font-weight: bold;
      font-size: 14px;
   }

   li div > div:nth-child(2) {
      font-size: 12px;
      color: #333;
   }

   /* Định dạng số lượng sản phẩm */
   li div > div:last-child {
      font-size: 12px;
      color: #777;
   }

   button {
      background-color: #835c59;
      color: #fff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 14px;
   }

   button:hover {
      background-color: #d32f2f;
   }

   text-align: center;

   ul {
      margin: 0;
   }

   & > div:last-child {
      font-size: 16px;
      margin-top: 10px;
      color: #007bff;
   }

   div.direction {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
   }

   div.direction > div {
      cursor: pointer;
      font-size: 16px;
      background-color: #007bff;
      border-radius: 5px;
      color: #fff;
      padding: 10px 20px;
      border: none;
      transition: background-color 0.3s;
   }

   div.direction > div:hover {
      background-color: #0056b3;
   }
`;
