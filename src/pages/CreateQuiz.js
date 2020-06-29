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

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Pagination from "@material-ui/lab/Pagination";

import produce from "immer";

import Joi from "@hapi/joi";

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
  pageButtonWrapper: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

const quizSchema = Joi.object({
  description: Joi.string().trim().required(),
  questions: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().trim().required(),
        answers: Joi.array()
          .items(
            Joi.object({
              index: Joi.number().required(),
              description: Joi.string().trim().required(),
            })
          )
          .unique("index"),
        answerIndex: Joi.number().required(),
      })
    )
    .required(),
});

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
    questions: [questionDefault],
  };

  const statusDefault = {
    isQuizNameSubmitted: false,
    step: 0,
    choiceNumber: 0,
    page: 0,
  };

  const [quiz, setQuiz] = useState(quizDefault);
  //const [question, setQuestion] = useState(questionDefault);
  const [status, setStatus] = useState(statusDefault);

  const handleQuizDescriptionInput = (e) => {
    setQuiz({
      ...quiz,
      description: e.target.value,
    });
  };

  const handleAnswerInput = (index, value) => {
    setQuiz(
      produce(quiz, (draft) => {
        draft.questions[status.page].answers[index].description = value;
        draft.questions[status.page].descriptionErrorMessage = "";
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
    setQuiz(
      produce(quiz, (draft) => {
        draft.questions[status.page].answers.push({
          index: draft.questions[status.page].answers.slice(-1)[0].index + 1,
          description: "",
          errorMessage: "",
        });
      })
    );
  };

  const deleteChoice = (index) => {
    setQuiz(
      produce(quiz, (draft) => {
        const indexOfChoice = draft.questions[status.page].answers.findIndex(
          (answer) => {
            return answer.index === index;
          }
        );
        draft.questions[status.page].answers.splice(indexOfChoice, 1);
        if (quiz.questions[status.page].answerIndex === index) {
          draft.questions[status.page].answerIndex =
            draft.questions[status.page].answerIndex - 1;
        }
      })
    );
  };

  const addQuestion = () => {
    if (checkFields()) {
      setQuiz(
        produce(quiz, (draft) => {
          draft.questions.push(questionDefault);
        })
      );
      setStatus(
        produce(status, (draft) => {
          draft.page = quiz.questions.length;
        })
      );
    }
  };

  const checkFields = () => {
    let changeQuestionStateTo = { ...quiz };
    let point = 0;

    if (changeQuestionStateTo.questions[status.page].description === "") {
      changeQuestionStateTo = produce(changeQuestionStateTo, (draft) => {
        draft.questions[status.page].descriptionErrorMessage =
          "Soruyu Doldurunuz !";
      });
    } else {
      changeQuestionStateTo = produce(changeQuestionStateTo, (draft) => {
        draft.questions[status.page].descriptionErrorMessage = "";
      });

      point++;
    }

    if (
      changeQuestionStateTo.questions[status.page].descriptionErrorMessage ===
      ""
    ) {
      for (
        let i = 0;
        i < changeQuestionStateTo.questions[status.page].answers.length;
        i++
      ) {
        if (
          changeQuestionStateTo.questions[status.page].answers[i]
            .description === ""
        ) {
          changeQuestionStateTo = produce(changeQuestionStateTo, (draft) => {
            draft.questions[status.page].answers[i].errorMessage =
              "Doldurunuz !";
          });
        } else {
          changeQuestionStateTo = produce(changeQuestionStateTo, (draft) => {
            draft.questions[status.page].answers[i].errorMessage = "";
          });
          point++;
        }
      }
    }

    setQuiz(changeQuestionStateTo);

    return setTimeout(() => {
      return point ===
        changeQuestionStateTo.questions[status.page].answers.length + 1
        ? true
        : false;
    }, 2000);
  };

  const submitQuiz = () => {
    const result = quizSchema.validate(quiz);
    console.log(result);
  };

  const deleteQuestion = (index) => {
    index === 0
      ? setStatus({ ...status, page: 0 })
      : setStatus({ ...status, page: index - 1 });

    setQuiz(
      produce(quiz, (draft) => {
        draft.questions.splice(index, 1);
      })
    );
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
              value={quiz.description}
              onChange={handleQuizDescriptionInput}
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
              {quiz.description === ""
                ? "Test Açıklamasını Giriniz"
                : "İlerleyelim ->"}
            </Button>
          </Paper>
        ) : null}

        {status.step === 1 ? (
          <Paper elevation={0} className={classes.questionWrapper}>
            <Grid item xs={12} className={classes.pageButtonWrapper}>
              <Pagination
                count={quiz.questions.length === 0 ? 1 : quiz.questions.length}
                page={status.page + 1}
                onChange={(e, pageToGo) => {
                  setStatus(
                    produce(status, (draft) => {
                      draft.page = pageToGo - 1;
                    })
                  );
                }}
              />
            </Grid>
            <div className={classes.question}>
              <TextField
                error={
                  quiz.questions[status.page].descriptionErrorMessage !== ""
                }
                helperText={quiz.questions[status.page].descriptionErrorMessage}
                label="Soru"
                variant="filled"
                fullWidth
                value={quiz.questions[status.page].description}
                onChange={(e) =>
                  setQuiz(
                    produce(quiz, (draft) => {
                      draft.questions[status.page].description = e.target.value;
                      draft.questions[status.page].descriptionErrorMessage = "";
                      draft.questions[status.page].answers.forEach(
                        (answer) => (answer.errorMessage = "")
                      );
                    })
                  )
                }
                multiline
              />
            </div>
            <Grid item xs={12} className={classes.choiceWrapper}>
              {quiz.questions[status.page].answers.map((answer, index) => (
                <div className={classes.choice} key={index}>
                  <Radio
                    checked={
                      answer.index === quiz.questions[status.page].answerIndex
                    }
                    onChange={() =>
                      setQuiz(
                        produce(quiz, (draft) => {
                          draft.questions[status.page].answerIndex =
                            answer.index;
                        })
                      )
                    }
                  />
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={answer.index === 0}
                            aria-label="toggle password visibility"
                            onClick={() => deleteChoice(answer.index)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => deleteQuestion(status.page)}
                  className={classes.button}
                  disabled={quiz.questions.length < 2}
                >
                  Soruyu Sil
                </Button>

                <Button
                  disabled={!quiz.questions.length > 0}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={submitQuiz}
                  className={classes.button}
                >
                  Testi Bitir
                </Button>
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
