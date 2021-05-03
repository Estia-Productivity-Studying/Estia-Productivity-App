import React from "react";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import RotateLeftRoundedIcon from "@material-ui/icons/RotateLeftRounded";
import "./css/timer.css";

const studyTimer = localStorage.getItem("studylength");

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: {},
      seconds: studyTimer * 60,
      isOn: false,
      isPaused: false,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.currentTimer = "Study Timer";
  }

  secondsToTime(secs) {
    //Converting seconds to hours, minutes, and seconds
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
    //Run after render
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    this.studyTimerTime =
      localStorage.getItem("studylength") == null
        ? 45
        : localStorage.getItem("studylength");
    this.breakTimerTime =
      localStorage.getItem("breaklength") == null
        ? 15
        : localStorage.getItem("breaklength");
    this.timer = setInterval(this.countDown, 1000);
    this.setState({
      isOn: true,
      isPaused: false,
      time: this.secondsToTime(this.state.seconds), // Added for case when timer is reset and started again to prevent showing undefined for a second
    });
    const element = document.getElementById("outer-circle");
    element.classList.add("animation-bg");
  }

  countDown() {
    // Decrementing one second for re-render
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      //If timer hits 0, switch to the next timer mode and restart timer at given time
      if (this.currentTimer === "Study Timer") {
        alert("Study Time Ended. Starting Break Timer.");
        this.currentTimer = "Break Timer";
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: this.breakTimerTime * 60,
        });
        localStorage.setItem('timer', this.currentTimer);
      } else {
        alert("Break Time Ended. Starting Study Timer.");
        this.currentTimer = "Study Timer";
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: this.studyTimerTime * 60,
        });
        localStorage.setItem('timer', this.currentTimer);
      }
      clearInterval(this.timer);
      this.startTimer();
    }
  }

  pauseTimer() {
    //Pauses timer. Timer can be unpaused with resume button or reset with reset button
    this.setState({ isOn: false, isPaused: true });
    clearInterval(this.timer);
    const element = document.getElementById("outer-circle");
    element.classList.remove("animation-bg");
    localStorage.setItem('timer', 'pause');
  }

  resetTimer() {
    //Resets the timer to its original state.
    this.setState({ time: 0, isOn: false, isPaused: false });
    this.currentTimer = "Study Timer";
    this.setState({
      seconds: this.studyTimerTime * 60,
    });
    clearInterval(this.timer);
  }

  render() {
    let hours =
      this.state.time.h < 10 ? "0" + this.state.time.h : this.state.time.h;
    let minutes =
      this.state.time.m < 10 ? "0" + this.state.time.m : this.state.time.m;
    let seconds =
      this.state.time.s < 10 ? "0" + this.state.time.s : this.state.time.s;
    let timer = this.state.isOn
      ? hours + ":" + minutes + ":" + seconds
      : this.state.isPaused
      ? hours + ":" + minutes + ":" + seconds
      : null;
    let header = this.state.isOn
      ? this.currentTimer + ": "
      : this.state.isPaused
      ? "Timer Paused: "
      : "Start Study Timer?";
    let start = this.state.isOn ? null : this.state.isPaused ? null : (
      <button id="button" onClick={this.startTimer}>
        <PlayArrowRoundedIcon />
      </button>
    );
    let pause = this.state.isOn ? (
      <button id="button" onClick={this.pauseTimer}>
        <PauseIcon />
      </button>
    ) : null;
    let resume = this.state.isPaused ? (
      <button id="button" onClick={this.startTimer}>
        <PlayArrowRoundedIcon />
      </button>
    ) : null;
    let reset = this.state.isPaused ? (
      <button id="button" onClick={this.resetTimer}>
        <RotateLeftRoundedIcon />
      </button>
    ) : null;
    return (
      <div>
        <div id="timer-header">{header}</div>
        <div id="outer-circle">
          <div id="inner-circle">
            <div id="timer"> {timer} </div>
          </div>
        </div>
        <br />
        {start}
        {pause} 
        {resume}
        {reset}
      </div>
    );
  }
}

function TimerPage() {
  return (
    <div id="timer-page">
      <Timer />
    </div>
  );
}

export default TimerPage;
