// src/services/signalRService.js
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:44301/messageHub", {
    accessTokenFactory: () => {
      const token = JSON.parse(localStorage.getItem("webbanbalo_user")).token
        .accessToken;
      return token;
    },
  })
  .withAutomaticReconnect()
  .build();
export default connection;
