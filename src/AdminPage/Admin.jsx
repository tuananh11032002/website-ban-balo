import React, { useEffect, useRef, useState } from "react";
import ProductList from "./Component/ProductList";
import styled from "styled-components";
import { FcCdLogo } from "react-icons/fc";
import {
  AiOutlineMail,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBell,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { BsChatDots, BsSearch } from "react-icons/bs";
import { GrUnorderedList } from "react-icons/gr";
import { BiSolidCategoryAlt } from "react-icons/bi";

const Admin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 756);
  const menuParentRef = useRef(null);
  const menuRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const headerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(scrollPosition);
    const header = headerRef.current;

    if (scrollPosition > 0) {
      header.style.backgroundColor = "white";
      header.style.borderRadius = "0 0 20px 20px";

      header.style.transition = "background-color 0.3s, box-shadow 0.3s";

      header.style.boxShadow = "0px 3px 6px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.backgroundColor = "#f4f5fa";
      header.style.transition = "background-color 0.3s, box-shadow 0.3s";
      header.style.boxShadow = "none";
    }
  }, [scrollPosition]);
  const handleLiClick = (index) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    console.log("isPhone", isPhone);
    console.log("isMenuOpen", isMenuOpen);
    const overlay = document.getElementsByClassName("overlay")[0];
    if (!isMenuOpen && !isPhone) {
      menuParentRef.current.style.width = "60px";
      menuRef.current.style.width = "60px";
    } else if (isPhone && !isMenuOpen) {
      menuParentRef.current.style.width = "0px";
      menuRef.current.style.width = "0px";
      overlay.style.display = isMenuOpen ? "block" : "none";
    } else if (isPhone && isMenuOpen) {
      menuRef.current.style.width = "256px";
      overlay.style.display = isMenuOpen ? "block" : "none";
    } else {
      menuParentRef.current.style.width = "256px";
      menuRef.current.style.width = "256px";
    }

    menuParentRef.current.style.transition = "width 0.3s";
    menuRef.current.style.transition = "width 0.3s";
  }, [isMenuOpen, isPhone]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth > 756);
      setIsPhone(window.innerWidth <= 756);
      console.log(isPhone);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const MenuMouseOver = () => {
    headerRef.current.style.zIndex = 1;
    menuRef.current.style.width = "256px";
  };
  const MenuMouseLeave = () => {
    if (!isMenuOpen) {
      menuRef.current.style.width = "60px";
      console.log("eave");
    }
  };
  return (
    <Container>
      <div
        className={`menu-parent`}
        ref={menuParentRef}
        onMouseLeave={MenuMouseLeave}
        onMouseOver={MenuMouseOver}
      >
        <div
          className={`menu-icon ${isMenuOpen || !isPhone ? "hidden" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div
          ref={menuRef}
          className={`menu ${isMenuOpen ? "open" : ""} ${
            !isPhone ? "menu-not-phone" : ""
          }`}
        >
          <div>
            <div className="logo-branch">
              <div>
                <FcCdLogo /> &nbsp;
                <span>Branch</span>
              </div>
              <div className="toggle-menu">
                <label className={`toggle ${isMenuOpen ? "on" : "off"}`}>
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
              className={activeIndex === 1 ? "active" : ""}
              onClick={() => handleLiClick(1)}
            >
              <AiOutlineHome />
              Home
            </li>
            <li
              className={activeIndex === 2 ? "active" : ""}
              onClick={() => handleLiClick(2)}
            >
              <AiOutlineMail />
              Email
            </li>
            <li
              className={activeIndex === 3 ? "active" : ""}
              onClick={() => handleLiClick(3)}
            >
              <BsChatDots />
              Chat
            </li>
            <li
              className={activeIndex === 4 ? "active" : ""}
              onClick={() => handleLiClick(4)}
            >
              <GrUnorderedList />
              Order
            </li>
            <li
              className={activeIndex === 5 ? "active" : ""}
              onClick={() => handleLiClick(5)}
            >
              <AiOutlineUser />
              User
            </li>
            <li
              className={activeIndex === 6 ? "active" : ""}
              onClick={() => handleLiClick(6)}
            >
              <BiSolidCategoryAlt />
              Category
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

      <div className="main">
        <nav className="header" ref={headerRef}>
          {isPhone == true && !isMenuOpen ? (
            <div
              className={`menu-icon ${isMenuOpen || !isPhone ? "hidden" : ""}`}
              onClick={toggleMenu}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          ) : null}
          <div className="nav-search">
            <BsSearch />
            <input type="text" placeholder="Nhập nội dung cần tìm kiếm" />
          </div>
          <div className="nav-action">
            <div>
              <AiTwotoneCalendar />
            </div>

            <div className="notification">
              <AiOutlineBell />
            </div>
            <div>
              <img src={require("../Assets/Image/account-male.png")} alt="" />
              <div className="img-status"></div>
            </div>
          </div>
        </nav>
        <main>
          <ProductList />
        </main>
      </div>
    </Container>
  );
};
let backgroundColor = "#f4f5fa";
let boxShadow = "0 0.375rem 1rem 0 rgba(58, 53, 65, 0.12)";
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
    z-index: 3;
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
    content: "";
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
    position: relative;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px; /* Điều chỉnh khoảng cách theo nhu cầu của bạn */
      position: sticky;
      z-index: 2;
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
        content: "";
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
    input[type="text"] {
      width: 100%;
      padding: 10px;
      border: 2px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      outline: none;
    }

    /* CSS khi input được focus */
    input[type="text"]:focus {
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
