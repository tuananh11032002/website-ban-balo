import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PermissionDenied = () => {
   const navigate = useNavigate();
   return (
      <Container>
         <p className="permission-denied-message">
            Oops! You don't have permission to access this page. Please log in.
         </p>
         <button
            onClick={() => {
               navigate('/login');
            }}
            className="login-button"
         >
            Login
         </button>
      </Container>
   );
};

export default PermissionDenied;
const Container = styled.div`
   max-width: 400px;
   margin: auto;
   padding: 20px;
   border: 1px solid #ccc;
   border-radius: 5px;
   background-color: #f8f8f8;
   text-align: center;
   margin: 30px auto;

   .permission-denied-message {
      font-size: 16px;
      margin-bottom: 15px;
   }

   .login-button {
      padding: 10px 15px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 14px;
   }

   .login-button:hover {
      background-color: #0056b3;
   }
`;
