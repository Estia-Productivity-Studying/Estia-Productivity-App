import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LoginPage from './components/loginpage';
import LandingPage from './components/landingpage';
import BrowserPage from './components/browser';
import CalendarPage from './components/calendar';
import MusicPage from './components/music';
import NotepadPage from './components/notepad';
import SettingsPage from './components/settings';
import TimerPage from './components/timer';



const Main = () => (
  <Router>
    <Route exact path='/' component={LoginPage}/>
    <Route exact path='/landingpage' component={LandingPage}/>
    <Route exact path='/browser' component={BrowserPage}/>
    <Route exact path='/calendar' component={CalendarPage}/>
    <Route exact path='/music' component={MusicPage}/>
    <Route exact path='/notepad' component={NotepadPage}/>
    <Route exact path='/settings' component={SettingsPage}/>
    <Route exact path='/timer' component={TimerPage}/>
  </Router>
)

export default Main;