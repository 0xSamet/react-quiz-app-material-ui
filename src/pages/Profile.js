import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeMenuIndex, changeTitle } from "../store/menu";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

const Profile = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
  });
  const [nameError, setNameError] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    dispatch(changeMenuIndex(0));
    dispatch(changeTitle("Profilim"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkInputs = () => {
    let point = 0;
    if (user.name.length === 0) {
      setNameError("İsim Boş Bırakılamaz");
    } else {
      setNameError("");
      point++;
    }
    if (user.mail.length === 0) {
      setMailError("Mail Boş Bırakılamaz");
    } else {
      setMailError("");
      point++;
    }
    if (user.password.length === 0) {
      setPasswordError("Şifre Boş Bırakılamaz");
    } else {
      setPasswordError("");
      point++;
    }
    return point === 3 ? true : false;
  };

  const handleInputChange = (e) => {
    setNameError("");
    setMailError("");
    setPasswordError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkInputs()) console.log(user);
  };

  return (
    <Grid container justify="center">
      <Grid item s={12} md={8}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom align="center">
            Profilim
          </Typography>
          <TextField
            value={user.name}
            error={nameError !== ""}
            helperText={nameError}
            name="name"
            type="text"
            label="İsim"
            variant="outlined"
            fullWidth
            className={classes.formElement}
            onChange={handleInputChange}
          />
          <TextField
            value={user.mail}
            error={mailError !== ""}
            helperText={mailError}
            name="mail"
            type="email"
            label="Mail"
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
          >
            Güncelle
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Profile;
