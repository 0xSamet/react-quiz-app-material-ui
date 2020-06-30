import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { changeMenuIndex, changeTitle } from "../store/menu";
import { login, loginFailure } from "../store/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  formElement: {
    marginTop: 10,
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    mail: "",
    password: "",
  });
  const [eMailError, setEMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const requestErrorMessage = useSelector((state) => state.auth.loginError);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isFetching = useSelector((state) => state.auth.isFetching);

  useEffect(() => {
    dispatch(changeMenuIndex(1));
    dispatch(changeTitle("Giriş Yap"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkInputs = () => {
    let point = 0;
    if (user.mail.length === 0) {
      setEMailError("Email Boş Bırakılamaz");
    } else {
      setEMailError("");
      point++;
    }
    if (user.password.length < 6) {
      setPasswordError("Şifre En Az 6 Karakter İçermeli !");
    } else {
      setPasswordError("");
      point++;
    }
    return point === 2 ? true : false;
  };

  const handleInputChange = (e) => {
    setEMailError("");
    setPasswordError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkInputs()) {
      dispatch(login(user));
    }
  };

  return isAuthenticated ? (
    <Redirect to="/profil" />
  ) : (
    <>
      <Grid container justify="center">
        <Grid item s={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom align="center">
              Giriş Yap
            </Typography>
            <TextField
              autoFocus
              value={user.email}
              error={eMailError !== ""}
              helperText={eMailError}
              name="mail"
              type="email"
              label="E-Mail"
              variant="outlined"
              fullWidth
              className={classes.formElement}
              onChange={handleInputChange}
            />
            <TextField
              value={user.password}
              error={passwordError !== ""}
              helperText={passwordError}
              name="password"
              type="password"
              label="Şifre"
              variant="outlined"
              fullWidth
              className={classes.formElement}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.formElement}
              fullWidth
              disabled={isFetching}
            >
              Giriş Yap
            </Button>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={requestErrorMessage !== ""}
        onClose={() => dispatch(loginFailure(""))}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">
          {requestErrorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
