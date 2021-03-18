import React from "react";
import { Switch, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function handleClick(event) {
  console.info("You clicked a breadcrumb.");
}

const studyTimerTime = 1; //Get from database
const breakTimerTime = 0.5; //Get from database

class Timer extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: studyTimerTime * 60 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.currentTimer = "Study Timer";
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      if (this.currentTimer === "Study Timer") {
        this.currentTimer = "Break Timer";
        this.seconds = breakTimerTime * 60;
      } else {
        this.currentTimer = "Study Timer";
        this.seconds = studyTimerTime * 60;
      }
      clearInterval(this.timer);
      this.startTimer();
    }
  }

  render() {
    return (
      <div>
        <h1>
          {this.currentTimer}: {this.state.time.h}:{this.state.time.m}:
          {this.state.time.s}
        </h1>
        <br />
        <button onClick={this.startTimer}>Start</button>
      </div>
    );
  }
}

function TimerPage() {
  return (
    <div>
      <Typography variant="h6" component="h6">
        Timer:
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Main Menu
        </Link>
        <Link color="inherit" href="/timer" onClick={handleClick}>
          Timer
        </Link>
        <Link color="inherit" href="/browser" onClick={handleClick}>
          Browser
        </Link>
        <Link color="inherit" href="/notepad" onClick={handleClick}>
          Notepad
        </Link>
        <Link color="inherit" href="/calendar" onClick={handleClick}>
          Calendar
        </Link>
        <Link color="inherit" href="/music" onClick={handleClick}>
          Music
        </Link>
        <Link color="inherit" href="/settings" onClick={handleClick}>
          Settings
        </Link>
      </Breadcrumbs>
      <Timer />
    </div>
  );
}

export default TimerPage;
