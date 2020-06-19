import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeMenuIndex, changeTitle } from "../store/menu";
//import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

/*const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));*/

const HomePage = () => {
  //const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeMenuIndex(3));
    dispatch(changeTitle("Anasayfa"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <p>HomePage</p>
      </Grid>
    </Grid>
  );
};

export default HomePage;
