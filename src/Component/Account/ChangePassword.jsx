import React, { useState } from 'react';
import styled from 'styled-components';

const ChangePassword = () => {
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [message, setMessage] = useState('');

   const handleChange = (e) => {
      const { name, value } = e.target;

      // Cập nhật state tương ứng với ô input được thay đổi
      if (name === 'oldPassword') {
         setOldPassword(value);
      } else if (name === 'newPassword') {
         setNewPassword(value);
      } else if (name === 'confirmPassword') {
         setConfirmPassword(value);
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      // Kiểm tra xác nhận mật khẩu mới
      if (newPassword !== confirmPassword) {
         setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
         return;
      }

      // Gửi thông tin đổi mật khẩu đến server (giả sử là một hàm async)
      // const success = await changePassword(oldPassword, newPassword);

      // Xử lý kết quả từ server
      // if (success) {
      //   setMessage('Đổi mật khẩu thành công');
      // } else {
      //   setMessage('Đổi mật khẩu không thành công. Mật khẩu cũ không đúng.');
      // }
   };

   return (
      <Container>
         <h2>Đổi mật khẩu</h2>
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="oldPassword">Mật khẩu cũ:</label>
               <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label htmlFor="newPassword">Mật khẩu mới:</label>
               <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
               <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
               />
            </div>
            <button type="submit">Đổi mật khẩu</button>
         </form>
         {message && <p>{message}</p>}
      </Container>
   );
};
const Container = styled.div`
   max-width: 400px;
   margin: 0 auto;
   padding: 20px;
   border: 1px solid #ddd;
   border-radius: 8px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

   h2 {
      text-align: center;
      color: #333;
   }

   form {
      display: flex;
      flex-direction: column;
   }

   label {
      margin-bottom: 8px;
      color: #333;
   }
   label::after {
      content: ' *';
      color: red;
   }

   input {
      padding: 8px;
      width: 100%;
      margin-bottom: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
   }

   button {
      padding: 10px;
      background-color: #3498db;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
   }

   button:hover {
      background-color: #2980b9;
   }

   p {
      margin-top: 16px;
      color: #e74c3c;
   }
`;

export default ChangePassword;
