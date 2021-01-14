import React from "react";
import { useLocalStorageState } from "ahooks";
import constate from "constate";
import axios from "axios";
import jwtdecode from "jwt-decode";

const useAuth = ({ initialState = { isAuth: false } }) => {
  const [value, setValue] = useLocalStorageState("auth", initialState);

  const [auth, setAuth] = React.useState(() => value || initialState);

  const login = async (data) => {
    const res = await axios({
      url: "/api/login",
      method: "POST",
      data,
    });
    console.log("res ===> ", res);

    const payload = jwtdecode(res.data.token, { header: false });
    const auth = { ...payload, isAuth: true, token: res.data.token };
    setAuth(auth);
    setValue(auth);
  };

  const logout = () => {
    // TODO request
    setAuth(initialState);
    setValue(initialState);
  };

  return { auth, login, logout };
};

export const [AuthProvider, useAuthContainer] = constate(useAuth);
