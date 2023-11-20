import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';
import styled from 'styled-components';
import { Register } from '../Axios/web';
import { useNavigate } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { ToastContainer, toast } from 'react-toastify';

function RegistrationPage() {
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [gender, setGender] = useState('');
   const [passwordStrength, setPasswordStrength] = useState('Yếu');
   const [showPassword, setShowPassword] = useState(false);
   const [showLabel, setShowLabel] = useState(false);
   const [errol, setErrol] = useState([]);
   const navigate = useNavigate();
   const inputRef = useRef(null);

   const handleInputFocus = () => {
      if (inputRef.current && showLabel) {
         setShowLabel(true);
      }
   };

   const handleInputBlur = () => {
      if (inputRef.current && inputRef.current.value === '') {
         setShowLabel(true);
      }
   };

   const handleInputChange = (event) => {
      setUserName(event.target.value);
      if (event.target.value === '') {
         setShowLabel(true);
      } else {
         setShowLabel(false);
      }
   };

   const handlePasswordChange = (event) => {
      const newPassword = event.target.value;
      setPassword(newPassword);

      let newStrength = 'Yếu';
      if (newPassword.length >= 6) {
         if (
            /[a-z]/.test(newPassword) &&
            /[A-Z]/.test(newPassword) &&
            /[0-9]/.test(newPassword)
         ) {
            newStrength = 'Mạnh';
         } else {
            newStrength = 'Vừa';
         }
      }
      setPasswordStrength(newStrength);
   };

   const toggleShowPassword = () => {
      setShowPassword(!showPassword);
   };

   const handleRegistration = async () => {
      let errolTemp = [];
      console.log(password !== confirmPassword);
      console.log('password', password, confirmPassword === '');
      if (password === '') {
         errolTemp.push(<div key={uniqueId}>Hãy nhập password</div>);
      } else if (password.length < 6) {
         errolTemp.push(
            <div key={uniqueId}>Mật khẩu hãy nhập từ 6 ký tự trở lên</div>
         );
      }
      if (confirmPassword === '' && password !== '') {
         errolTemp.push(<div key={uniqueId}>Hãy nhập confirm password</div>);
      }

      if (
         password !== confirmPassword &&
         password !== '' &&
         confirmPassword !== ''
      ) {
         errolTemp.push(
            <div key={uniqueId}>
               Kiểm tra lại password và confirm password. Chúng không khớp
            </div>
         );
      }

      if (userName === '') {
         errolTemp.push(<div key={uniqueId}>Không để trống user name</div>);
      }
      console.log(errolTemp);
      if (errolTemp.length === 0) {
         const response = await Register({ userName, password });
         if (response?.status === true) {
            navigate('/login');
         } else {
            setErrol([response.result]);
            toast.error(`${response.result}`, {
               position: toast.POSITION.TOP_CENTER,
               autoClose: 3000,
            });
            return;
         }
      }
      setErrol(errolTemp);
   };

   return (
      <>
         <ToastContainer />

         <Container>
            <h2>Đăng ký</h2>
            <div className="form-group">
               <label className="force">UserName</label>
               <input
                  type="text"
                  value={userName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  ref={inputRef}
               />
               {showLabel ? (
                  <div style={{ color: 'red' }}>Phải nhập user name</div>
               ) : null}
            </div>
            <div className="form-group">
               <label className="force">Mật khẩu</label>
               <div className="password-input">
                  <input
                     type={showPassword ? 'text' : 'password'}
                     value={password}
                     onChange={handlePasswordChange}
                  />
                  <button onClick={toggleShowPassword}>
                     {showPassword ? <AiOutlineEyeInvisible /> : <BiShow />}
                  </button>
               </div>
               {password !== '' ? (
                  <div
                     className={`password-strength ${
                        passwordStrength === 'Mạnh'
                           ? 'green'
                           : passwordStrength === 'Vừa'
                           ? 'yellow'
                           : null
                     } `}
                  >
                     {passwordStrength}
                  </div>
               ) : null}
            </div>
            <div className="form-group">
               <label className="force">Xác nhận mật khẩu</label>
               <div className="password-input">
                  <input
                     type={showPassword ? 'text' : 'password'}
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button onClick={toggleShowPassword}>
                     {showPassword ? <AiOutlineEyeInvisible /> : <BiShow />}
                  </button>
               </div>
            </div>
            <div className="form-group">
               <label>Giới tính</label>
               <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
               >
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
               </select>
            </div>
            <button onClick={handleRegistration}>Đăng ký</button>
            <div className="errol">{errol.map((p) => p)}</div>
            <p className="login-link">
               Tôi đã có tài khoản? <a href="/login">Đăng nhập</a>
            </p>
         </Container>
      </>
   );
}

const Container = styled.div`
   max-width: 400px;
   margin: 0 auto;
   padding: 20px;
   background-color: #f0f0f0;
   border: 1px solid #ccc;
   border-radius: 5px;
   box-shadow: 0px 0px 5px 0px #ccc;
   transform: translateY(10%);

   h2 {
      text-align: center;
   }

   .form-group {
      margin: 10px 0;
   }

   label {
      display: block;
      font-weight: bold;
   }

   input[type='text'],
   input[type='password'],
   select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
   }

   .password-input {
      display: flex;
      align-items: center;
   }
   .password-input button {
      position: absolute;
      top: 5px;
      right: 5px;
   }

   button {
      padding: 6px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 5px;
   }

   button:hover {
      background-color: #0056b3;
   }

   .password-strength {
      margin-top: 5px;
      font-weight: bold;
      color: red;
   }
   .password-strength.yellow {
      color: orange;
   }
   .password-strength.green {
      color: green;
   }

   .login-link {
      text-align: center;
      margin-top: 10px;
   }

   .login-link a {
      color: #007bff;
      text-decoration: none;
   }

   .login-link a:hover {
      text-decoration: underline;
   }
   .force::after {
      content: ' *';
      color: red;
   }
`;

export default RegistrationPage;
