import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import { useCounterContext } from "../containers/Counter";

const Index = () => {
  const history = useHistory();

  const { count, reset, increment, decrement } = useCounterContext();

  const nav2page = (path) => history.push(path);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Index View</h1>
      <h3 style={{ textAlign: "center" }}>Count: {count}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button style={{ margin: "10px" }} variant="outlined" onClick={reset}>
          Reset
        </Button>
        <Button
          style={{ margin: "10px" }}
          variant="outlined"
          onClick={increment}
        >
          Increment
        </Button>
        <Button
          style={{ margin: "10px" }}
          variant="outlined"
          onClick={decrement}
        >
          Decrement
        </Button>
        <Button
          style={{ margin: "10px" }}
          variant="outlined"
          onClick={() => nav2page("/page_one")}
        >
          Go PageOne
        </Button>
        <Button
          style={{ margin: "10px" }}
          variant="outlined"
          onClick={() => nav2page("/page_two")}
        >
          Go PageTwo
        </Button>
      </div>
    </div>
  );
};

export default Index;
