import React, { useState } from "react";
import styled from "styled-components";
import { Register } from "../Axios/web";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    userName: "",
    password: "",
    role: "user",
    createdDate: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gửi dữ liệu đăng ký lên server hoặc xử lý tại đây.
    const data = await Register(formData);
  };

  return (
    <Container>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="HoTen">Họ và tên:</label>
          <input
            type="text"
            id="HoTen"
            name="hoTen"
            value={formData.hoTen}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="UserName">Tên đăng nhập:</label>
          <input
            type="text"
            id="UserName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Password">Mật khẩu:</label>
          <input
            type="password"
            id="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  div {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;
export default RegisterPage;
