// ReviewList.js
import React from 'react';
import Review from './Review';
import styled from 'styled-components';

const ReviewList = ({ reviews }) => {
   return (
      <Container>
         {reviews?.map((review, index) => (
            <Review key={index} review={review} />
         ))}
      </Container>
   );
};
const Container = styled.div`
   margin: 16px;
`;
export default ReviewList;
