import React from "react";
import styled from "styled-components";
import {
  AiOutlineSend,
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="infor_footer">
        <div className="address infor_footer__child">
          <div>
            <a href="#">CAMELIA BRAND </a>
          </div>
          <div>Store 1: 633 Nguyễn Đình Chiểu, P.2, Q.3.HCM </div>
          <div>Store 2:71 Trần Quang Diệu, P14, Q3, HCM </div>
          <div>Hotline : 19001052</div>

          <div>thecameliavn@gmail.com</div>
        </div>
        <div className="social infor_footer__child">
          <div>Đăng kí nhận tin</div>
          <div>
            <div className="input">
              <input type="email" placeholder="Nhap Mail" />
              <AiOutlineSend />
            </div>
            <div className="icon">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillFacebook />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="purpose infor_footer__child">
          <div>BẠN NÊN XEM</div>
          <div>Giới thiệu</div>
          <div>Phương thức giao hàng</div>
          <div>Phương thức thanh toán</div>
          <div>Chính sách bảo hành</div>
          <div>Chính sách đổi trả</div>
          <div>Chính sách bảo mật</div>
        </div>
      </div>
      <div className="copyright">
        <span>Copyrights © 2022 by TuanAnh Brand</span>
      </div>
    </Container>
  );
};

const Container = styled.footer`
  display: grid;
  height: auto;
  width: 100%;
  max-width: 100%;
  grid-template-rows: 3fr 1fr;
  grid-auto-flow: dense;

  background-color: #212121;
  flex-wrap: wrap;
  color: white;

  .infor_footer {
    display: flex;
    padding-left: 50px;
    justify-content: space-between;
    align-items: center;
    .purpose {
      flex: 1;
    }
    .address {
      flex: 1;
    }
    .social {
      flex: 3;
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
      margin: 0 10px;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
  .input {
    background-color: white;
    padding: 1%;
    input {
      outline: none;
      border: none;
    }
    svg {
      &:hover {
        color: red;
      }
      color: black;
      border: none;
    }
  }

  .copyright {
    height: 50px;
    span {
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid white;
      margin: 10px;
    }
  }
  @media screen and (max-width: 1130px) {
    height: 500px;
    .infor_footer {
      padding: 10px;
      * {
        word-wrap: break-word;
      }
    }
    .infor_footer .social {
      order: 1;
      flex: 2;
    }
    .infor_footer > .purpose,
    .infor_footer > .address {
      flex: 1.5;
    }
    .infor_footer > .purpose {
      order: 2;
    }
    .infor_footer > .address {
      order: 3;
      margin: 0;
    }
    .infor_footer {
    }
  }
  @media screen and (max-width: 774px) {
    grid-template-rows: 4fr 1fr;

    .infor_footer {
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
      height: 50px;
    }

    .infor_footer .address {
      /* Đặt .address ở hàng thứ nhất */
      order: 3;
      width: 45%;
      flex: none;
    }

    .infor_footer .purpose {
      /* Đặt .purpose ở hàng thứ hai */
      order: 2;
      width: 45%;
      flex: none;
    }

    .infor_footer .social {
      /* Đặt .social ở hàng thứ ba */
      order: 3;
      width: 90%;
      margin: auto;
      height: 22px;
      margin-top: 10px;
      flex: none;
    }
  }
`;
export default Footer;
