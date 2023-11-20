import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { styled } from 'styled-components';

const Address = () => {
   return (
      <>
         <Header />
         <Container>
            <h1>CỬA HÀNG</h1>{' '}
            <p>
               Hãy ghé thăm cửa hàng của TUANANH Brand để xem trực tiếp các sản
               phẩm nhé!
            </p>{' '}
            Hệ thống cửa hàng TUANANH Brand:
            <ul style={{ fontWeight: 'bold' }}>
               <li>Store HCM : 71 Trần Quang Diệu, Phường 14, Quận 3 </li>
               <li>Store HCM : 633 Nguyễn Đình Chiểu, Phường 2, Quận 3 </li>
            </ul>
            <p>Giờ mở cửa: từ 9AM đến 10PM các ngày trong tuần.</p>
            <p>
               Chi nhánh 1 tại HCM: 71 Trần Quang Diệu, Phường 14, Quận 3, TP Hồ
               Chí Minh.
            </p>
            <img
               src="https://file.hstatic.net/1000365849/file/756765_48accdfde9d74f1f9a6577056735c791.jpg"
               alt=""
            />
            <img
               src="https://file.hstatic.net/1000365849/file/54645654654654_90bd324e36214555a2810b8a0300edde.jpg"
               alt=""
            />
            <p>Chi nhánh 2 tại HCM: 633 Nguyễn Đình Chiểu, Phường 2, Quận 3.</p>
            <img
               src="https://file.hstatic.net/1000365849/file/aaaaaaaaa_86df97512f7b412eaaea0f0f4d478d8b.jpg"
               alt=""
            />
            <img
               src="https://file.hstatic.net/1000365849/file/ban_do_2_c71c2d5803654cf69132c03702ec5e1f.jpg"
               alt=""
            />
            <hr />
            <p>
               Nếu quý khách có bất kỳ yêu cầu hay thắc mắc nào hoặc không hài
               lòng về sản phẩm/dịch vụ của TUANANH Brand, hãy liên hệ với chúng
               tôi tại TUANANH@gmail.com hoặc 0909140170.
            </p>
         </Container>
         <Footer />
      </>
   );
};
const Container = styled.div`
   padding: 0 5% 2% 5%;
   background-color: #ededed;

   h1 {
      font-size: 2rem;
   }
   h1,
   h2,
   h3,
   p {
      margin: 0.5rem 0;
   }
   max-width: 100%;
   img {
      max-width: 80%;
      display: block; /* Chuyển img thành phần tử block */
      margin: auto; /* Để img nằm giữa Container */
   }
`;
export default Address;
