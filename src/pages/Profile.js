import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuIndex, changeTitle } from "../store/menu";

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
  });
  const [nameError, setNameError] = useState("");
  const [mailError, setMailError] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(changeMenuIndex(0));
    dispatch(changeTitle("My Profile"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log({ currentUser });
    if (currentUser && currentUser.name && currentUser.mail) {
      setUser({ name: currentUser.name, mail: currentUser.mail });
    }
  }, [currentUser]);

  const checkInputs = () => {
    let point = 0;
    if (user.name.length === 0) {
      setNameError("Name is required");
    } else {
      setNameError("");
      point++;
    }
    if (user.mail.length === 0) {
      setMailError("E-mail is required");
    } else {
      setMailError("");
      point++;
    }
    return point === 2 ? true : false;
  };

  const handleInputChange = (e) => {
    setNameError("");
    setMailError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkInputs()) console.log(user);
  };

  return isAuthenticated ? (
    <Grid container justify="center">
      <Grid item s={12} md={8}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom align="center">
            My Profile
          </Typography>
          <TextField
            value={user.name}
            error={nameError !== ""}
            helperText={nameError}
            name="name"
            type="text"
            label="Name"
            variant="outlined"
            fullWidth
            className={classes.formElement}
            onChange={handleInputChange}
            disabled
          />
          <TextField
            value={user.mail}
            error={mailError !== ""}
            helperText={mailError}
            name="mail"
            type="email"
            label="E-Mail"
            variant="outlined"
            fullWidth
            className={classes.formElement}
            onChange={handleInputChange}
            disabled
          />
        </form>
      </Grid>
    </Grid>
  ) : (
    <Redirect to="/login" />
  );
};

export default Profile;
