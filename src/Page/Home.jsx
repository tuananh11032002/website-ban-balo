import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Body from "../Component/Body";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
const Home = () => {
  return (
    <Container>
      <Header />
      <Body />
      <Outlet />
      <div className="footer__home">
        <Footer />
      </div>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  .footer__home {
  }
`;
export default Home;
