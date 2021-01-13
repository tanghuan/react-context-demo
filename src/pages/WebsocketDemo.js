import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import { useCounterContext } from "../containers/Counter";
import { useSocketContext } from "../containers/Socket";

const WebsocketDemo = () => {
  const [response, setResponse] = useState(null);
  const history = useHistory();

  const { count, increment, decrement } = useCounterContext();

  const { socket, connect, disconnect, send } = useSocketContext();

  // 创建链接
  useEffect(() => {
    connect("wss://echo.websocket.org/");
    return () => {
      disconnect();
    };
  }, []);

  // 保持活性
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (socket) {
  //       send("ping");
  //     }
  //   }, 30000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [socket, send]);

  // 监听数据
  useEffect(() => {
    if (socket) {
      socket.onmessage = ({ data }) => {
        setResponse(data);
      };
    }
  }, [socket]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>WebSocket Demo</h1>
      <h3 style={{ textAlign: "center" }}>
        WebSocket: {socket ? "Connecting" : "Disconnected"}, Count: {count},
        ServerResposne: {response}
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => connect("wss://echo.websocket.org/")}
          style={{ margin: "10px" }}
        >
          Connect
        </Button>
        <Button
          variant="outlined"
          onClick={disconnect}
          style={{ margin: "10px" }}
        >
          Disconnect
        </Button>
        <Button
          variant="outlined"
          onClick={increment}
          style={{ margin: "10px" }}
        >
          Increment
        </Button>
        <Button
          variant="outlined"
          onClick={decrement}
          style={{ margin: "10px" }}
        >
          Decrement
        </Button>
        <Button
          variant="outlined"
          onClick={() => send(count)}
          style={{ margin: "10px" }}
        >
          Send Count
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            history.goBack();
          }}
          style={{ margin: "10px" }}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default WebsocketDemo;
