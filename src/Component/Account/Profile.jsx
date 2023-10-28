import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import User from "../../Assets/Image/User";
import { DatePicker } from "antd";

const Profile = () => {
  const [email, setEmail] = useState("ttuananh372@gmail.com");
  const [phone, setPhone] = useState("039345679");
  const [selectedImage, setSelectedImage] = useState();

  const handleBrowseImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const imageInputRef = useRef();
  return (
    <Container>
      <div className="title">
        <h2>Hồ sơ của tôi </h2>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className="content">
        <div className="user-info">
          <div className="user-info-item">
            <label htmlFor="username">Tên đăng nhập</label>
            <input id="username" className="full-width-input" />
          </div>
          <div className="user-info-item">
            <label htmlFor="fullname">Họ và tên</label>
            <input id="fullname" className="full-width-input" />
          </div>
          <div className="user-info-item">
            <label htmlFor="email">Email</label>
            <input className="full-width-input" type="text" value={email} />
          </div>
          <div className="user-info-item">
            <label htmlFor="phone">Số điện thoại</label>

            <input type="text" value={phone} className="full-width-input" />
          </div>

          <div className="user-info-item">
            <label htmlFor="gender">Giới tính</label>
            <select>
              <option value="">Chọn giới tính </option>
              <option value="nam">Nam </option>
              <option value="nu">Nữ </option>
            </select>
          </div>
          <div className="user-info-item">
            <label htmlFor="birthdate">Ngày sinh</label>
            <input
              type="date"
              name="birthday"
              id=""
              className="full-width-input"
            />
          </div>
        </div>

        <div className="update-image">
          <div className="image">
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
            ) : null}
          </div>
          <div
            className="button"
            onClick={() => {
              handleBrowseImageClick();
            }}
          >
            Chọn ảnh
          </div>
          <input
            type="file"
            name=""
            id=""
            style={{ display: "none" }}
            ref={imageInputRef}
            accept="image/*"
            onChange={handleImageChange}
          />
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

  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    .user-info {
      display: flex;
      flex-wrap: wrap;
      .user-info-item {
        width: 50%;
        padding: 10px;
      }

      label {
        font-weight: bold;
      }

      .full-width-input {
        width: 100%;
        display: flex;
        align-items: center;
      }

      .edit-button {
        margin-left: 10px;
        cursor: pointer;
        color: blue;
        text-decoration: underline;
      }
      /* Hiệu ứng hover cho button và input */
      button {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        margin-top: 10px;
      }
      input {
        padding: 10px 20px;
        border-radius: 5px;
      }
      select {
        font-size: 18px;
        padding: 10px;
        border-radius: 5px;
        width: 100%;
      }

      button:active {
        background-color: #0056b3;
        color: #fff;
      }
    }

    .update-image {
      flex: 0.3;
      border: 1px solid;
      border-radius: 5px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      height: 200px;

      .button {
        border: 1px solid black;
        padding: 10px 20px;
        background-color: #3498db;
        color: #ffffff;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .button:hover {
        background-color: #2980b9;
      }

      .image {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        background-color: #f5f5f5;
        margin-bottom: 20px;
      }
      .image img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  @media screen and (max-width: 950px) {
    .content {
      justify-content: center;
    }
    .content .user-info {
      order: 2;
    }
    .update-image {
      justify-content: center;
    }
    .user-info-item {
      min-width: 100%;
    }
  }
`;
export default Profile;
