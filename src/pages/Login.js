import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";

import LockIcon from "@material-ui/icons/Lock";

import { makeStyles } from "@material-ui/core/styles";

import * as yup from "yup";
import { useFormik } from "formik";

import { useAuthContainer } from "../containers/Auth";
import { Grid } from "@material-ui/core";

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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = () => {
  const classes = useStyles();
  const queryParams = useQuery();
  const history = useHistory();
  const { loading, error, login } = useAuthContainer();
  const formik = useFormik({
    initialValues: {
      username: queryParams.get("username") || "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await login(values);
      history.push("/");
    },
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(error);

  return (
    <Container maxWidth="xs">
      <Snackbar
        open={!!isSnackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert severity="error">{error && error.message}</Alert>
      </Snackbar>
      <Dialog
        open={loading}
        aria-labelledby="progress-dialog"
        TransitionComponent={Fade}
      >
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <div className={classes.box}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5" component="h2" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                fullWidth
                className={classes.btn}
                disabled={formik.isSubmitting}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="default"
                type="reset"
                size="large"
                fullWidth
                className={classes.btn}
                disabled={formik.isSubmitting}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
