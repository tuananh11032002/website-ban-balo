import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Product from './Body/Product';
import MyCarousel from './Body/Carousel';
import BootstrapStyledCarousel from './Body/Carousel';
import { useLocation } from 'react-router-dom';
const Body = () => {
   const { pathname } = useLocation();
   return (
      <Container>
         {pathname == '/' ? <BootstrapStyledCarousel /> : null}
         <Product />
      </Container>
   );
};

const Container = styled.main`
   padding: 0;
   margin: 0;
   background-color: #ffffff;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   overflow: hidden;
   width: 100%;
   z-index: 1;
`;
export default Body;
