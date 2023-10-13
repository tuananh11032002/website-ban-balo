import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import styled from "styled-components";
import { useStateProvider } from "./StateProvider/StateProvider";
import checkAndRenewToken from "./Token/token";
import { getMessageWithUserId, getUserMessage } from "./Axios/web";
import { FcHome } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [role, setRole] = useState("user");
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const messageListRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [{ connection }, dispatch] = useStateProvider();
  //get user message
  console.log("user", user);
  console.log("selecteduser", selectedUser);
  useEffect(() => {
    const getUser = async () => {
      const response = await getUserMessage();
      if (JSON.stringify(response) != JSON.stringify(user)) {
        setUser(response);
      }
      if (response?.length > 0) {
        setSelectedUser(response[0]);
      }
    };
    getUser();
  }, [user]);
  useEffect(() => {
    getMessage();
  }, [selectedUser]);
  //scroll
  useEffect(() => {
    // Cuộn xuống cuối danh sách tin nhắn sau khi một tin nhắn mới được thêm vào.
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  //hub
  // useEffect(() => {
  //   try {
  //     const connection = new signalR.HubConnectionBuilder()
  //       .withUrl("https://localhost:44301/messageHub", {
  //         accessTokenFactory: () => {
  //           const token = JSON.parse(localStorage.getItem("webbanbalo_user"))
  //             .token.accessToken;
  //           return token;
  //         },
  //       })
  //       .withAutomaticReconnect()
  //       .build();
  //     connection.start();

  //     setConnection(connection);
  //   } catch {
  //     console.log("Server Error");
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     if (connection) {
  //       console.log("WebSocket connected.");
  //       connection.on("ErrorMessage", (message) => {
  //         setMessages((pre) => [...pre, message]);
  //         setNewMessage("");
  //       });

  //       connection.on("ReceiveMessage", (message) => {
  //         const messageJSON = JSON.parse(message);
  //         console.log("message", message);
  //         setMessages((pre) => [
  //           ...pre,
  //           {
  //             content: messageJSON.Content,

  //             receiverUserId: messageJSON.ReceiverUserId,

  //             senderUserId: messageJSON.SenderUserId,

  //             timestamp: messageJSON.Timestamp,
  //           },
  //         ]);
  //         setNewMessage("");
  //       });

  //       connection.on("UserDisabled", (user) => {
  //         // setLoggedInUsers((prevUsers) => prevUsers.filter((u) => u !== user));
  //       });
  //     }
  //   } catch (error) {
  //     console.error("WebSocket connection error:", error);
  //   }

  //   return () => {
  //     connection?.stop();
  //   };
  // }, [connection]);

  useEffect(() => {
    // Đăng ký lắng nghe sự kiện từ Hub
    if (connection) {
      connection.on("ErrorMessage", (message) => {
        setMessages((pre) => [...pre, message]);
        setNewMessage("");
      });

      connection.on("ReceiveMessage", (message) => {
        const messageJSON = JSON.parse(message);
        console.log("message", message);
        setMessages((pre) => [
          ...pre,
          {
            content: messageJSON.Content,

            receiverUserId: messageJSON.ReceiverUserId,

            senderUserId: messageJSON.SenderUserId,

            timestamp: messageJSON.Timestamp,
          },
        ]);

        setNewMessage("");
      });
    }

    return () => {
      // Huỷ đăng ký lắng nghe khi component unmount
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, []);

  const getMessage = async () => {
    if (selectedUser) {
      const response = await getMessageWithUserId(selectedUser.userId);
      if (JSON.stringify(response) != JSON.stringify(messages)) {
        setMessages(response);
      }
    }
  };
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (newMessage.trim() !== "") {
      connection.invoke("SendMessage", selectedUser.userId, newMessage);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleKeyDown = (e) => {
    // Kiểm tra nếu phím "Enter" (keyCode 13) được bấm.
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  console.log("messages", messages);
  function calculateTimeDifference(lastMessageSentTimeString) {
    // Kiểm tra xem chuỗi có đúng định dạng không
    const dateRegex = /^(\d{2}:\d{2}:\d{2} \d{2}\/\d{2}\/\d{4})$/;
    if (!dateRegex.test(lastMessageSentTimeString)) {
      return "Invalid date format";
    }

    // Tách thông tin thời gian và ngày
    const [time, date] = lastMessageSentTimeString.split(" ");
    const [hours, minutes, seconds] = time.split(":");
    const [day, month, year] = date.split("/");

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
        timeDifferenceInSeconds > 1 ? "s" : ""
      } ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      const remainingMinutes = Math.floor(
        (timeDifferenceInSeconds % 3600) / 60
      );

      if (remainingMinutes === 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else {
        return `${hours} hour${
          hours > 1 ? "s" : ""
        } ${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""} ago`;
      }
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  return (
    <>
      <Container>
        <div className="user">
          {user?.map((user, index) => {
            return (
              <div
                className={`user-single ${
                  selectedUser.userId == user.userId ? "selected" : ""
                }`}
                key={index}
                onClick={() => {
                  handleUserClick(user);
                }}
              >
                <img
                  src={require("./Assets/Image/account.png")}
                  alt="Account Image"
                  width="48px"
                  height="48px"
                />
                <div>
                  <div className="userName">{user.userName}</div>
                  <div className="lastMessageTime">
                    {calculateTimeDifference(user.lastMessageSentTimeString)}
                  </div>
                  <div className="lastMessage">{user.lastMessageContent}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="chat-box">
          <div className="action">
            <FcHome
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className="message-list" ref={messageListRef}>
            {messages?.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.senderUserId ==
                  JSON.parse(localStorage.getItem("webbanbalo_user")).userId
                    ? "you"
                    : "other"
                }`}
              >
                {console.log("divmess", message)}
                {console.log(
                  "divlocal",
                  JSON.parse(localStorage.getItem("webbanbalo_user")).userName
                )}
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
  height: 100vh;
  width: 100%;
  /* CSS cho lớp cha 'user' */
  .user {
    display: flex;
    flex-direction: column;
    width: 20%;
    overflow-y: auto;
  }

  /* CSS cho lớp con 'user-single' */
  .user-single {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    transition: background-color 0.2s; /* Hiệu ứng màu nền */
    width: 100%;
  }

  .user-single:hover {
    background-color: #f0f0f0; /* Màu nền khi hover */
  }

  .user-single img {
    margin-right: 10px;
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
    white-space: nowrap; /* Ngăn nội dung xuống dòng */
    overflow: hidden; /* Ẩn nội dung dư thừa */
    text-overflow: ellipsis; /* Hiển thị dấu ... khi nội dung vượt quá */
    max-width: 70%; /* Đặt chiều rộng tối đa cho nội dung last message */
  }
  .selected {
    background-color: #f0f0f0;
  }

  .chat-box {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column; /* Hiển thị tin nhắn từ trên xuống dưới */
    height: 100%;
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

  input[type="text"] {
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
`;
export default App;
