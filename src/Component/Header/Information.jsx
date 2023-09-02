import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Information = () => {
  const navigate = useNavigate();
  const HandlerClick = () => {
    navigate("/");
  };
  return (
    <Container>
      <div className="column">
        <div>
          <CustomLink to={"/about-us"}>ABOUT US</CustomLink>
        </div>
        <div>
          {" "}
          <CustomLink to={"/address"}>ADDRESS</CustomLink>
        </div>
      </div>
      <div
        className="column"
        style={{
          width:
            "200px" /* Đảm bảo hình ảnh không bị vượt quá kích thước 100px */,
          height: "60px",
        }}
      >
        <img
          onClick={() => {
            HandlerClick();
          }}
          src={require("../../Assets/Image/trantuananh-brand-logo.png")}
          alt="Unable load Image"
        />
      </div>
      <div className="column">
        <div>
          <CustomLink to={"/"}>BLOG</CustomLink>
        </div>
        <div>
          <CustomLink to={"/membership"}>MEMBERSHIP</CustomLink>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between; /* Để căn đều các đối tượng theo chiều ngang */
  align-items: center; /* Để căn các đối tượng theo chiều dọc (nếu cần) */
  margin: 1% 10%;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    &:hover {
      cursor: pointer;
    }
  }

  > .column {
    flex: 1;
  }
  .column {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  @media screen and (max-width: 756px) {
    margin: auto auto;
    img {
      width: 100px; /* Đảm bảo hình ảnh không bị vượt quá kích thước 100px */
    }
    .column {
      > div {
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
`;
const CustomLink = styled(Link)`
  /* CSS tùy chỉnh cho liên kết */
  text-decoration: none; /* Gỡ bỏ gạch chân */
  color: black; /*
  
  /* Bất kỳ kiểu CSS nào khác mà bạn muốn áp dụng cho liên kết */
  user-select: none;
  * {
    text-align: center;
  }
  &:hover {
    cursor: pointer;
    color: red;
  }
`;
export default Information;
