import React, { useState, useRef, createContext, useContext } from "react";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  const socketRef = useRef(null);

  const connect = (uri) => {
    if (!socketRef.current) {
      const client = new WebSocket(uri);
      setSocket(client);
      socketRef.current = client;
    }
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
      setSocket(null);
      socketRef.current = null;
    }
  };

  const send = (msg) => {
    if (socketRef.current) {
      socketRef.current.send(msg);
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
