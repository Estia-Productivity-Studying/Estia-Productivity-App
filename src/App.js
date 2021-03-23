import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { useMemo } from 'react';

import LoginPage from './components/loginpage';
import LandingPage from './components/landingpage';
import BrowserPage from './components/browser';
import CalendarPage from './components/calendar';
import MusicPage from './components/music';
import NotepadPage from './components/notepad';
import SettingsPage from './components/settings';
import TimerPage from './components/timer';

const useStyles = makeStyles({
  root: {
  },
});

const useTabContainerStyles = makeStyles((theme) =>  createStyles({
  root: {
    padding: 8 * 3
  },
  tabcontainerInActive: {
    display: "none"
  }
})
);

function TabContainer(props) {
  const styles = useTabContainerStyles({});
  console.log("In TabContainer");
  return (
    <Typography
      id={props.id.toString()}
      component="div"
      className={(styles.root, {
        [styles.tabcontainerInActive]: !props.active
      })}
    >
      {props.children}
    </Typography>
  );
}

export default function SimpleTabs() {
  const classes = useStyles({});
  const [selectedTab, setSelectedTab] = React.useState(0);

  function handleChange(event, newValue) {
    setSelectedTab(newValue);
}

return (
  <div className={classes.root}>
    <AppBar position="static" color="inherit">
      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Logout" />
        <Tab label="Landing" />
        <Tab label="Browser" />
        <Tab label="Calendar" />
        <Tab label="Music" />
        <Tab label="Notepad" />
        <Tab label="Timer" />
        <Tab label="Settings" />
      </Tabs>
    </AppBar>

    <TabContainer id={0} active={selectedTab === 0}>
      <LoginPage/>
    </TabContainer>
    <TabContainer id={0} active={selectedTab === 0}>
      <LandingPage/>
    </TabContainer>
    <TabContainer id={1} active={selectedTab === 1}>
      <BrowserPage/>
    </TabContainer>
    <TabContainer id={2} active={selectedTab === 2}>
      <CalendarPage/>
    </TabContainer>
    <TabContainer id={3} active={selectedTab === 3}>
      <MusicPage/>
    </TabContainer>
    <TabContainer id={3} active={selectedTab === 3}>
      <NotepadPage/>
    </TabContainer>
    <TabContainer id={4} active={selectedTab === 4}>
      <TimerPage/>
    </TabContainer>
    <TabContainer id={5} active={selectedTab === 5}>
      <SettingsPage/>
    </TabContainer>
  </div>
);
}