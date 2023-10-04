import React, { useState } from "react";
import { styled } from "styled-components";
import User from "../../Assets/Image/User";

const Profile = () => {
  const [isEditing, setIsEditing] = useState("");
  const [email, setEmail] = useState("ttuananh372@gmail.com");
  const [phone, setPhone] = useState("039345679");

  const handleEditClick = (value) => {
    setIsEditing(value);
  };

  const handleInputChange = (e) => {
    if (isEditing == "email") {
      setEmail(e.target.value);
    } else {
      setPhone(e.target.value);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <Container>
      <div className="title">
        <h2>Hồ sơ của tôi</h2>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className="content">
        <div className="input">
          <div className="input-child">
            <label htmlFor="">Tên đăng nhập</label>
            <input className="flex_1" />
          </div>
          <div className="input-child">
            <label htmlFor="">Họ và tên</label>
            <input className="flex_1" />
          </div>
          <div className="input-child">
            <label htmlFor="">Email</label>
            <div className="flex_1">
              {isEditing == "email" ? (
                <input type="text" value={email} onChange={handleInputChange} />
              ) : (
                <>
                  <span>{email}</span>
                  <span
                    className="change"
                    onClick={() => {
                      handleEditClick("email");
                    }}
                  >
                    Thay đổi
                  </span>
                </>
              )}
            </div>
            {isEditing == "email" && (
              <button onClick={handleSaveClick}>Lưu</button>
            )}
          </div>
          <div className="input-child">
            <label htmlFor="">Số điện thoại</label>
            <div className="flex_1">
              {isEditing == "phone" ? (
                <input type="text" value={phone} onChange={handleInputChange} />
              ) : (
                <>
                  <span>{phone}</span>
                  <span
                    className="change"
                    onClick={() => {
                      handleEditClick("phone");
                    }}
                  >
                    Thay đổi
                  </span>
                </>
              )}
            </div>
            {isEditing == "phone" && (
              <button onClick={handleSaveClick}>Lưu</button>
            )}
          </div>
          <div className="input-child">
            <label htmlFor="">Giới tính</label>
            <input type="checkbox" name="Nam" id="" />
          </div>
          <div className="input-child">
            <label htmlFor="">Ngày sinh</label>
          </div>
        </div>
        <div className="update-image">
          <div className="image"></div>
          <div className="button">Chọn ảnh</div>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  overflow-y: hidden;
  .title {
    border-bottom: 1px solid #3e3b3ba0;
  }
  .flex_1 {
    flex: 1;
  }
  .change {
    font-style: italic;
    color: blue;
    text-decoration: underline;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
  }
  .content {
    display: flex;
    padding: 1rem 5rem;
    .input {
      margin: 0 4rem;
      flex: 1;
      .input-child {
        display: flex;
        align-items: center;
        margin: 1.5rem 0;
        height: 40px;
        label {
          margin-right: 2rem;
          display: block;
          width: 20%;
          text-align: right;
        }
        input {
          padding: 5px;
          margin-right: 10px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 10px;
        }

        /* CSS cho nút "Lưu" */
        button {
          background-color: #007bff; /* Màu nền */
          color: #fff; /* Màu chữ */
          padding: 5px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3; /* Màu nền khi hover */
        }
      }
    }
    .update-image {
      width: 17.5rem;
      border: 1px;
      .button {
        top: 20%;
        left: 30%;
        display: inline;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        padding: 10px 20px;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease; /* Hiệu ứng chuyển đổi màu nền */
      }

      .button:hover {
        background-color: #2980b9; /* Màu nền khi di chuột qua nút */
      }

      .image {
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 100px;
        width: 100px;
        border-radius: 50%;
        background-color: #f5f5f5;
      }
    }
  }
`;
export default Profile;
