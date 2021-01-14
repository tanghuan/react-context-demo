import React from "react";
import { useLocalStorageState } from "ahooks";
import constate from "constate";
import axios from "axios";
import jwtdecode from "jwt-decode";

const useAuth = ({ initialState = { isAuth: false } }) => {
  const [value, setValue] = useLocalStorageState("auth", initialState);

  const [auth, setAuth] = React.useState(() => value || initialState);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const login = async (data) => {
    setError(null);
    setIsLoading(true);
    setIsError(false);
    await axios({
      url: "/api/login",
      method: "POST",
      data,
    })
      .then((res) => {
        console.log("res=====", res);
        const token = res.data && res.data.token;
        if (token) {
          const payload = jwtdecode(res.data.token, { header: false });
          const auth = { ...payload, isAuth: true, token: res.data.token };
          setAuth(auth);
          setValue(auth);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        const resData = err.response && err.response.data;
        console.log(resData);
        setIsError(true);
        setError(resData);
        setIsLoading(false);
      });
  };

  const logout = () => {
    // TODO request
    setAuth(initialState);
    setValue(initialState);
  };

  return { auth, isLoading, isError, error, login, logout };
};

export const [AuthProvider, useAuthContainer] = constate(useAuth);
