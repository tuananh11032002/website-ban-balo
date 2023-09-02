import React, { useState, useEffect } from "react";
import styled from "styled-components"; // Import từ styled-components

const ProductAddedMessage = ({
  show,
  onClose,
  child = "Sản phẩm đã được thêm vào giỏ hàng",
}) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timeout = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [show, onClose]);

  return <Container className={visible ? "visible" : ""}>{child}</Container>;
};

const Container = styled.div`
  display: none;
  position: fixed;
  top: 50vh; /* Điều chỉnh top để nằm ở giữa màn hình dọc */
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  transition: opacity 0.3s;
  z-index: 3;
  &.visible {
    display: block;
  }
`;

export default ProductAddedMessage;
