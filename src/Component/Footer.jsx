import React from "react";
import styled from "styled-components";
import {
  AiOutlineSend,
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
const Footer = () => {
  console.log("footer");
  return (
    <Container>
      <div className="infor_footer">
        <div className="address infor_footer__child">
          <a href="#">CAMELIA BRAND </a>
          <h3>Store 1: 633 Nguyễn Đình Chiểu, P.2, Q.3.HCM </h3>
          <h3>Store 2:71 Trần Quang Diệu, P14, Q3, HCM </h3>
          <h3>Hotline : 19001052</h3>

          <h3>thecameliavn@gmail.com</h3>
        </div>
        <div className="social infor_footer__child">
          <div>Đăng kí nhận tin</div>
          <div>
            <input type="text" placeholder="Nhap Mail" />
            <AiOutlineSend />
            <div className="icon">
              <AiFillFacebook />
              <AiOutlineInstagram />
              <AiFillYoutube />
            </div>
          </div>
        </div>
        <div className="purpose infor_footer__child">
          <span>BẠN NÊN XEM</span>
          <span>Giới thiệu</span>
          <span>Phương thức giao hàng</span>
          <span>Phương thức thanh toán</span>
          <span>Chính sách bảo hành</span>
          <span>Chính sách đổi trả</span>
          <span>Chính sách bảo mật</span>
        </div>
      </div>
      <div>
        <hr />
        <span>Copyrights © 2022 by TuanAnh Brand</span>
      </div>
    </Container>
  );
};

const Container = styled.footer`
  display: grid;
  height: 20vh;
  width: 100%;
  grid-template-rows: 2fr 1fr;
  color: white;
  background-color: #212121;
  .infor_footer {
    display: grid;
    grid-template-columns: 1.35fr 1fr 1fr;
    margin: 0 5rem;
    justify-content: center;
    align-items: center;
    .social {
      input {
        width: 92%;
        height: 30%;
      }
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          margin: 2rem;
        }
      }
    }
    .infor_footer__child {
      margin: 0 2rem;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
  hr {
    margin: 0 5rem;
  }
  div {
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
export default Footer;
