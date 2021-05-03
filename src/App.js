import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { useMemo } from "react";
import { useEffect } from "react";
import LoginPage from "./components/loginpage";
import BrowserPage from "./components/browser";
import CalendarPage from "./components/calendar";
import MusicPage from "./components/music";
import NotepadPage from "./components/notepad";
import SettingsPage from "./components/settings";
import TimerPage from "./components/timer";
import MainMenu from "./components/mainMenu";

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "#121212",
    height: "5px",
  },
  tabsWrapper: {
    background: "#3eb489",
  },
}));

const useTabContainerStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    tabcontainerInActive: {
      display: "none",
    },
  })
);

function TabContainer(props) {
  const styles = useTabContainerStyles({});
  return (
    <Typography
      style={{ flex: "1" }}
      id={props.id.toString()}
      component="div"
      className={
        (styles.root,
        {
          [styles.tabcontainerInActive]: !props.active,
        })
      }
    >
      {props.children}
    </Typography>
  );
}

function logout(props) {
  props.data2ToMenu(false);
  localStorage.clear();
}

export default function SimpleTabs() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isLoggedIn, setisLoggedIn] = React.useState(
    localStorage.getItem("jwt") == null ? false : true
  );

  function handleChange(event, newSelectedTab) {
    setSelectedTab(newSelectedTab);
  }

  // useEffect(() => {
  //   localStorage.clear();
  // });

  let loggedInPage = (
    <div class="wrapper">
      <AppBar position="static" color="inherit">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          className={classes.tabsWrapper}
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab label="Browser" />
          <Tab label="Calendar" />
          <Tab label="Music" />
          <Tab label="Notepad" />
          <Tab label="Timer" />
          <Tab label="Settings" />
          <Tab label="Logout" />
        </Tabs>
      </AppBar>

      <TabContainer id={0} active={selectedTab === 0}>
        <BrowserPage />
      </TabContainer>
      <TabContainer id={1} active={selectedTab === 1}>
        <CalendarPage />
      </TabContainer>
      <TabContainer id={2} active={selectedTab === 2}>
        <MusicPage />
      </TabContainer>
      <TabContainer id={3} active={selectedTab === 3}>
        <NotepadPage />
      </TabContainer>
      <TabContainer id={4} active={selectedTab === 4}>
        <TimerPage />
      </TabContainer>
      <TabContainer id={5} active={selectedTab === 5}>
        <SettingsPage />
      </TabContainer>
      <TabContainer id={6} active={selectedTab === 6} onClick={() => logout(this.props)}>
        <MainMenu dataToMenu={isLoggedIn} data2ToMenu={setisLoggedIn} />
      </TabContainer>
    </div>
  );

  return (
    <div class="wrapper">
      {isLoggedIn ? (
        loggedInPage
      ) : (
        <LoginPage dataToLogin={isLoggedIn} data2ToLogin={setisLoggedIn} />
      )}
    </div>
  );
}
