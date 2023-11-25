import React, { createContext, useEffect, useRef, useState } from 'react';
import ProductList from './Component/ProductList';
import styled from 'styled-components';
import { FcCdLogo } from 'react-icons/fc';
import {
   AiOutlineMail,
   AiOutlineHome,
   AiOutlineUser,
   AiOutlineBell,
   AiTwotoneCalendar,
} from 'react-icons/ai';
import { RiCustomerService2Line } from 'react-icons/ri';
import { BsChatDots, BsSearch } from 'react-icons/bs';
import { GrUnorderedList } from 'react-icons/gr';
import { BiSolidCategoryAlt } from 'react-icons/bi';

import { FaProductHunt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import processApiImagePath from '../Helper/EditLinkImage';
import { useStateProvider } from '../StateProvider/StateProvider';
import { GrProductHunt } from 'react-icons/gr';

export const AdminContext = createContext();

const Admin = ({ Child, indexActive = 0, ...props }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isPhone, setIsPhone] = useState(window.innerWidth <= 756);
   const menuParentRef = useRef(null);
   const menuRef = useRef(null);
   const [activeIndex, setActiveIndex] = useState(indexActive || 1);
   const headerRef = useRef(null);
   const mainRef = useRef(null);

   const [scrollPosition, setScrollPosition] = useState(0);
   const [bodyHeight, setBodyHeight] = useState(0);
   const [{ user }] = useStateProvider();
   useEffect(() => {
      const mainHeight = menuRef.current.clientHeight;

      const headerHeight = headerRef.current.clientHeight;

      const calculatedBodyHeight = 100 - headerHeight;
      setBodyHeight(calculatedBodyHeight);
   }, []);
   useEffect(() => {
      const handleScroll = () => {
         setScrollPosition(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const navigate = useNavigate();
   useEffect(() => {
      const header = headerRef.current;

      if (scrollPosition > 0) {
         header.style.backgroundColor = 'white';
         header.style.borderRadius = '0 0 20px 20px';

         header.style.transition = 'background-color 0.3s, box-shadow 0.3s';

         header.style.boxShadow = '0px 3px 6px rgba(0, 0, 0, 0.1)';
      } else {
         header.style.backgroundColor = '#f4f5fa';
         header.style.transition = 'background-color 0.3s, box-shadow 0.3s';
         header.style.boxShadow = 'none';
      }
   }, [scrollPosition]);
   const handleLiClick = (index) => {
      if (index === 1) {
         navigate('/');
      }
      if (index === 2) {
         navigate('/admin');
      }
      if (index === 3) {
         navigate('/admin/chat');
      }
      if (index === 4) {
         navigate('/admin/order-list');
      }
      if (index === 5) {
         navigate('/admin/user-list');
      }
      if (index === 6) {
         navigate('/admin/category-list');
      }
      if (index === 7) {
         navigate('/admin/customer-list');
      }
      if (index === 8) {
         navigate('/admin/add-product/add');
      }
      if (index == 8 && !isPhone) {
         setIsPhone(true);
      }
      if (index != 8 && isPhone && window.innerWidth > 756) {
         setIsPhone(false);
      }

      setActiveIndex(index);
      if (isPhone && isMenuOpen) {
         setIsMenuOpen(false);
      }
   };
   useEffect(() => {
      const overlay = document.getElementsByClassName('overlay')[0];
      if (!isMenuOpen && !isPhone) {
         menuParentRef.current.style.width = '60px';
         menuRef.current.style.width = '60px';
      } else if (isPhone && !isMenuOpen) {
         menuParentRef.current.style.width = '0px';
         menuRef.current.style.width = '0px';
         overlay.style.display = isMenuOpen ? 'block' : 'none';
      } else if (isPhone && isMenuOpen) {
         menuRef.current.style.width = '256px';
         overlay.style.display = isMenuOpen ? 'none' : 'block';
      } else {
         menuParentRef.current.style.width = '256px';
         menuRef.current.style.width = '256px';
      }

      menuParentRef.current.style.transition = 'width 0.3s';
      menuRef.current.style.transition = 'width 0.3s';
   }, [isMenuOpen, isPhone]);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };
   const closeMenu = () => {
      setIsMenuOpen(false);
   };

   useEffect(() => {
      const handleResize = () => {
         setIsMenuOpen(window.innerWidth > 756);
         setIsPhone(window.innerWidth <= 756);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);
   const MenuMouseOver = () => {
      headerRef.current.style.zIndex = 1;
      menuRef.current.style.width = '256px';
   };
   const MenuMouseLeave = () => {
      if (!isMenuOpen) {
         menuRef.current.style.width = '60px';
      }
   };
   return (
      <AdminContext.Provider
         value={{
            closeMenu,
            occupy: bodyHeight,
         }}
      >
         <Container>
            <div
               className={`menu-parent`}
               ref={menuParentRef}
               onMouseLeave={MenuMouseLeave}
               onMouseOver={MenuMouseOver}
            >
               <div
                  className={`menu-icon ${
                     isMenuOpen || !isPhone ? 'hidden' : ''
                  }`}
                  onClick={() => toggleMenu()}
               >
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
               </div>
               <div
                  ref={menuRef}
                  className={`menu ${isMenuOpen ? 'open' : ''} ${
                     !isPhone ? 'menu-not-phone' : ''
                  }`}
               >
                  <div>
                     <div className="logo-branch">
                        <div>
                           <FcCdLogo /> &nbsp;
                           <span>Branch</span>
                        </div>
                        <div className="toggle-menu">
                           <label
                              className={`toggle ${isMenuOpen ? 'on' : 'off'}`}
                           >
                              <input
                                 type="checkbox"
                                 checked={isMenuOpen}
                                 onChange={toggleMenu}
                              />
                              <span className="slider"></span>
                           </label>
                        </div>
                     </div>
                  </div>

                  <ul>
                     <li
                        className={activeIndex === 1 ? 'active' : ''}
                        onClick={() => handleLiClick(1)}
                     >
                        <AiOutlineHome />
                        Home
                     </li>
                     <li
                        className={activeIndex === 2 ? 'active' : ''}
                        onClick={() => handleLiClick(2)}
                     >
                        <GrProductHunt />
                        Product
                     </li>
                     <li
                        className={activeIndex === 3 ? 'active' : ''}
                        onClick={() => handleLiClick(3)}
                     >
                        <BsChatDots />
                        Chat
                     </li>
                     <li
                        className={activeIndex === 4 ? 'active' : ''}
                        onClick={() => handleLiClick(4)}
                     >
                        <GrUnorderedList />
                        Order
                     </li>
                     <li
                        className={activeIndex === 5 ? 'active' : ''}
                        onClick={() => handleLiClick(5)}
                     >
                        <AiOutlineUser />
                        User
                     </li>
                     <li
                        className={activeIndex === 6 ? 'active' : ''}
                        onClick={() => handleLiClick(6)}
                     >
                        <BiSolidCategoryAlt />
                        Category
                     </li>
                     <li
                        className={activeIndex === 7 ? 'active' : ''}
                        onClick={() => handleLiClick(7)}
                     >
                        <RiCustomerService2Line />
                        Customer
                     </li>

                     <li
                        className={activeIndex === 8 ? 'active' : ''}
                        onClick={() => {
                           handleLiClick(8);
                        }}
                     >
                        <FaProductHunt />
                        Add Product
                     </li>
                  </ul>
               </div>
            </div>
            <div
               className="overlay"
               onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
               }}
            ></div>

            <div className="main" ref={mainRef}>
               <nav className="header" ref={headerRef}>
                  {isPhone == true && !isMenuOpen ? (
                     <div
                        className={`menu-icon ${
                           isMenuOpen || !isPhone ? 'hidden' : ''
                        }`}
                        onClick={() => toggleMenu()}
                     >
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                     </div>
                  ) : null}
                  <div className="nav-search">
                     <BsSearch />
                     <input
                        type="text"
                        placeholder="Nhập nội dung cần tìm kiếm"
                     />
                  </div>
                  <div className="nav-action">
                     <div>
                        <AiTwotoneCalendar />
                     </div>

                     <div className="notification">
                        <AiOutlineBell />
                     </div>
                     <div>
                        <img
                           src={
                              processApiImagePath(user?.image) ||
                              require('../Assets/Image/account-male.png')
                           }
                           alt=""
                        />
                        <div className="img-status"></div>
                     </div>
                  </div>
               </nav>
               <main>
                  <Child />
               </main>
            </div>
         </Container>
      </AdminContext.Provider>
   );
};
let backgroundColor = '#f4f5fa';
let boxShadow = '0 0.375rem 1rem 0 rgba(58, 53, 65, 0.12)';
const Container = styled.div`
   display: flex;
   * {
      font-size: 16px;
   }
   .overlay {
      width: 100%;
      height: 100%;
      background-color: rgb(156 154 160);
      opacity: 0.7; /* Màu xám với độ trong suốt */
      position: fixed;
      top: 0;
      left: 0;
      display: none;
      z-index: 2;
   }
   .main {
      flex: 1;
      background-color: rgb(244, 245, 250);
   }
   .menu {
      width: 250px;
      height: 100%;
      background-color: #333;
      position: fixed;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
      background-color: ${backgroundColor};
      z-index: 1;
      * {
         color: black;
      }
      overflow: hidden;
   }

   .menu-not-phone {
      transform: translateX(0);
   }
   .menu-parent {
      z-index: 3;
      width: 250px;

      overflow-x: hidden;
      overflow-y: auto;
   }
   .hidden {
      display: none;
   }
   .menu.open {
      transform: translateX(0);
   }

   .menu-icon {
      cursor: pointer;
      padding: 10px;
      color: black;
      width: 48px;
      height: 48px;
   }

   .bar {
      height: 3px;
      width: 25px;
      background-color: black;
      margin: 3px 0;
   }

   ul {
      list-style: none;
      padding: 0;
   }

   li {
      cursor: pointer;
      padding: 15px;
      color: white;
      white-space: nowrap;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      svg {
         width: 24px;
         height: 24px;
         margin-right: 20px;
         min-width: 24px;
         min-height: 100%;
      }
   }
   .logo-branch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 15px 15px 5px;
      white-space: nowrap;
      svg {
         width: 48px;
         height: 48px;
      }
   }
   /* ToggleButton.css */

   .toggle {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
   }

   .toggle input {
      display: none;
   }

   .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 34px;
   }

   .slider:before {
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      left: -7px;
      bottom: 0px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
   }

   .toggle.on .slider {
      background-color: #2196f3;
   }

   .toggle.on .slider:before {
      transform: translateX(26px);
   }
   .active {
      background-color: rgba(58, 53, 65, 0.08);
      border-radius: 0px 45px 45px 0;
   }
   .main {
      padding: 0 1%;
      background-color: ${backgroundColor};
      width: 100%;
      min-height: 100vh;
      position: relative;

      .header {
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding: 10px; /* Điều chỉnh khoảng cách theo nhu cầu của bạn */
         position: sticky;
         z-index: 1;
         top: 0;
         background-color: ${backgroundColor};
         box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1); /* Bóng bên dưới */
      }

      .nav-search {
         display: flex;
         align-items: center;
      }

      .nav-search input {
         margin-left: 10px;
      }

      .nav-action {
         position: relative;
         display: flex;
         align-items: center;
         & > * {
            margin-right: 10px; /* Đặt margin phía bên phải cho các phần tử con trực tiếp */
         }
         .notification::after {
            content: '';
            width: 10px;
            height: 10px;
            position: absolute;
            top: 0;
            right: 0.5px;
            border-radius: 50%;
            background-color: red;
         }
         svg {
            width: 24px;
            height: 24px;
         }
         img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
         }
         .img-status {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 2px solid white;
            background-color: #56ca00;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 2;
         }
      }
      input[type='text'] {
         width: 100%;
         padding: 10px;
         border: 2px solid #ccc;
         border-radius: 5px;
         font-size: 16px;
         outline: none;
      }

      /* CSS khi input được focus */
      input[type='text']:focus {
         border-color: #007bff;
         box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Hiển thị shadow khi input được focus */
      }
      main {
         padding: 2rem 0;
      }
   }
   /* Điều chỉnh CSS cho màn hình nhỏ hơn 756px */
   @media (max-width: 756px) {
      .menu {
         transform: translateX(-100%);
      }

      .menu-icon {
         display: block;
      }

      .menu.open {
         transform: translateX(0);
      }

      .menu.open .menu-icon {
         display: none;
      }
   }
`;
export default Admin;
