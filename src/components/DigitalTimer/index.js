// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerValueInMin: 25,
    isTimerRunning: false,
    timeElapsedInSec: 0,
    isDisable: false,
  }

  getTimeString = () => {
    const {timerValueInMin, timeElapsedInSec} = this.state
    const remainingTime = timerValueInMin * 60 - timeElapsedInSec
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  incrementTimeElapse = () => {
    const {timerValueInMin, timeElapsedInSec} = this.state
    const isTimerComplete = timeElapsedInSec === timerValueInMin * 60

    if (isTimerComplete) {
      clearInterval(this.timerId)
      this.onReset()
    } else {
      this.setState(prevState => ({
        timeElapsedInSec: prevState.timeElapsedInSec + 1,
      }))
    }
  }

  onStartPause = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(this.incrementTimeElapse, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
      isDisable: true,
    }))
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      timerValueInMin: 25,
      isTimerRunning: false,
      timeElapsedInSec: 0,
      isDisable: false,
    })
  }

  onClickDecrement = () => {
    const {isDisable} = this.state
    if (!isDisable) {
      this.setState(prevState => ({
        timerValueInMin: prevState.timerValueInMin - 1,
      }))
    }
  }

  onClickIncrement = () => {
    const {isDisable} = this.state
    if (!isDisable) {
      this.setState(prevState => ({
        timerValueInMin: prevState.timerValueInMin + 1,
      }))
    }
  }

  renderTimeControls() {
    const {isTimerRunning, timerValueInMin} = this.state
    const imgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-control-container">
        <div className="timer-control-details-container">
          <div className="control-container">
            <button
              type="button"
              className="button"
              onClick={this.onStartPause}
            >
              <img src={imgUrl} alt={altText} className="control-img" />
              <p className="control-text">
                {isTimerRunning ? 'Pause' : 'Start'}
              </p>
            </button>
          </div>
          <div className="control-container">
            <button type="button" className="button" onClick={this.onReset}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                className="control-img"
              />
              <p className="control-text">Reset</p>
            </button>
          </div>
        </div>
        <p className="timer-limit-text">Set Timer limit</p>
        <div className="set-timer-container">
          <button
            type="button"
            className="inc-dec-button"
            onClick={this.onClickDecrement}
          >
            -
          </button>
          <p className="set-timer-value">{timerValueInMin}</p>
          <button
            type="button"
            className="inc-dec-button"
            onClick={this.onClickIncrement}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimerRunning} = this.state
    return (
      <div className="timer-app-container">
        <h1 className="timer-title">Digital Timer</h1>
        <div className="sub-timer-app-container">
          <div className="timer-container">
            <div className="current-timer-container">
              <h1 className="current-timer-value">{this.getTimeString()}</h1>
              <p className="timer-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          {this.renderTimeControls()}
        </div>
      </div>
    )
  }
}

export default DigitalTimer
