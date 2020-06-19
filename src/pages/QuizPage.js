import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
  },
  answer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    cursor: "pointer",
    textAlign: "left",
  },
}));

const QuizPage = () => {
  const classes = useStyles();
  //const theme = useTheme();
  // const [answerHover, setAnswerHover] = useState();

  //const handleAnswerClick = () => console.log("hello");

  /*"              <Paper variant="outlined" className={classes.answer} onClick={handleAnswerClick}>
<Typography variant="h5">{answer}</Typography>
</Paper>"*/

  return (
    <Grid container justify="center">
      <Grid item s={12} md={8}>
        <Box>
          <Paper elevation={0} square className={classes.question}>
            <Typography variant="h5">
              You will get 1 point for each correct answer. Your score and total
              score will always be displayed ?
            </Typography>
          </Paper>
          <Box className={classes.answersWrapper}>
            {["Cevap 1", "Cevap 2", "Cevap 3", "Cevap 4"].map((answer, key) => (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                key={key}
                className={classes.answer}
              >
                {answer}
              </Button>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default QuizPage;
