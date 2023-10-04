import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import checkAndRenewToken from "./Token/token";

const TestSocket = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44301/messagehub", {
      accessTokenFactory: () => {
        checkAndRenewToken();
        const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token
          .accessToken;

        return token;
      },
    })
    .build();

  useEffect(() => {
    const startConnection = async () => {
      try {
        await connection.start();
        console.log("Kết nối đã hoàn tất.");
        setIsConnected(true);
      } catch (err) {
        console.error("Lỗi khi khởi động kết nối:", err);
      }
    };

    startConnection();

    connection.on("ReceiveMessage", (message) => {
      setReceivedMessage(message);
      console.log("Đã nhận tin nhắn");
    });

    return () => {
      connection.stop();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "userId") {
      setUserId(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const sendMessage = () => {
    if (isConnected) {
      setTimeout(function () {
        connection.invoke("SendMessage", userId, message);
        console.log("da gui");
      }, 100);
    } else {
      console.error("Kết nối không ở trạng thái Connected.");
    }
  };

  return (
    <div>
      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={userId}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="message"
        placeholder="Message"
        value={message}
        onChange={handleChange}
      />
      <button onClick={sendMessage}>Send</button>
      <div>Received Message: {receivedMessage}</div>
    </div>
  );
};

export default TestSocket;
