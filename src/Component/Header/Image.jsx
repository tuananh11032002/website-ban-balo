import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
    navigator(`/collections/${name}`);
  };
  return (
    <Container>
      <img
        src={imageSrc}
        id={`image${key_name}`}
        alt={message}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={() => {
          handlerClick(id_image, message);
        }}
      />
      <span>{message}</span>
    </Container>
  );
};

const Container = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
  height: 4rem;
  width: 3.5rem;

  img {
    height: 100%;
    width: 100%;
  }
`;

export default Image;
