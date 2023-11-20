import React, { useState } from 'react';
import styled from 'styled-components';
import { Login } from '../Axios/web';
import ProductAddedMessage from '../Component/Body/ProductAddedMessage';
import { useNavigate } from 'react-router-dom';
import { useStateProvider } from '../StateProvider/StateProvider';
import { reducerCases } from '../StateProvider/reducer';

const LoginContainer = styled.div`
   display: flex;
   justify-content: center;
   height: 100vh;
   background-color: #e0e0e0;
`;

const LoginForm = styled.div`
   background-color: #ffffff;
   border-radius: 12px;
   padding: 40px;
   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
   width: 500px;
   display: flex;
   flex-direction: column;
   align-items: center;
   height: 400px;
   transform: translateY(10%);
`;

const Title = styled.h2`
   margin-bottom: 24px;
   color: #333;
`;

const Input = styled.input`
   width: 100%;
   padding: 14px;
   margin-bottom: 20px;
   border: 1px solid #ccc;
   border-radius: 6px;
   font-size: 16px;
`;

const Button = styled.button`
   width: 100%;
   padding: 14px;
   background-color: #007bff;
   color: #fff;
   border: none;
   border-radius: 6px;
   font-size: 16px;
   cursor: pointer;
   transition: background-color 0.3s ease;

   &:hover {
      background-color: #0056b3;
   }
   &:active {
      background-color: #3c6c9e;
   }
`;
const P = styled.p`
   text-align: center;
   margin-top: 10px;

   a {
      color: #007bff;
      text-decoration: none;
   }

   a:hover {
      text-decoration: underline;
   }
`;
const LoginPage = () => {
   var temp = null;
   localStorage.setItem('myTempValue', JSON.stringify(temp));
   const result = localStorage.getItem('myTempValue');
   const [errol, setErrol] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [{}, dispatch] = useStateProvider();
   const navigate = useNavigate();
   const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
         handleLogin(e);
      }
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      const data = await Login({ password, username });
      if (data?.status) {
         setShowProductAdded(true);
         dispatch({ type: reducerCases.SET_USER, user: data.result });
         localStorage.setItem('webbanbalo_user', JSON.stringify(data.result));
         setTimeout(() => {
            navigate('/');
         }, 1000);
      } else {
         setErrol(data?.result || 'Đăng nhập thất bại');
      }
   };
   const [showProductAdded, setShowProductAdded] = useState(false);
   const handleCloseMessage = () => {
      setShowProductAdded(false);
   };
   return (
      <>
         <ProductAddedMessage
            show={showProductAdded}
            onClose={handleCloseMessage}
            child="Đăng nhập thành công"
         />
         <LoginContainer>
            <LoginForm>
               <Title>Welcome Back!</Title>
               <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
               />
               <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
               />
               <Button onClick={(e) => handleLogin(e)}>Login</Button>
               {errol ? <div className="errol">{errol}</div> : null}
               <P>
                  Tôi chưa có tài khoản? <a href="/register">Tạo tài khoản</a>
               </P>
            </LoginForm>
         </LoginContainer>
      </>
   );
};

export default LoginPage;
