import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeMenuIndex, changeTitle } from "../store/menu";
//import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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

/*
ÖRNEK POST REQUEST
{
    "author": "sAMET a",
    "description": "test bu kardeşim" ,
    "questions": [{
        "description": "soru 1",
        "answerIndex": 1
    }]
}*/

const HomePage = () => {
  //const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(changeMenuIndex(5));
    dispatch(changeTitle("Soru Oluştur"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuthenticated ? (
    <Grid container>
      <Grid item xs={12}>
        <p>Soru Oluştur</p>
      </Grid>
    </Grid>
  ) : (
    <Redirect to="/girisyap" />
  );
};

export default HomePage;
