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

const NotFound = () => {
  //const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeMenuIndex(-1));
    dispatch(changeTitle("Sanırım Kayboldun"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <p>Sayfa Yok</p>
      </Grid>
    </Grid>
  );
};

export default NotFound;
