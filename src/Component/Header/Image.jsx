import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import processApiImagePath from '../../Helper/EditLinkImage';
const Image = ({ src, message, replace, key_name, id_image }) => {
   const [imageSrc, setImageSrc] = useState(src);
   const handleMouseOver = () => {
      setImageSrc(replace);
   };
   const navigator = useNavigate();
   const handleMouseOut = () => {
      setImageSrc(src);
   };
   const handlerClick = async (id, name) => {
      navigator(`/collections/${id}`);
   };
   return (
      <Container>
         <img
            src={processApiImagePath(imageSrc)}
            id={`image${key_name}`}
            alt={message}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={() => {
               handlerClick(id_image, message);
            }}
         />
         <div>{message}</div>
      </Container>
   );
};

const Container = styled.div`
   max-height: 82px;
   max-width: 200px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   text-align: center;
   cursor: pointer;
   @media screen and (max-width: 756px) {
      height: 4rem;
   }
   span {
   }

   img {
      min-height: 60px;

      min-width: 60px;
   }
`;

export default Image;
