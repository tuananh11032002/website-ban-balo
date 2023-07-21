import Carousel from "./Body/Carousel";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCATEGORYAPI } from "../Axios/web";
import axios from "axios";
import Product from "./Body/Product";
const Body = () => {
  return (
    <Container>
      <Carousel />
      <Product />
    </Container>
  );
};

const Container = styled.main`
  padding: 0;
  margin: 0;
  background-color: #eeeeee;
  overflow: hidden;
  margin-bottom: 20vh;
  width: 100%;
`;
export default Body;
