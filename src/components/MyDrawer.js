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
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
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
              onClick={() => handleListItemClick("/profil")}
              selected={menuIndex === 0}
            >
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={"Profilim"} />
            </ListItem>
            <ListItem button onClick={() => dispatch(logout())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Çıkış Yap"} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              onClick={() => handleListItemClick("/girisyap")}
              selected={menuIndex === 1}
            >
              <ListItemIcon>
                <EmojiPeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"Giriş Yap"} />
            </ListItem>
            <ListItem
              button
              onClick={() => handleListItemClick("/kayitol")}
              selected={menuIndex === 2}
            >
              <ListItemIcon>
                <AccessibilityNewIcon />
              </ListItemIcon>
              <ListItemText primary={"Kayıt Ol"} />
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
          <ListItemText primary={"Anasayfa"} />
        </ListItem>
        <ListItem
          button
          onClick={() => handleListItemClick("/testler")}
          selected={menuIndex === 4}
        >
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText primary={"Test Bul"} />
        </ListItem>
        {isAuthenticated ? (
          <ListItem
            button
            onClick={() => handleListItemClick("/testler/olustur")}
            selected={menuIndex === 5}
          >
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Test Oluştur"} />
          </ListItem>
        ) : null}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            {darkMode ? <MoodIcon /> : <MoodBadIcon />}
          </ListItemIcon>
          <ListItemText primary={"Karanlık Mod"} />
          <ListItemSecondaryAction>
            <Switch edge="end" onChange={handleDarkMode} checked={darkMode} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
};

export default MyDrawer;
