import './App.css';
import React, { Component } from 'react';
import Timer from './components/Timer'
import PomodoroConfig from './components/PomodoroConfig';
import StartStop from './components/StartStop';

let bgColor;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 0,
      seconds: 1500,
      sessionTime: 25,
      breakTime: 5,
      isBreak: true,
      isPaused: true,
      isStarted: 0,
      timerLabel: 'Work Time'
    }
    this.reset = this.reset.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.timeleftDisplay = this.timeleftDisplay.bind(this);
    this.timer = this.timer.bind(this);
    this.updateHTML = this.updateHTML.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
  }
  componentDidMount() {
    window.setInterval(this.updateHTML, 100);
  }
  reset() {
    clearInterval(this.state.countdown);
    this.setState({
      countdown: 0,
      seconds: 1500,
      sessionTime: 25,
      breakTime: 5,
      isBreak: true,
      isPaused: true,
      isStarted: 0,
      timerLabel: 'Work Time'
    })
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  start() {
    this.setState({
      isPaused: false,
      isStarted: this.state.isStarted + 1
    })
    if (this.state.isPaused && this.state.isStarted === 0) {
      let countdown = setInterval(this.timer, 1000);
      this.setState({
        countdown: countdown
      })
    }
  }
  pause() {
    this.setState({
      isPaused: true,
      isStarted: 0
    })
    if (this.state.isStarted > 0) {
      clearInterval(this.state.countdown);
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    }
  }
  increment(e) {
    const id = e.target.id
    if (this.state.isPaused) {
      if (/break/.test(id)) {
        this.setState({
          breakTime: Math.min(this.state.breakTime + 1, 60)
        })
        if (!this.state.isBreak) {
          this.setState({
            seconds: (Math.min(this.state.breakTime + 1, 60)) * 60
          })
        }
      } else {
        this.setState({
          sessionTime: Math.min(this.state.sessionTime + 1, 60)
        })
        if (this.state.isBreak) {
          this.setState({
            seconds: (Math.min(this.state.sessionTime + 1, 60)) * 60
          })
        }
      }
    }
  }

  decrement(e) {
    const id = e.target.id
    if (this.state.isPaused) {
      if (/break/.test(id)) {
        this.setState({
          breakTime: Math.max(this.state.breakTime - 1, 1)
        })
        if (!this.state.isBreak) {
          this.setState({
            seconds: (Math.max(this.state.breakTime - 1, 1)) * 60
          })
        }
      } else {
        this.setState({
          sessionTime: Math.max(this.state.sessionTime - 1, 1)
        })
        if (this.state.isBreak) {
          this.setState({
            seconds: (Math.max(this.state.sessionTime - 1, 1)) * 60
          })
        }
      }
    }
  }
  timeleftDisplay() {
    let minutes = Math.floor(this.state.seconds / 60); // obtiene los minutos
    let remainderSeconds = this.state.seconds % 60; // el resto da los segundos
    minutes = minutes < 10 ? '0' + minutes : minutes;
    remainderSeconds = remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds;
    return `${minutes}:${remainderSeconds}`
  }
  timer() {
    this.setState({
      seconds: this.state.seconds - 1
    })
    if (this.state.seconds === 0) {
      this.audioBeep.currentTime = 0;
      this.audioBeep.play();
      let int = setInterval(() => {
        if (this.audioBeep.currentTime > 1) {
          this.audioBeep.pause();
          clearInterval(int);
        }
      }, 100)
    }
    if (this.state.seconds < 0) {
      clearInterval(this.state.countdown);
      this.setState({
        seconds: (this.state.isBreak ? this.state.breakTime : this.state.sessionTime) * 60,
        isBreak: !this.state.isBreak
      })

      let countdown = setInterval(this.timer, 1000);
      this.setState({
        countdown: countdown
      })
    }
  }
  updateHTML() {
    if (this.state.isBreak) {
      this.setState({
        timerLabel: 'Work Time'
      })
      bgColor = "rgb(113, 105, 185)";
      const bg = document.querySelectorAll('.bgcolor');
      for (let bgs of bg) {
        bgs.setAttribute('style', `color: ${bgColor}`)
      }
      document.body.style.backgroundColor = bgColor;
      document.body.style.transition = "background-color 1s ease"
    }
    else {
      this.setState({
        timerLabel: 'Break Time'
      })
      bgColor = "rgb(81, 179, 122)";
      const bg = document.querySelectorAll('.bgcolor');
      for (let bgs of bg) {
        bgs.setAttribute('style', `color: ${bgColor}`)
      }
      document.body.style.backgroundColor = bgColor;
      document.body.style.transition = "background-color 1s ease"
    }
  }
  render() {
    return (
      <div id="container">
        <div id="title">
          <i className="fas fa-stopwatch"></i>
               Pomodoro Timer
          </div>
        <div id="pomodoro">
          <PomodoroConfig sessionTime={this.state.sessionTime} breakTime={this.state.breakTime} increment={this.increment} decrement={this.decrement} />
          <Timer timerLabel={this.state.timerLabel} timeleftDisplay={this.timeleftDisplay()} />
          <StartStop reset={this.reset} start={this.start} pause={this.pause} />
        </div>
        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" ref={(audio) => {
          this.audioBeep = audio;
        }}></audio>
      </div>
    );
  }
}
