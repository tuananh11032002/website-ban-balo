import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useStateProvider } from '../../StateProvider/StateProvider';
import {
   AddProductIntoOrder,
   DeleteProductIntoOrder,
   GetOrder,
} from '../../Axios/web';
import { reducerCases } from '../../StateProvider/reducer';
import { Link, useNavigate } from 'react-router-dom';
import ProductAddedMessage from './ProductAddedMessage';
import processApiImagePath from '../../Helper/EditLinkImage';
import { ToastContainer, toast } from 'react-toastify';

const Table = () => {
   const navigate = useNavigate();

   const [{ cart, user }, dispatch] = useStateProvider();
   const [count, setCount] = useState(cart?.productOrder);

   useEffect(() => {
      setCount(cart?.productOrder);
   }, [cart]);

   const handleIncrease = (index) => {
      const updatedCount = [...count];
      updatedCount[index] = { ...updatedCount[index] };
      updatedCount[index].quantity = updatedCount[index].quantity + 1;
      setCount(updatedCount);
   };
   const handleDecrease = (index) => {
      const updatedCount = [...count];
      updatedCount[index] = { ...updatedCount[index] };
      updatedCount[index].quantity =
         updatedCount[index].quantity - 1 >= 0
            ? updatedCount[index].quantity - 1
            : 0;
      setCount(updatedCount);
   };
   const SaveData = async (productdetail, dem) => {
      const response = await AddProductIntoOrder({
         ProdductId: productdetail.id,

         Quantity: dem,
      });
      return response;
   };
   const DeleteData = async (productdetail) => {
      const response = await DeleteProductIntoOrder(productdetail.id);
   };
   const fetchCart = async () => {
      if (user) {
         const data = await GetOrder();
         console.log(data, 'data');
         if (data?.status)
            dispatch({ type: reducerCases.SET_CART, cart: data.result });
      } else {
         navigate('/');
      }
   };
   const handleClick = (cart, count) => {
      let messageError = '';
      cart?.productOrder?.forEach(async (element, index) => {
         if (
            element.quantity !== count[index].quantity &&
            count[index].quantity !== 0
         ) {
            if (user) {
               const data = await SaveData(element, count[index].quantity);
               if (data?.status) {
                  dispatch({ type: reducerCases.SET_CART, cart: count });
               } else {
                  messageError = data.result;
               }
            } else {
               navigate('/');
            }
         } else if (count[index].quantity == 0) {
            if (user) {
               await DeleteData(element, user.token.accessToken);
               fetchCart();
            } else {
               navigate('/');
            }
         }
      });
      if (messageError !== '') {
         toast.error(`${messageError}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
         });
      } else {
         toast.info(`Cập nhật thành công`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
         });
      }
   };
   return (
      <>
         <ToastContainer />

         <Container>
            <thead>
               <tr>
                  <th colSpan="2">Thông tin sản phẩm</th>
                  <th>Đơn giá</th>
                  <th> Số lượng</th>
                  <th>Tổng giá</th>
               </tr>
            </thead>
            <tbody>
               {count?.map((count, index) => {
                  return (
                     <tr key={index}>
                        <td>
                           <img src={processApiImagePath(count.image)} alt="" />
                        </td>
                        <td>{count.name}</td>
                        <td>{count.priceNow.toLocaleString()}đ</td>
                        <td>
                           <div>
                              <div
                                 onClick={() => {
                                    handleDecrease(index);
                                 }}
                              >
                                 -
                              </div>
                              <div>{count.quantity}</div>
                              <div
                                 onClick={() => {
                                    handleIncrease(index);
                                 }}
                              >
                                 +
                              </div>
                           </div>
                        </td>
                        <td>
                           {(count.quantity * count.price).toLocaleString()}đ
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </Container>
         <DivContainer>
            <div
               className="custom-button update"
               onClick={() => {
                  handleClick(cart, count);
               }}
            >
               Cập nhật
            </div>
            <div
               className="custom-button payment"
               onClick={() => {
                  navigate('/pay');
               }}
            >
               Thanh toán
            </div>
         </DivContainer>
      </>
   );
};
const LinkCustome = styled(Link)`
   text-decoration: none;
   color: black;
`;
const DivContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
   margin: 0 auto;
   margin-top: 20px;
   max-width: 80%;
   .custom-button {
      user-select: none;
      cursor: pointer;
      padding: 10px 20px;
      border-radius: 5px;
      text-align: center;
      transition: background-color 0.3s;
      color: #007bff;
      background-color: #fff;
   }
   .custom-button:first-child {
      margin-right: 10px;
   }

   .custom-button.update {
      background-color: #007bff;
      color: #fff;
   }

   .custom-button.payment {
      background-color: #ff6f61;
      color: #fff;
   }

   .custom-button.update:hover {
      background-color: #0056b3;
      color: #fff;
   }

   .custom-button.update:active {
      background-color: #007bff;
      color: #fff;
   }

   .custom-button.payment:hover {
      background-color: #f64333;
      color: #fff;
   }

   .custom-button.payment:active {
      background-color: #ff6f61;
      color: #fff;
   }
`;
const Container = styled.table`
   width: 100%;
   max-width: 80%;
   margin: 0 auto;
   font-family: Arial, sans-serif;
   margin-top: 10px;
   thead tr {
      background-color: #333;
      color: #fff;
   }

   thead th {
      padding: 10px;
   }

   tbody td {
      padding: 10px;
      border-bottom: 1px solid #ccc;
   }

   tbody td img {
      max-width: 100px;
      max-height: 100px;
   }

   tbody td div {
      display: flex;
      align-items: center;
   }

   tbody td div > div {
      cursor: pointer;
      padding: 5px;
      width: 20px;
      height: 20px;
      justify-content: center;
      background-color: #007bff;
      color: #fff;
      user-select: none;

      border-radius: 50%;
      margin: 0 5px;
   }

   tbody td:last-child {
      font-weight: bold;
   }
`;

export default Table;
