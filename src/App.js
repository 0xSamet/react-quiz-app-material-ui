import React, { useMemo, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Switch as RouterSwitch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quizzes from "./pages/Quizzes";
import NotFound from "./pages/NotFound";
import QuizPage from "./pages/QuizPage";
import Profile from "./pages/Profile";
import MyDrawer from "./components/MyDrawer";
import { toggleMobileDrawer } from "./store/menu";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    wrapper: {
      flexGrow: 1,
      backgroundColor: theme.common,
      minHeight: "100vh",
    },
    content: {
      flexGrow: 1,
      minHeight: "100vh",
      padding: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  };
});

const App = () => {
  const classes = useStyles();
  let location = useLocation();
  let history = useHistory();
  const darkMode = useSelector((state) => state.darkTheme);
  const menuTitle = useSelector((state) => state.menu.title);
  const mobileDrawer = useSelector((state) => state.menu.mobileDrawer);
  const registerİsFetching = useSelector((state) => state.register.isFetching);
  const loginİsFetching = useSelector((state) => state.auth.isFetching);

  const dispatch = useDispatch();

  const lightTheme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#1976d2",
      },
    },
  });

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#90caf9",
      },
    },
  });

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [
    darkMode,
    lightTheme,
    darkTheme,
  ]);

  const handleDrawerToggle = () => {
    dispatch(toggleMobileDrawer());
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/girisyap":
        history.push("/girisyap");
        break;
      case "/kayitol":
        history.push("/kayitol");
        break;
      case "/":
        history.push("/");
        break;
      case "/testbul":
        history.push("/testbul");
        break;
      default:
        return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menüyü Aç"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              {menuTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileDrawer}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {<MyDrawer />}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {<MyDrawer />}
            </Drawer>
          </Hidden>
        </nav>
        <Paper elevation={0} square className={classes.wrapper}>
          <div className={classes.toolbar} />
          {registerİsFetching || loginİsFetching ? <LinearProgress /> : null}
          <div className={classes.content}>
            <RouterSwitch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/profil" component={Profile} />
              <Route exact path="/girisyap" component={Login} />
              <Route exact path="/kayitol" component={Register} />
              <Route exact path="/testbul" component={Quizzes} />
              <Route exact path="/test/:testId" component={QuizPage} />
              <Route path="*" component={NotFound} />
            </RouterSwitch>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default App;
