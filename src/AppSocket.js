import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { useStateProvider } from './StateProvider/StateProvider';
import { getMessageWithUserId, getUserMessage } from './Axios/web';
import { FcHome } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from './AdminPage/Admin';
import processApiImagePath from './Helper/EditLinkImage';
function App() {
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState('');
   const [user, setUser] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);

   const messageListRef = useRef(null);
   const inputRef = useRef(null);
   const navigate = useNavigate();
   const [{ connection }] = useStateProvider();
   const [dataContext, setDataContext] = useState({
      closeMenu: null,
      occupy: null,
   });

   const contextTemp = useContext(AdminContext);
   useEffect(() => {
      if (contextTemp) {
         setDataContext({
            closeMenu: contextTemp.closeMenu,
            occupy: contextTemp.occupy,
         });
      }
   }, []);

   //get user message
   useEffect(() => {
      const getUser = async () => {
         const response = await getUserMessage();
         console.log('response', response);
         if (response?.status) {
            if (JSON.stringify(response.result) != JSON.stringify(user)) {
               setUser(response.result);
            }
            if (response.result?.length > 0) {
               setSelectedUser(response.result[0]);
            }
         }
      };
      getUser();
   }, [user]);
   //get message with userid
   useEffect(() => {
      getMessage();
   }, [selectedUser]);
   //scroll
   useEffect(() => {
      if (messageListRef.current) {
         messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
   }, [messages]);

   //connect server hub
   useEffect(() => {
      // Đăng ký lắng nghe sự kiện từ Hub
      console.log('cone', connection);

      if (connection) {
         connection.on('ErrorMessage', (message) => {
            setMessages((pre) => [...pre, message]);
            setNewMessage('');
         });

         connection.on('ReceiveMessage', (message) => {
            const messageJSON = JSON.parse(message);
            console.log('tin nhan nhan duoc ', messageJSON);
            setMessages((pre) => [
               ...pre,
               {
                  content: messageJSON.Content,

                  receiverUserId: messageJSON.ReceiverUserId,

                  senderUserId: messageJSON.SenderUserId,

                  timestamp: messageJSON.Timestamp,
               },
            ]);

            setNewMessage('');
         });
      }

      return () => {
         if (connection) {
            connection.off('ReceiveMessage');
         }
      };
   }, [connection]);

   const getMessage = async () => {
      if (selectedUser) {
         const response = await getMessageWithUserId(selectedUser.userId);
         if (response?.status) {
            if (JSON.stringify(response.result) != JSON.stringify(messages)) {
               setMessages(response.result);
            }
         }
      }
   };
   const handleInputChange = (e) => {
      setNewMessage(e.target.value);
   };

   const handleSubmit = () => {
      if (newMessage.trim() !== '') {
         connection.invoke('SendMessage', selectedUser.userId, newMessage);
      }
      if (inputRef.current) {
         inputRef.current.focus();
      }
   };
   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSubmit();
      }
   };
   function calculateTimeDifference(lastMessageSentTimeString) {
      // Kiểm tra xem chuỗi có đúng định dạng không
      const dateRegex = /^(\d{2}:\d{2}:\d{2} \d{2}\/\d{2}\/\d{4})$/;
      if (!dateRegex.test(lastMessageSentTimeString)) {
         return 'Invalid date format';
      }

      // Tách thông tin thời gian và ngày
      const [time, date] = lastMessageSentTimeString.split(' ');
      const [hours, minutes, seconds] = time.split(':');
      const [day, month, year] = date.split('/');

      // Tạo đối tượng Date
      const lastMessageSentTime = new Date(
         year,
         month - 1,
         day,
         hours,
         minutes,
         seconds
      );
      const currentTime = new Date();

      const timeDifferenceInSeconds = Math.floor(
         (currentTime - lastMessageSentTime) / 1000
      );

      if (timeDifferenceInSeconds < 60) {
         return `${timeDifferenceInSeconds} minute${
            timeDifferenceInSeconds > 1 ? 's' : ''
         } ago`;
      } else if (timeDifferenceInSeconds < 3600) {
         const minutes = Math.floor(timeDifferenceInSeconds / 60);
         return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (timeDifferenceInSeconds < 86400) {
         const hours = Math.floor(timeDifferenceInSeconds / 3600);
         const remainingMinutes = Math.floor(
            (timeDifferenceInSeconds % 3600) / 60
         );

         if (remainingMinutes === 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
         } else {
            return `${hours} hour${
               hours > 1 ? 's' : ''
            } ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} ago`;
         }
      } else {
         const days = Math.floor(timeDifferenceInSeconds / 86400);
         return `${days} day${days > 1 ? 's' : ''} ago`;
      }
   }

   const handleUserClick = (user) => {
      setSelectedUser(user);
      if (isPhone && isOpenUser) {
         setIsOpenUser(false);
      }
   };
   const [isPhone, setIsPhone] = useState(window.innerWidth < 756);

   useEffect(() => {
      const handleResize = () => {
         setIsPhone(window.innerWidth <= 756);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);
   const [isOpenUser, setIsOpenUser] = useState(false);

   return (
      <>
         <Container height={dataContext.occupy}>
            <div className={`user ${isOpenUser ? 'show-user' : null}`}>
               {user?.map((user, index) => {
                  return (
                     <div
                        className={`user-single ${
                           selectedUser?.userId == user.userId ? 'selected' : ''
                        }`}
                        key={index}
                        onClick={() => {
                           handleUserClick(user);
                        }}
                     >
                        <img
                           src={
                              processApiImagePath(user.image) ||
                              require('./Assets/Image/account.png')
                           }
                           alt="Account Image"
                           width="48px"
                           height="48px"
                        />
                        <div>
                           <div className="userName">{user.userName}</div>
                           <div className="lastMessageTime">
                              {calculateTimeDifference(
                                 user.lastMessageSentTimeString
                              )}
                           </div>
                           <div className="lastMessage">
                              {user.lastMessageContent}
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>

            <div className="chat-box">
               <div className="action">
                  {isPhone ? (
                     <div
                        className={`container-bar`}
                        onClick={() => setIsOpenUser(!isOpenUser)}
                     >
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                     </div>
                  ) : null}
                  <FcHome
                     onClick={() => {
                        navigate('/');
                     }}
                  />
               </div>
               <div className="message-list" ref={messageListRef}>
                  {messages?.map((message, index) => (
                     <div
                        key={index}
                        className={`message ${
                           message.senderUserId ==
                           JSON.parse(localStorage.getItem('webbanbalo_user'))
                              .userId
                              ? 'you'
                              : 'other'
                        }`}
                     >
                        {message.content}
                     </div>
                  ))}
               </div>
               <div className="message-input">
                  <input
                     type="text"
                     placeholder="Nhập tin nhắn..."
                     value={newMessage}
                     onChange={handleInputChange}
                     ref={inputRef}
                     onKeyDown={handleKeyDown}
                  />
                  <button onClick={handleSubmit}>Gửi</button>
               </div>
            </div>
         </Container>
      </>
   );
}
const Container = styled.div`
   display: flex;
   justify-content: center;
   height: ${(props) => (props.height != null ? `${100 - 20}vh` : '100vh')};

   max-height: 100%;
   background-color: white;
   width: 100%;
   /* CSS cho lớp cha 'user' */
   .user {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 5px;
      margin-right: 10px;
      max-width: 300px;
      /* CSS cho lớp con 'user-single' */
      .user-single {
         display: flex;
         align-items: flex-start;
         margin-bottom: 10px;
         padding: 10px;
         border: 1px solid #ccc;
         transition: background-color 0.2s; /* Hiệu ứng màu nền */
         width: 100%;
         border-radius: 5px;
      }

      .user-single:hover {
         background-color: #f0f0f0; /* Màu nền khi hover */
      }

      .user-single img {
         margin-right: 10px;
         border-radius: 50%;
         width: 40px;
         height: 40px;
         object-fit: contain;
      }

      .user-single > div {
         display: flex;
         flex-direction: column;
         width: 100%;
      }

      .user-single .userName {
         font-weight: bold;
      }

      .user-single .lastMessageTime {
         font-size: 0.8em;
         color: #888;
      }

      .user-single .lastMessage {
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         max-width: 70%;
      }
      .selected {
         background-color: #f0f0f0;
      }
   }

   .chat-box {
      flex: 1;
      border: 1px solid #ccc;
      padding: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      flex-direction: column; /* Hiển thị tin nhắn từ trên xuống dưới */
      height: 100%;
      .action {
         display: flex;
         align-items: center;
      }
      .container-bar {
         margin-right: 10px;
      }
      .bar {
         height: 3px;
         width: 25px;
         background-color: black;
         margin: 3px 0;
      }
      .message-list {
         flex: 1; /* Đặt chiều cao tự động */
         display: flex;
         flex-direction: column;
         overflow-y: auto;
      }

      .message-list-inner {
         flex: 1; /* Để tin nhắn lấp đầy chiều cao còn trống */
         padding: 16px;
         overflow-y: auto;
      }

      .message {
         background-color: #f1f0f0;
         padding: 8px;
         margin-bottom: 8px;
         border-radius: 4px;
      }

      /* Định dạng tin nhắn của bạn (you) */
      .message.you {
         align-self: flex-end;
         background-color: #0099ff;
         color: white;
      }
      .message.other {
         align-self: flex-start;
         color: white;
         background-color: black;
         width: auto;
      }

      .message-input {
         display: flex;
         align-items: center;
         padding: 16px;
         background-color: #f1f0f0;
         border-top: 1px solid #ccc; /* Thêm đường kẻ trên cùng */
      }
   }

   input[type='text'] {
      flex: 1;
      padding: 8px;
      border: none; /* Loại bỏ đường biên của input */
   }

   button {
      background-color: #0099ff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
   }
   svg {
      height: 40px;
      width: 40px;
   }
   @media screen and (max-width: 756px) {
      height: ${(props) =>
         props.height != null ? `${props.height - 50}px` : '90vh'};
      .user {
         display: none;
      }
      .show-user {
         background-color: white;
         display: flex;
         z-index: 1;
         max-width: 50%;
      }
      .chat-box {
      }
   }
`;
export default App;
