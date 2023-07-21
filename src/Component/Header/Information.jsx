import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Information = () => {
  return (
    <Container>
      <span>
        <CustomLink to={"/Tam"}>ABOUT US</CustomLink>
      </span>

      <span>ADDRESS</span>
      <img
        src={
          "https://theme.hstatic.net/1000365849/1000614631/14/logo.png?v=142"
        }
      />
      <span>BLOG</span>
      <span>MEMBERSHIP</span>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between; /* Để căn đều các đối tượng theo chiều ngang */
  align-items: center; /* Để căn các đối tượng theo chiều dọc (nếu cần) */
  margin: 3% 10%;
  img {
    max-width: 15%; /* Đảm bảo hình ảnh không bị vượt quá kích thước 100px */
  }
`;
const CustomLink = styled(Link)`
  /* CSS tùy chỉnh cho liên kết */
  text-decoration: none; /* Gỡ bỏ gạch chân */
  color: black; /*
  
  /* Bất kỳ kiểu CSS nào khác mà bạn muốn áp dụng cho liên kết */
  &:hover {
    cursor: pointer;
    color: red;
  }
`;
export default Information;
