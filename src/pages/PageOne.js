import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

// import { useCounterContext } from "../containers/Counter";
import {
  useCounterValue,
  useCounterReset,
  useCounterIncrement,
  useCounterDecrement,
} from "../containers/Counter";

const PageOne = () => {
  const history = useHistory();

  // const { count, reset, increment, decrement } = useCounterContext();
  const count = useCounterValue();
  const reset = useCounterReset();
  const increment = useCounterIncrement();
  const decrement = useCounterDecrement();

  const goBack = () => history.goBack();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>PageOne</h1>
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
        <Button style={{ margin: "10px" }} variant="outlined" onClick={goBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default PageOne;
