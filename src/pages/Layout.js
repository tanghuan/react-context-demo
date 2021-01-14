import React from "react";
import { Switch, Route, Link as RouteLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { makeStyles } from "@material-ui/core/styles";

import { useAuthContainer } from "../containers/Auth";

import logo from "../logo.svg";
import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
  logo: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout = () => {
  const classes = useStyles();
  const { auth } = useAuthContainer();

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Link component={RouteLink} to="/" className={classes.logo}>
            <Avatar src={logo}></Avatar>
          </Link>
          <Typography variant="h5" component="h2" className={classes.title}>
            MUI
          </Typography>
          <Typography>{auth.username}</Typography>
          <Link component={RouteLink} to="/logout">
            <IconButton>
              <ExitToAppIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Switch>
        <Route path="/user">
          <h1>User</h1>
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Layout;
