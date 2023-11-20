import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { styled } from 'styled-components';

const Membership = () => {
   return (
      <>
         <Header />
         <Container>
            <h1>Membership</h1>
            <img
               src="https://file.hstatic.net/1000365849/file/dadadad_b23f35981acb46d9b0aae8d94e6f665e.jpg"
               alt=""
            />
            <h1>CHƯƠNG TRÌNH KHÁCH HÀNG THÂN THIẾT TUANANH BRAND</h1>
            <p>
               Từ những sự ưu ái hết sức đặc biệt của các bạn đã dành cho
               TUANANH trong thời gian vừa qua khi có rất nhiều khách hàng đã sở
               hữu nhiều sản phẩm, ủng hộ và yêu thích TUANANH Brand. Chúng mình
               thật sự trân trọng điều đó.
            </p>
            <p>
               Chương trình khách hàng thân thiết ra đời, với mục tiêu nâng cao
               trải nghiệm khách hàng và tri ân nhiều hơn những khách hàng đã
               đồng hành cùng TUANANH Brand từ những ngày đầu tiên.{' '}
            </p>
            <h2>1. Cách thức hoạt động</h2>{' '}
            <p>
               - Bạn sẽ được tự động cập nhật chi tiêu tích lũy khách hàng thân
               thiết ngay khi mua sản phẩm bất kỳ từ TUANANH Brand.
            </p>
            <p>
               - TUANANH Brand quản lý chi tiêu tích lũy của bạn theo số điện
               thoại đặt hàng, thẻ Membership và Voucher sẽ được phát hành và
               gửi đến tận tay bạn hoàn toàn miễn phí khi bạn đủ điều kiện sở
               hữu. - Khách hàng mua hàng tại cửa hàng xuất trình thẻ hoặc chỉ
               cần đọc số điện thoại là có thể tích luỹ điểm.
            </p>
            <p>
               - Khách hàng mua hàng online trên Website/Facebook/Instagram đều
               được tích luỹ điểm tự động để thăng hạng giống như mua tại cửa
               hàng.
            </p>
            <p>
               - Khách hàng mua hàng online trên website chỉ cần nhập số điện
               thoại mua hàng của mình vào ô 'Code' tại Trang thanh toán là có
               thể nhận được Quyền lợi đúng của hạng thẻ mình đang sở hữu.
               (Trong trường hợp khách hàng chưa trở thành thành viên của
               Membership Program, các bạn đặt đơn hàng không cần nhập số điện
               thoại vào ô 'Code' chúng mình sẽ tự động cập nhật tích luỹ)
            </p>
            <h2>2. Quy định sử dụng</h2>{' '}
            <p>
               - Điểm tích lũy có giá trị từ ngày 01/06/2020 đến hết ngày
               01/06/2021.
            </p>{' '}
            <p>
               - Tất cả đơn hàng trước đây từ trước khi chương trình khách hàng
               thân thiết ra đời đều được tính tích luỹ điểm nhằm tri ân những
               khách hàng đã đồng hành cùng TUANANH từ những ngày đầu tiên.
            </p>{' '}
            <p>
               - Những ưu đãi của hạng thẻ được áp dụng kèm với các chương trình
               khuyến mãi khác.
            </p>{' '}
            <h2>
               {' '}
               3. Các ưu đãi và hạng mức thẻ Điểm tích luỹ được tính theo giá
               trị đơn hàng, mỗi giá trị tích luỹ khác nhau tương ứng với các
               hạng thẻ khác nhau.
            </h2>{' '}
            <h3> 3.1. Loyal Member:</h3>{' '}
            <p>- Điểm tích luỹ: Tổng giá trị đơn hàng đạt mức 2.000.000 VNĐ.</p>{' '}
            <p>
               - Ưu đãi giảm giá 10% toàn bộ đơn hàng. Và còn nhiều phần quà bí
               ẩn khác sẽ được gửi đến bạn trong suốt quá trình trở thành Loyal
               Member.
            </p>{' '}
            <h3>3.2. Premium Member :</h3>{' '}
            <p>
               - Điểm tích luỹ : Tổng giá trị đơn hàng đạt mức 5.000.000 VNĐ.
            </p>{' '}
            <p>
               - Ưu đãi giảm giá 15% toàn bộ đơn hàng. Và còn nhiều phần quà bí
               ẩn khác sẽ được gửi đến bạn trong suốt quá trình trở thành Loyal
               Member.
            </p>{' '}
            <h3>3.3. VIP Member:</h3>{' '}
            <p>
               - Điểm tích luỹ: Tổng giá trị đơn hàng đạt mức 10.000.000 VNĐ.
            </p>{' '}
            <p>
               - Ưu đãi giảm giá 20% toàn bộ đơn hàng. Và còn nhiều phần quà bí
               ẩn khác sẽ được gửi đến bạn trong suốt quá trình trở thành Loyal
               Member.
            </p>
            <hr />
            <h2>
               "Chúng mình biết các bạn có rất nhiều sự lựa chọn, cảm ơn thật
               nhiều vì đã chọn chúng mình hôm nay "
            </h2>
            <p style={{ textIndent: '0' }}>
               Nếu quý khách có bất kỳ yêu cầu hay thắc mắc nào hoặc không hài
               lòng về sản phẩm/dịch vụ của TUANANH, hãy liên hệ với chúng tôi
               tại TUANANH@gmail.com hoặc 19001052.
            </p>
         </Container>
         <Footer />
      </>
   );
};
const Container = styled.div`
   padding: 0 5% 2% 5%;
   background-color: #ededed;
   p {
      text-indent: 0.5rem;
   }
   h1 {
      font-size: 2rem;
   }
   h1,
   h2,
   h3,
   p {
      margin: 0.5rem;
   }
   max-width: 100%;
   img {
      max-width: 100%;
   }
`;

export default Membership;
