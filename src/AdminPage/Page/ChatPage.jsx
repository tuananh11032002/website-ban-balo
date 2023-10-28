import React from "react";
import Admin from "../Admin";
import WebSocket from "../../AppSocket";
const ChatPage = () => {
  return <Admin indexActive={3} Child={WebSocket}></Admin>;
};

export default ChatPage;
