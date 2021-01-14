import React from "react";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import LockIcon from "@material-ui/icons/Lock";

import { makeStyles } from "@material-ui/core/styles";

import * as yup from "yup";
import { useFormik } from "formik";

import { useAuthContainer } from "../containers/Auth";

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },

  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },

  btn: {
    marginTop: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  username: yup
    .string("Enter your username")
    .min(5, "Username should be of minimum 5 characters length")
    .required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(5, "Password should be of minimum 5 characters length")
    .required("Password is required"),
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { login } = useAuthContainer();
  const formik = useFormik({
    initialValues: {
      username: "tanghuan",
      password: "admin",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      login(values);
      history.push("/");
    },
  });
  return (
    <Container maxWidth="xs">
      <div className={classes.box}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5" component="h2" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            label="username"
            name="username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            label="password"
            name="password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fullWidth
            className={classes.btn}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
