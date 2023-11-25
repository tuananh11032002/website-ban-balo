import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import processApiImagePath from '../Helper/EditLinkImage';
import { InsertReview } from '../Axios/web';
import { useStateProvider } from '../StateProvider/StateProvider';
import { toast, ToastContainer } from 'react-toastify';
const Rating = ({ product, onClose, onLoad }) => {
   const [{ user }] = useStateProvider();
   const [rating, setRating] = useState(1);
   const [comment, setComment] = useState('');
   const [isCommentValid, setIsCommentValid] = useState(true);

   const handleRate = (value) => {
      setRating(value);
   };

   const handleCommentChange = (event) => {
      const newComment = event.target.value;
      setComment(newComment);
      setIsCommentValid(newComment.length >= 50);
   };

   const handleCommentSubmit = async () => {
      // const userId = parseInt(user.id);
      // console.log(user.id);
      console.log({
         comment,
         rating,
         productId: product.id,
         userId: user.userId,
         orderId: product.orderId,
         userName: user.displayName,
      });

      const data = await InsertReview({
         comment,
         rating,
         productId: product.id,
         userId: user.userId,
         orderId: product.orderId,
         userName: user.displayName,
      });
      if (data.status) {
         toast.info('Bình luận thành công', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
         });
         setComment('');
         setIsCommentValid(true);
         onClose();
         onLoad();
      } else {
         toast.error(`${data.result}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
         });
      }
      // console.log(data);
   };
   console.log(user, 'product');
   return (
      <Container>
         <ToastContainer />
         <div className="rating">
            <div
               className="close-button"
               onClick={() => {
                  onClose();
               }}
            >
               <IoMdClose />
            </div>

            <div className="product-info">
               <img src={processApiImagePath(product?.image)} alt="" />
               <div>
                  <h2>{product?.name}</h2>
                  <h2>{product?.price.toLocaleString()}đ</h2>
               </div>
            </div>
            {[1, 2, 3, 4, 5].map((value) => (
               <span
                  key={value}
                  className={value <= rating ? 'star active' : 'star'}
                  onClick={() => handleRate(value)}
               >
                  &#9733;
               </span>
            ))}
            <div className="comment-section">
               <textarea
                  placeholder="Nhập bình luận của bạn..."
                  value={comment}
                  onChange={handleCommentChange}
                  className={isCommentValid ? '' : 'invalid'}
               />
               {!isCommentValid && (
                  <div className="warning">
                     Bình luận phải có ít nhất 50 ký tự.
                  </div>
               )}
               <button onClick={handleCommentSubmit}>Gửi bình luận</button>
            </div>
         </div>
      </Container>
   );
};

const Container = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100vh;
   width: 100%;
   z-index: 1000;
   background: rgba(255, 255, 255, 0.7);

   .rating {
      font-size: 24px;
      text-align: center;
      width: 400px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      border: 1px solid rgba(8, 3, 3, 0.1);
   }
   .close-button {
      position: absolute;
      top: 5px;
      right: 7px;
      cursor: pointer;
   }
   .product-info {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
   }

   .product-info > div {
      text-align: left;
   }
   .product-info img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
   }

   .star {
      cursor: pointer;
      color: #ccc;
      font-size: 30px; /* Kích thước lớn hơn cho ngôi sao */
   }

   .star.active {
      color: #ffc107; /* Màu của ngôi sao khi được chọn */
   }

   .comment-section {
      margin-top: 20px;
   }

   .comment-section textarea {
      width: 100%;
      height: 80px;
      resize: none;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      padding: 10px;
      font-size: 16px;
   }

   .comment-section textarea.invalid {
      border-color: #dc3545; /* Màu đỏ khi ô input không hợp lệ */
   }

   .comment-section .warning {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
   }

   .comment-section button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px;
      cursor: pointer;
      font-size: 16px;
   }
`;

export default Rating;
