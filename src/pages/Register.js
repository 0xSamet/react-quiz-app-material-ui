import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";
import { changeMenuIndex, changeTitle } from "../store/menu";
import { register, registerFailure, registerSuccess } from "../store/register";

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

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
  });
  const [nameError, setNameError] = useState("");
  const [eMailError, setEMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const requestErrorMessage = useSelector(
    (state) => state.register.registerError
  );
  const requestSuccessMessage = useSelector(
    (state) => state.register.registerSuccess
  );
  const isFetching = useSelector((state) => state.register.isFetching);

  useEffect(() => {
    dispatch(changeMenuIndex(2));
    dispatch(changeTitle("Kayıt Ol"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setNameError("");
    setEMailError("");
    setPasswordError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkInputs = () => {
    let point = 0;
    if (user.name.length === 0) {
      setNameError("İsim Boş Bırakılamaz");
    } else {
      setNameError("");
      point++;
    }
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
    return point === 3 ? true : false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkInputs()) {
      dispatch(register(user));
    }
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item s={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom align="center">
              Kayıt Ol
            </Typography>
            <TextField
              autoFocus
              type="text"
              error={nameError !== ""}
              helperText={nameError}
              name="name"
              label="Ad Soyad"
              variant="outlined"
              fullWidth
              className={classes.formElement}
              onChange={handleInputChange}
            />
            <TextField
              type="email"
              error={eMailError !== ""}
              helperText={eMailError}
              name="mail"
              label="E-Mail"
              variant="outlined"
              fullWidth
              className={classes.formElement}
              onChange={handleInputChange}
            />
            <TextField
              type="password"
              error={passwordError !== ""}
              helperText={passwordError}
              name="password"
              label="Şifre"
              variant="outlined"
              fullWidth
              className={classes.formElement}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.formElement}
              fullWidth
              type="submit"
              disabled={isFetching}
            >
              Kayıt Ol
            </Button>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={requestErrorMessage !== ""}
        onClose={() => dispatch(registerFailure(""))}
        autoHideDuration={5000}
      >
        <Alert variant="filled" severity="error">
          {requestErrorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={requestSuccessMessage !== ""}
        onClose={() => dispatch(registerSuccess(""))}
        autoHideDuration={1000}
        disableWindowBlurListener
      >
        <Alert variant="filled" severity="success">
          {requestSuccessMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
