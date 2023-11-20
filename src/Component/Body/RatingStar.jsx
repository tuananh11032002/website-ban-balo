import styled from 'styled-components';

const RatingStars = ({ totalRating, rating }) => {
   const createStars = (rating) => {
      const stars = [];
      const roundedRating = Math.round(rating); // Làm tròn điểm đánh giá

      for (let i = 0; i < 5; i++) {
         if (i < roundedRating) {
            stars.push(
               <span key={i} className="star">
                  &#9733;
               </span>
            );
         } else {
            stars.push(
               <span key={i} className="star">
                  &#9734;
               </span>
            );
         }
      }

      return stars;
   };

   return (
      <Container>
         {createStars(rating)}
         <span>Có {totalRating || 0} đánh giá</span>
      </Container>
   );
};
export default RatingStars;
const Container = styled.div`
   .star {
      color: #d0011b;
      font-size: 20px;
      margin-right: 2px;
   }
`;
