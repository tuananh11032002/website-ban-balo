import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { styled } from "styled-components";

const BootstrapStyledCarousel = () => {
  return (
    <div className="carouselWrapper">
      <MyCarousel />
    </div>
  );
};

const MyCarousel = () => {
  console.log("carousel");
  const product = [
    "https://theme.hstatic.net/1000365849/1000614631/14/ms_banner_img4.jpg?v=174",
    "https://theme.hstatic.net/1000365849/1000614631/14/ms_banner_img3.jpg?v=174",
    "https://theme.hstatic.net/1000365849/1000614631/14/ms_banner_img1.jpg?v=174",
  ];
  return (
    <Container>
      <Carousel
        id="carouselExampleInterval"
        style={{ backgroundColor: "white" }}
      >
        {product?.map((pro, index) => {
          return (
            <Carousel.Item interval={3000} key={index}>
              <img className="d-block w-100 " src={pro} alt="Wild Landscape" />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
};
const Container = styled.div`
  position: relative; /* Bắt đầu vị trí tương đối để chứa nút */

  #carouselExampleInterval {
    max-width: 90%;
    margin: 0 auto;
  }

  /* Cài đặt vị trí cho nút chuyển ảnh */
  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 50%; /* Để căn giữa theo chiều dọc */
    transform: translateY(-50%);
  }

  @media screen and (max-width: 756px) {
    /* Đặt lại chiều cao cho container khi màn hình nhỏ hơn */
    height: 300px;
    img {
      height: 300px;
    }
  }
`;
export default BootstrapStyledCarousel;
