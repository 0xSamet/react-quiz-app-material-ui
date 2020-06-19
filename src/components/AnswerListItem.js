import React from 'react'
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
    answer: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
      cursor: "pointer"
    }
  }));
  

const AnswerListItem = ({answer}) => {

    const classes = useStyles();

    return (
        <Paper variant="outlined" className={classes.answer} >
            <Typography variant="h5">{answer}</Typography>
        </Paper>
    )
}

export default AnswerListItem
