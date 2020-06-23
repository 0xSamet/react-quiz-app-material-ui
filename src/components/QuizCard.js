import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const QuizCard = ({ id, author, description, createdAt }) => {
  const classes = useStyles();
  let history = useHistory();

  const buttonClickHandler = () => {
    history.push(`/test/${id}`);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {author.charAt(0)}
          </Avatar>
        }
        title={author}
        subheader={createdAt.split(",")[0]}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" onClick={buttonClickHandler}>
          Testi Çöz
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuizCard;
