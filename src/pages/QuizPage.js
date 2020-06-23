import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { useParams } from "react-router-dom";
import { useStore, useDispatch } from "react-redux";
import { changeTitle, changeMenuIndex } from "../store/menu";

import AnswerListItem from "../components/AnswerListItem";

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
  questionWrapper: {
    backgroundColor: theme.palette.primary.main,
  },
  answersWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: 16,
  },
  answerSuccess: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    cursor: "pointer",
    backgroundColor: "#357a38",
  },
  answerError: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    cursor: "pointer",
    backgroundColor: "#ab003c",
  },
  answer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    cursor: "pointer",
  },
  question: {
    marginBottom: 16,
    textAlign: "justify",
  },
  progress: {
    marginBottom: 16,
    textAlign: "center",
  },
}));

const QuizPage = () => {
  const classes = useStyles();
  const { testId } = useParams();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState({
    step: 0,
    questions: [],
    isAnswered: false,
    answeredWith: null,
    isDone: false,
    score: 0,
  });

  const store = useStore();

  useEffect(() => {
    dispatch(changeTitle("Test Sayfası"));
    dispatch(changeMenuIndex(-1));
    const currentQuiz = store.getState().quizzes.quizzes.find((quiz) => {
      return quiz._id === testId;
    });
    setQuiz({ ...quiz, ...currentQuiz });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeAnswer = (index) => {
    if (index === quiz.questions[quiz.step].answerIndex) {
      setQuiz({
        ...quiz,
        isAnswered: true,
        answeredWith: index,
        score: quiz.score + 1,
      });
    } else {
      setQuiz({ ...quiz, isAnswered: true, answeredWith: index });
    }
  };

  const nextQuestion = () => {
    if (quiz.step < quiz.questions.length - 1) {
      setQuiz({ ...quiz, step: quiz.step + 1, isAnswered: false });
    } else {
      setQuiz({ ...quiz, isDone: true });
      return;
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} s={12} md={8}>
        {quiz.isDone ? (
          <Box>
            <Paper elevation={0} square className={classes.progress}>
              <Typography variant="h5">
                Skorunuz: {quiz.score} / {quiz.questions.length}
              </Typography>
            </Paper>
          </Box>
        ) : null}
        {quiz.questions.length && !quiz.isDone > 0 ? (
          <Box>
            <Paper elevation={0} square className={classes.progress}>
              <Typography variant="h5">
                {quiz.step + 1} / {quiz.questions.length}
              </Typography>
            </Paper>
            <Paper elevation={0} square className={classes.question}>
              <Typography variant="h5">
                {quiz.questions[quiz.step].description}
              </Typography>
            </Paper>
            <Divider />
            <Box className={classes.answersWrapper}>
              {quiz.questions[quiz.step].answers.map((answer, key) => (
                <AnswerListItem
                  answer={answer.description}
                  className={
                    quiz.isAnswered
                      ? answer.index === quiz.questions[quiz.step].answerIndex
                        ? classes.answerSuccess
                        : quiz.answeredWith ===
                          quiz.questions[quiz.step].answerIndex
                        ? classes.answer
                        : classes.answerError
                      : classes.answer
                  }
                  onClick={() =>
                    !quiz.isAnswered ? makeAnswer(answer.index) : null
                  }
                  key={key}
                />
              ))}
            </Box>
            {quiz.isAnswered ? (
              <>
                <Divider />
                <Box className={classes.answersWrapper}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={nextQuestion}
                  >
                    {quiz.step === quiz.questions.length - 1
                      ? "Testi Bitir"
                      : "Sonraki Soruya Geç"}
                  </Button>
                </Box>
              </>
            ) : null}
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default QuizPage;
