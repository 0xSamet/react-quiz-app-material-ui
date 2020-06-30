import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeMenuIndex, changeTitle } from "../store/menu";
import notFoundGif from "../assets/404.gif";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  notFoundGif: {
    maxWidth: "100%",
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeMenuIndex(-1));
    dispatch(changeTitle("Sanırım Kayboldun"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.wrapper}>
        <img src={notFoundGif} alt="404" className={classes.notFoundGif}></img>
        <Typography variant="h3" gutterBottom>
          <Link to="/">Anasayfaya Git</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
