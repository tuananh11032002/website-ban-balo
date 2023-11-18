import React from 'react';
import styled from 'styled-components';
import ProcessDate from '../../Helper/ProcessDate';
const StarIcon = styled.span`
   font-size: 18px;
   margin-right: 4px;
   color: #f8d605; /* Màu của sao đã đánh giá */
`;

const Review = ({ review }) => {
   const { userName, comment, rating, datePosted } = review;

   const stars = Array.from({ length: rating }, (_, index) => (
      <StarIcon key={index}>&#9733;</StarIcon>
   ));

   return (
      <Container>
         <div className="user-info">
            <strong>{userName}</strong> - {ProcessDate(datePosted)}
         </div>
         <div className="rating">Rating: {stars}</div>
         <div className="content">{comment}</div>
      </Container>
   );
};

const Container = styled.div`
   /* Review.css */

   border: 1px solid #e0e0e0;
   padding: 16px;
   margin-bottom: 16px;
   border-radius: 8px;
   background-color: #fff;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

   .user-info {
      font-size: 14px;
      color: #555;
      margin-bottom: 8px;
   }

   .rating {
      font-size: 16px;
      color: #f8d605; /* Màu khi đánh giá */
      margin-bottom: 8px;
      display: flex;
      align-items: center;
   }

   .star {
      font-size: 18px;
      margin-right: 4px;
   }

   .filled {
      color: #f8d605;
   }

   .content {
      font-size: 16px;
      line-height: 1.4;
   }
`;
export default Review;
