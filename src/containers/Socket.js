import React, { useState, createContext, useContext } from "react";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  const connect = (uri) => {
    if (!socket) {
      setSocket(new WebSocket(uri));
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  const send = (msg) => {
    if (socket) {
      socket.send(msg);
    } else {
      console.error("socket disconnected");
    }
  };

  return { socket, connect, disconnect, send };
};

const Socket = createContext(null);

export const SocketProvider = ({ children }) => {
  const value = useSocket();
  return <Socket.Provider value={value}>{children}</Socket.Provider>;
};

export const useSocketContext = () => useContext(Socket);
