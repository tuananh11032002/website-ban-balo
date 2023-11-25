import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from './Image';
import { getCategoryApi } from '../../Axios/web';
import { useStateProvider } from '../../StateProvider/StateProvider';
import { reducerCases } from '../../StateProvider/reducer';
const Controller = () => {
   const [{ category }, dispatch] = useStateProvider();
   const [data, setData] = useState([]);
   useEffect(() => {
      const fetchData = async () => {
         const data = await getCategoryApi();
         if (data?.status) {
            if (JSON.stringify(data.result) != JSON.stringify(category)) {
               dispatch({
                  type: reducerCases.SET_CATEGORY,
                  category: data.result,
               });
            }
         }
      };
      fetchData();
   }, [category]);

   return (
      <Container>
         {category?.map(({ image, imageReplace, name, id }, index) => (
            <div className="image" key={index}>
               <Image
                  id_image={id}
                  src={image}
                  message={name}
                  replace={imageReplace}
                  key={index}
                  key_name={index}
               ></Image>
            </div>
         ))}
      </Container>
   );
};
const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-wrap: wrap;
   height: auto;
   border-top: 1px solid #cccccc;
   border-bottom: 1px solid #cccccc;
   * {
      user-select: none;
   }
   .image {
      height: 100px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      &:not(:last-child) {
         border-right: 1px solid #eeeeee;
      }
   }

   @media screen and (max-width: 756px) {
      .image {
         border: none;
         margin: auto;
         min-width: 50%;
      }
      .image:not(:last-child) {
         border-right: none;
      }
   }
`;

export default Controller;
