import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import LandingPage from './components/landingpage';
import BrowserPage from './components/browser';
import CalendarPage from './components/calendar';
import MusicPage from './components/music';
import NotepadPage from './components/notepad';
import SettingsPage from './components/settings';
import TimerPage from './components/timer';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Landing Page" {...a11yProps(0)} />
          <Tab label="Browser" {...a11yProps(1)} />
          <Tab label="Calendar" {...a11yProps(2)} />
          <Tab label="Timer" {...a11yProps(3)} />
          <Tab label="Music" {...a11yProps(4)} />
          <Tab label="Settings" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <LandingPage/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BrowserPage/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CalendarPage/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TimerPage/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MusicPage/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <SettingsPage/>
      </TabPanel>
    </div>
  );
}