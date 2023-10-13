import React from "react";
import styled from "styled-components";

const Notification = () => {
  const data = [
    { content: "Thông báo 1: Nội dung thông báo ở đây", time: new Date() },
    { content: "Thông báo 2: Nội dung thông báo ở đây", time: new Date() },
    { content: "Thông báo 3: Nội dung thông báo ở đây", time: new Date() },
  ];
  return (
    <Container>
      {data.map((item, index) => (
        <div className="notification-popup" key={index}>
          <div>{item.content}</div>
          <div>{item.time.toString()}</div>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  height: auto;
  max-width: 365px;
  width: 300px;
  position: absolute;
  right: 0px;
  top: 27px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: auto;

  .notification-popup {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Notification;
