import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const AnswerListItem = ({ answer, ...rest }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" {...rest}>
      <Typography variant="h5">{answer}</Typography>
    </Paper>
  );
};

export default AnswerListItem;
