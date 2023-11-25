import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useStateProvider } from '../../StateProvider/StateProvider';
import { getUserWithId, updateUserInfo } from '../../Axios/web';
import processApiImagePath from '../../Helper/EditLinkImage';
import { validateEmail, validatePhone } from '../../Helper/CheckInput';
import { ToastContainer, toast } from 'react-toastify';
import { VscLoading } from 'react-icons/vsc';

const Profile = () => {
   const [email, setEmail] = useState('ttuananh372@gmail.com');
   const [phone, setPhone] = useState('039345679');
   const [userName, setUserName] = useState('');
   const [hoTen, setHoTen] = useState('');

   const [selectedImage, setSelectedImage] = useState();

   //To show
   const [image, setImage] = useState();
   const [selectedGender, setselectedGender] = useState();
   const [{ user }] = useStateProvider();
   const [userInfor, setUserInfor] = useState({});
   const [loading, setLoading] = useState(false);
   const fetchUser = async () => {
      const userId = JSON.parse(localStorage.getItem('webbanbalo_user')).userId;
      const userTemp = await getUserWithId(userId);

      console.log('userTemp', userTemp);
      if (userTemp?.status === true) {
         setUserInfor(userTemp.result);
         setHoTen(userTemp.result.hoTen);
         setEmail(userTemp.result.email);
         setPhone(userTemp.result.phone || '');
         setUserName(userTemp.result.userName);
         setselectedGender(userTemp.result.gender || '');
         setImage(userTemp.result.image);
      }
      const dataStorage = JSON.parse(localStorage.getItem('webbanbalo_user'));
      if (
         JSON.stringify(dataStorage.image) !==
         JSON.stringify(userTemp.result.image)
      ) {
         const newDataStorage = {
            ...dataStorage,
            image: userTemp.result.image,
         };
         localStorage.setItem(
            'webbanbalo_user',
            JSON.stringify(newDataStorage)
         );
      }
   };
   useEffect(() => {
      if (user) {
         fetchUser();
      }
   }, []);

   const handleSaveChange = async () => {
      try {
         setLoading(true);
         const response = await updateUserInfo({
            phone,
            email,
            hoTen,
            gender: selectedGender,
            phone,
            image: selectedImage,
            id: userInfor.id,
         });
         setLoading(false);
         if (response?.status === true) {
            toast.info(`Thay dổi thông tin thành công`, {
               position: toast.POSITION.TOP_CENTER,
               autoClose: 1000,
            });
            fetchUser();
         } else {
            toast.error(`${response.result}`, {
               position: toast.POSITION.TOP_CENTER,
               autoClose: 3000,
            });
         }
         console.log('API response:', response);
      } catch (error) {
         console.error('API error:', error);
      }
   };

   const handleChangeEmail = (e) => {
      const inputEmail = e.target.value;
      setEmail(inputEmail);
      const isValidEmail = validateEmail(inputEmail);
   };
   const handleBrowseImageClick = () => {
      if (imageInputRef.current) {
         imageInputRef.current.click();
      }
   };
   const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImage(URL.createObjectURL(file));
   };
   const imageInputRef = useRef();

   const handlePhoneNumberChange = (e) => {
      const inputPhoneNumber = e.target.value;
      setPhone(inputPhoneNumber);
   };
   return (
      <Container>
         <ToastContainer />

         <div className="title">
            <div>
               <h2>Hồ sơ của tôi </h2>
               <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <button
               onClick={() => {
                  handleSaveChange();
               }}
            >
               <span>Lưu thay đổi</span>
               {loading ? (
                  <span className="loading-icons">
                     <VscLoading />
                  </span>
               ) : null}
            </button>
         </div>
         <div className="content">
            <div className="user-info">
               <div className="user-info-item">
                  <label htmlFor="username">Tên đăng nhập</label>
                  <input
                     id="username"
                     className="full-width-input"
                     value={userName}
                     onChange={(e) => setUserName(e.target.value)}
                     readOnly
                  />
               </div>
               <div className="user-info-item">
                  <label htmlFor="fullname">Họ và tên</label>
                  <input
                     id="fullname"
                     className="full-width-input"
                     value={hoTen}
                     onChange={(e) => setHoTen(e.target.value)}
                  />
               </div>
               <div className="user-info-item">
                  <label htmlFor="email">Email</label>
                  <input
                     className="full-width-input"
                     type="text"
                     value={email}
                     onChange={(e) => handleChangeEmail(e)}
                  />
                  {validateEmail(email) ? (
                     <p style={{ color: 'green' }}>Email hợp lệ.</p>
                  ) : (
                     <p style={{ color: 'red' }}>Email không hợp lệ.</p>
                  )}
               </div>
               <div className="user-info-item">
                  <label htmlFor="phone">Số điện thoại</label>

                  <input
                     type="text"
                     value={phone}
                     className="full-width-input"
                     onChange={(e) => handlePhoneNumberChange(e)}
                  />
                  {!validatePhone(phone) ? (
                     <p style={{ color: 'red' }}>Số điện thoại không hợp lệ.</p>
                  ) : (
                     <p style={{ color: 'green' }}>Số điện thoại hợp lệ.</p>
                  )}
               </div>

               <div className="user-info-item">
                  <label htmlFor="gender">Giới tính</label>
                  <select
                     value={selectedGender}
                     onChange={(e) => setselectedGender(e.target.value)}
                  >
                     <option value="">Chọn giới tính </option>
                     <option value="Male">Nam </option>
                     <option value="Female">Nữ </option>
                  </select>
               </div>
            </div>

            <div className="update-image">
               <div className="image">
                  {image ? (
                     <img src={processApiImagePath(image)} alt="Selected" />
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
                  style={{ display: 'none' }}
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
      display: flex;
      padding-bottom: 10px;
      border-bottom: 1px solid #3e3b3ba0;
      justify-content: space-between;
      button {
         background-color: #0074d9;
         color: #fff;
         border: none;
         padding: 5px 10px;
         border-radius: 5px;
         cursor: pointer;
         font-size: 14px;
      }

      button:hover {
         background-color: #0056b3;
      }

      button:focus {
         outline: none;
      }
      .loading-icons {
         margin-left: 10px;
      }
      .loading-icons svg {
         animation: spin 2s linear infinite;
      }
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
            padding: 10px;
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
            overflow: hidden;
         }
         .image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
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
