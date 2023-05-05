import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toggleMobileDrawer } from "../store/menu";
import { changeTheme } from "../store/theme";
import { logout } from "../store/auth";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MoodIcon from "@material-ui/icons/Mood";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import FaceIcon from "@material-ui/icons/Face";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: theme.common,
      minHeight: "100vh",
    },
    title: {
      flexGrow: 1,
    },
  };
});

const MyDrawer = () => {
  const menuIndex = useSelector((state) => state.menu.index);
  const darkMode = useSelector((state) => state.darkTheme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const handleDarkMode = () => {
    dispatch(changeTheme());
  };

  const handleListItemClick = (path) => {
    if (window.innerWidth < 600) dispatch(toggleMobileDrawer());
    history.push(path);
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {isAuthenticated ? (
          <>
            <ListItem
              button
              onClick={() => handleListItemClick("/profile")}
              selected={menuIndex === 0}
            >
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem button onClick={() => dispatch(logout())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              onClick={() => handleListItemClick("/login")}
              selected={menuIndex === 1}
            >
              <ListItemIcon>
                <EmojiPeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"Log In"} />
            </ListItem>
            <ListItem
              button
              onClick={() => handleListItemClick("/register")}
              selected={menuIndex === 2}
            >
              <ListItemIcon>
                <AccessibilityNewIcon />
              </ListItemIcon>
              <ListItemText primary={"Register"} />
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => handleListItemClick("/")}
          selected={menuIndex === 3}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Homepage"} />
        </ListItem>
        <ListItem
          button
          onClick={() => handleListItemClick("/quizzes")}
          selected={menuIndex === 4}
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={"Find a quiz"} />
        </ListItem>
        {isAuthenticated ? (
          <ListItem
            button
            onClick={() => handleListItemClick("/quizzes/create")}
            selected={menuIndex === 5}
          >
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Create a quiz"} />
          </ListItem>
        ) : null}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            {darkMode ? <MoodIcon /> : <MoodBadIcon />}
          </ListItemIcon>
          <ListItemText primary={"Dark Mode"} />
          <ListItemSecondaryAction>
            <Switch edge="end" onChange={handleDarkMode} checked={darkMode} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
};

export default MyDrawer;
