import React, { useEffect } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { styled } from 'styled-components';
const About = () => {
   return (
      <>
         <Header />
         <Container>
            <h1>GIỚI THIỆU</h1>
            <div className="opening">
               <p>Welcome to TUANANH</p>
               <i>
                  "TUANANH puts its heart and soul into every product, giving
                  people minimalism from the smallest things."
               </i>
            </div>
            <hr />
            <div className="body">
               <p>
                  Chắc hẳn chúng ta đều đã và đang gặp phải những rắc rối nhỏ
                  nhặt trong cuộc sống hàng ngày từ việc túi áo quần bị quá tải
                  bởi nhiều vật dụng cho tới việc chìa khóa, tai nghe, điện
                  thoại bị thất lạc trong chính chiếc balo, túi xách mà chúng ta
                  bỏ vào một cách lộn xộn. Nhưng rồi chúng ta dần cho đó là thói
                  quen và sống chung với những vấn đề "nhỏ nhặt" này...
               </p>
               <p>
                  Với thông điệp "More than Simplicity", TUANANH dành trọn tâm
                  huyết để làm ra các sản phẩm của mình. Không chỉ là sự đơn
                  giản ở thiết kế bên ngoài giúp cho người dùng đỡ mất thời gian
                  suy nghĩ đến việc lựa chọn quần áo phù hợp, mà thiết kế bên
                  trong của mỗi sản phẩm đều được chăm chút, tinh gọn nhằm tạo
                  ra sự tiện lợi và ngăn nắp cho người sử dụng.
               </p>
               <p>
                  Hãy trải nghiệm và cảm nhận sự thay đổi của bản thân bạn cùng
                  với TUANANH nhé!
               </p>
            </div>
            <div className="image">
               <img
                  src="https://file.hstatic.net/1000365849/file/ll_9e4d431b90a94b42b2b56f8aedd701fc_grande.jpg"
                  alt=""
               />
            </div>
            <hr />
            <h2 style={{ textAlign: 'center', width: '100%' }}>
               Have a good day!
            </h2>
         </Container>

         <Footer />
      </>
   );
};

const Container = styled.div`
   background-color: #ededed;
   margin: 1rem 0;
   width: 100%;
   height: 100%;
   padding: 0 5rem;
   box-sizing: border-box;
   .image {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .opening {
      text-align: center;
   }
   .body,
   .opening {
      text-indent: 2rem;
      p {
         margin-bottom: 1rem;
      }
   }
   hr {
      margin: 3rem 0;
   }
`;
export default About;
