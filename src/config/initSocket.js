import { io } from "socket.io-client";

const initSocket = async () => {
  const options = {
    forceNew: true, // Always create a new connection
    reconnectionAttempts: Infinity, // Try reconnecting indefinitely
    timeout: 50000, // Connection timeout in milliseconds
    transports: ["websocket"], // Force the use of WebSocket transport
  };

  try {
    const socket = io("http://localhost:5000", options);

    socket.on("connect", () => {
      console.log("Socket.IO connection established");
    });
    socket.on("disconnect", () => {
      console.log("Socket.IO connection closed");
    });
    socket.on("error", (error) => {
      console.error("Socket.IO error:", error);
    });
    return socket; 
  } catch (error) {
    console.error("Error initializing socket:", error);
    throw error;
  }
};
export default initSocket;
