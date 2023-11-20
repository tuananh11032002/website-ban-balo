import React from 'react';
import styled from 'styled-components';
import {
   AiOutlineSend,
   AiFillFacebook,
   AiOutlineInstagram,
   AiFillYoutube,
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
   const navigate = useNavigate();

   return (
      <Container>
         <div className="footer-info">
            <div className="address info-child">
               <div>
                  <a href="#">TUANANH BRAND</a>
               </div>
               <div>Store 1: 633 Nguyễn Đình Chiểu, P.2, Q.3.HCM</div>
               <div>Store 2: 71 Trần Quang Diệu, P14, Q3, HCM</div>
               <div>Hotline: 19001052</div>
               <div>thecameliavn@gmail.com</div>
            </div>
            <div className="social info-child">
               <div>Đăng kí nhận tin</div>
               <div>
                  <div className="input">
                     <input type="email" placeholder="Nhập Mail" />
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
            <div className="useful-links info-child">
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
   background-color: #333;
   color: #fff;
   padding: 20px;
   font-size: 16px;
   text-align: center;
   * {
      font-size: 16px;
   }
   .footer-info {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      svg {
         width: 22px;
         height: 22px;
      }
      .info-child {
         flex: 1;
         padding: 10px;
      }

      .address {
      }

      .social div:nth-child(2) .input {
         width: 100%;
         background-color: white;
         border: 1px;
         border-radius: 5px;
         display: flex;
         align-items: center;
         justify-content: space-between;
      }
      .social div:nth-child(2) .input input {
         outline: none;
         border: none;
         padding: 5px;
         border-radius: 5px;
         flex: 1;
      }
      .social div:nth-child(2) .input svg {
         color: #02090f;
      }

      .useful-links {
      }
   }

   .copyright {
   }
   @media screen and (max-width: 765px) {
      .social {
         order: 3;
         min-width: 100%;
      }
      .useful-links {
         display: none;
      }
   }
`;

export default Footer;
