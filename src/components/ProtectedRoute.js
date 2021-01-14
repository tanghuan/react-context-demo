import { Route, Redirect } from "react-router-dom";
import { useAuthContainer } from "../containers/Auth";

const ProtectedRoute = ({ children, ...rest }) => {
  const { auth } = useAuthContainer();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth && auth.isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
