import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import { changeMenuIndex, changeTitle } from "../store/menu";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const props = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  useEffect(() => {
    dispatch(changeMenuIndex(3));
    dispatch(changeTitle("Homepage"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item xs={12}>
        <animated.div style={{ ...props, textAlign: "center" }}>
          You can take a quiz or you can log-in to create yours
        </animated.div>
      </Grid>
    </Grid>
  );
};

export default HomePage;
