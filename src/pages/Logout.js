import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthContainer } from "../containers/Auth";

const Logout = () => {
  const { logout } = useAuthContainer();

  React.useEffect(() => {
    logout();
  }, []);

  return <Redirect to="/login" />;
};

export default Logout;
