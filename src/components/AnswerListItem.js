import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const AnswerListItem = ({ answer, ...rest }) => {
  return (
    <Paper variant="outlined" {...rest}>
      <Typography variant="h5">{answer}</Typography>
    </Paper>
  );
};

export default AnswerListItem;
