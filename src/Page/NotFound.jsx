import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  text-align: center;
  font-family: Arial, sans-serif;

  h2 {
    font-size: 3rem;
    color: #ff0000;
  }

  p {
    font-size: 1.5rem;
    margin-top: 10px;
  }
`;

export default NotFound;
