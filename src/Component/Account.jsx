import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { styled } from 'styled-components';
import { useStateProvider } from '../StateProvider/StateProvider';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiListOrdered } from 'react-icons/ri';
import { MdOutlinePassword } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaAddressCard } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import processApiImagePath from '../Helper/EditLinkImage';
const Account = ({ component, indexActive = 1 }) => {
   const { pathname } = useLocation();
   const [{ user }, dispatch] = useStateProvider();
   const state = pathname === '/account/profile' ? 1 : 0;
   const navigate = useNavigate();
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);
   return (
      <div>
         <Header />
         <Container>
            <div className="sidebar">
               <div className={`user-section sidebar-child `}>
                  <img
                     src={
                        processApiImagePath(user?.image) ||
                        require('../Assets/Image/nologin.jpg')
                     }
                     alt=""
                  />

                  <div className="user-button">
                     <div>{user?.userName}</div>
                     <div>
                        <AiOutlineEdit />
                        <i>Sửa hồ sơ</i>
                     </div>
                  </div>
               </div>
               <div
                  className={`sidebar-child my-account ${
                     indexActive === 1 ? 'active-choose' : ''
                  }`}
                  onClick={() => {
                     navigate('/account/profile');
                  }}
               >
                  <ImProfile />
                  Hồ sơ
               </div>

               <div
                  className={`sidebar-child ${
                     indexActive === 2 ? 'active-choose' : ''
                  }`}
                  onClick={() => {
                     navigate('/account/change-password');
                  }}
               >
                  <MdOutlinePassword />
                  Đổi mật khẩu
               </div>
               <div
                  className={`sidebar-child ${
                     indexActive == 3 ? 'active-choose' : ''
                  }`}
                  onClick={() => {
                     navigate('/account/address');
                  }}
               >
                  <FaAddressCard />
                  Địa chỉ
               </div>
               <div
                  className={`order hover sidebar-child ${
                     indexActive == 4 ? 'active-choose' : ''
                  }`}
                  onClick={() => {
                     navigate('/account/order');
                  }}
               >
                  <RiListOrdered />
                  Đơn mua
               </div>
            </div>

            <div className="main">{component}</div>
         </Container>
         <Footer />
      </div>
   );
};
const Container = styled.div`
   background-color: #f5f5f5;
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   padding: 20px;

   .main {
      flex: 1;
      border-radius: 5px;
      background-color: white;
      margin-bottom: 20px;
      padding: 20px;
      * {
         font-size: 16px;
      }
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
   }
   .hover:hover {
      cursor: pointer;
   }
   .sidebar {
      max-height: 400px;
      width: 250px;
      background-color: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 20px;
      margin-right: 20px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      * {
         font-size: 16px;
      }
   }

   .sidebar-child {
      margin-bottom: 10px;
      cursor: pointer;
      padding: 10px 0;
   }
   .active-choose {
      background-color: #f5f5f5;
   }
   .sidebar-child svg {
      width: 24px;
      height: 24px;
      margin-right: 10px;
   }
   .user-section {
      display: flex;
      flex-direction: row;
   }
   .user-section img {
      max-width: 40px;
      max-height: 40px;
      border-radius: 50%;
      margin-right: 5px;
   }
   .user-section > div {
      text-align: left;
   }

   .user-button {
      text-align: center;
   }

   .my-account {
      cursor: pointer;
   }
   .my-account > ul,
   .my-account > div {
      width: 100%;
   }

   .my-account img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
   }

   .order {
      display: flex;
      align-items: center;
      cursor: pointer;
   }

   .order img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
   }

   @media screen and (max-width: 1000px) {
      .user-section {
         display: none;
      }
      .sidebar {
         flex: 1;
         margin-bottom: 10px;
         flex-direction: row;
         min-width: 100%;
      }
      .sidebar-child {
         flex: 1;
      }
      .sidebar-child:nth-child(3) {
         display: flex;
         align-items: flex-start;
      }
      .my-account {
         flex-direction: column;
      }
   }
   @media screen and (max-width: 756px) {
      padding: 0;
      .main {
         padding: 5px;
      }
      .sidebar-child {
         min-width: 50%;
      }
   }
`;
export default Account;
