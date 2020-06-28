import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeMenuIndex, changeTitle } from "../store/menu";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import notFoundGif from "../assets/404.gif";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
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
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <img
          src={notFoundGif}
          alt="404"
          style={{
            minWidth: "100%",
            maxWidth: "100%",
          }}
        ></img>
        <Typography variant="h3" gutterBottom>
          <Link to="/">Anasayfaya Git</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
