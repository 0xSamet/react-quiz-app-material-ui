import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeMenuIndex, changeTitle } from "../store/menu";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import QuizCard from "../components/QuizCard";
import { useSelector } from "react-redux";

import { fetchQuizzes } from "../store/quiz";

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
}));

const Quizzes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filterQuery, setFilterQuery] = useState("");

  const quizzes = useSelector((state) => state.quizzes.quizzes);

  useEffect(() => {
    dispatch(changeMenuIndex(4));
    dispatch(changeTitle("Testler"));
    dispatch(fetchQuizzes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchQuizzes(filterQuery));
  }, [dispatch, filterQuery]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} className={classes.root}>
          <TextField
            value={filterQuery}
            onChange={handleFilterChange}
            label="Filtrele"
            variant="outlined"
            fullWidth
            className={classes.formElement}
          />
        </Paper>
      </Grid>
      {quizzes.length > 0
        ? quizzes.map((quiz) => {
            return (
              <Grid item xs={12} md={6} key={quiz._id}>
                <QuizCard
                  id={quiz._id}
                  author={quiz.author.name}
                  description={quiz.description}
                  createdAt={quiz.createdAt}
                />
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default Quizzes;
