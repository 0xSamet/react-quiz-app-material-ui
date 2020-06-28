import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeMenuIndex, changeTitle } from "../store/menu";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Divider from "@material-ui/core/Divider";

import Radio from "@material-ui/core/Radio";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import produce from "immer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  quizDescriptionWrapper: {
    marginBottom: theme.spacing(2),
  },
  quizDescription: {
    marginBottom: theme.spacing(1),
  },
  questionWrapper: {},
  question: {
    marginBottom: theme.spacing(2),
  },
  choiceWrapper: {},
  choice: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    marginBottom: theme.spacing(1),
  },
}));

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

const CreateQuiz = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const questionDefault = {
    description: "",
    descriptionErrorMessage: "",
    answers: [
      {
        index: 0,
        description: "",
        errorMessage: "",
      },
    ],
    answerIndex: 0,
  };

  const quizDefault = {
    description: "",
    questions: [],
  };

  const statusDefault = {
    isQuizNameSubmitted: false,
    step: 0,
    choiceNumber: 0,
  };

  const [quiz, setQuiz] = useState(quizDefault);
  const [question, setQuestion] = useState(questionDefault);
  const [status, setStatus] = useState(statusDefault);

  const handleInput = (e) => {
    setQuiz({
      ...quiz,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnswerInput = (index, value) => {
    setQuestion(
      produce(question, (draft) => {
        draft.answers[index].description = value;
        draft.descriptionErrorMessage = "";
      })
    );
  };

  const submitQuizDescription = () => {
    setStatus({
      ...status,
      isQuizNameSubmitted: true,
      step: status.step + 1,
    });
  };

  const addChoice = () => {
    setQuestion({
      ...question,
      answers: [
        ...question.answers,
        {
          index: question.answers.slice(-1)[0].index + 1,
          description: "",
          errorMessage: "",
        },
      ],
    });
  };

  const addQuestion = () => {
    if (isValidQuestion()) {
      console.log(question);
      /*setQuiz({
        ...quiz,
        questions: [...quiz.questions, question],
      });
      setQuestion(questionDefault);*/
    }
  };

  const isValidQuestion = () => {
    if (question.description === "") {
      setQuestion({
        ...question,
        descriptionErrorMessage: "Soruyu Boş Bırakmayınız !",
      });
      return false;
    }
    for (let i = 0; i < question.answers.length; i++) {
      if (question.answers[i].description === "") {
        console.log("boş var");
        setQuestion(
          produce(question, (draft) => {
            draft.answers[i].errorMessage = "Doldur";
          })
        );
        return false;
      } else {
        setQuestion(
          produce(question, (draft) => {
            draft.answers[i].errorMessage = "";
          })
        );
        return false;
      }
    }
    //return true;
  };

  const submitQuiz = () => {
    if (isValidQuestion()) {
      console.log(quiz);
    }
  };

  useEffect(() => {
    dispatch(changeMenuIndex(5));
    dispatch(changeTitle("Soru Oluştur"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuthenticated ? (
    <Grid container>
      <Grid item xs={12}>
        {status.step === 0 ? (
          <Paper elevation={0} className={classes.quizDescriptionWrapper}>
            <TextField
              disabled={status.isQuizNameSubmitted}
              name="description"
              value={quiz.description}
              onChange={handleInput}
              label="Testine Bir Açıklama Belirle !"
              variant="outlined"
              fullWidth
              className={classes.quizDescription}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.formElement}
              fullWidth
              disabled={quiz.description === "" || status.isQuizNameSubmitted}
              onClick={submitQuizDescription}
            >
              Test Açıklamasını Girdim
            </Button>
          </Paper>
        ) : null}

        {status.step === 1 ? (
          <Paper elevation={0} className={classes.questionWrapper}>
            <div className={classes.question}>
              <TextField
                error={question.descriptionErrorMessage !== ""}
                helperText={question.descriptionErrorMessage}
                label="Soru"
                variant="filled"
                fullWidth
                value={question.description}
                onChange={(e) =>
                  setQuestion(
                    produce(question, (draft) => {
                      draft.description = e.target.value;
                      draft.descriptionErrorMessage = "";
                      draft.answers.map((answer) => (answer.errorMessage = ""));
                    })
                  )
                }
                multiline
              />
            </div>
            <Grid item xs={12} className={classes.choiceWrapper}>
              {question.answers.map((answer, index) => (
                <div className={classes.choice} key={index}>
                  <Radio
                    checked={answer.index === question.answerIndex}
                    name="radio-button-demo"
                    onChange={() =>
                      setQuestion({
                        ...question,
                        answerIndex: answer.index,
                      })
                    }
                  />
                  <TextField
                    variant="outlined"
                    error={answer.errorMessage !== ""}
                    helperText={answer.errorMessage}
                    value={answer.description}
                    onChange={({ target: { value } }) =>
                      handleAnswerInput(answer.index, value)
                    }
                    multiline
                    fullWidth
                  />
                </div>
              ))}
            </Grid>
            <Divider className={classes.divider} />
            <div className={classes.buttons}>
              <Grid item xs={12} md={8}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={addChoice}
                  className={classes.button}
                >
                  Yeni Şık Ekle
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={addQuestion}
                  className={classes.button}
                >
                  Başka Soru Ekle
                </Button>
                {quiz.questions.length > 0 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={submitQuiz}
                    className={classes.button}
                  >
                    Testi Bitir
                  </Button>
                ) : null}
              </Grid>
            </div>
          </Paper>
        ) : null}
      </Grid>
    </Grid>
  ) : (
    <Redirect to="/girisyap" />
  );
};

export default CreateQuiz;
