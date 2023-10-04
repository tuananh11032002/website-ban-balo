import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Body from "../Component/Body";
import { Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Logo from "../Assets/Image/Logo";
const Home = () => {
  return (
    <Container>
      <Header />
      <Logo />
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
  width: 100%;
  height: 100vh;

  .footer__home {
  }
`;
export default Home;
