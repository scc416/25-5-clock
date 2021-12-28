import useData from "./hooks/useData";

const App = () => {
  const { session, second } = useData();
  return (
    <div className="container column">
      <div id="timer-label">{session}</div>
      <div id="time-left" className="timer">
        {second}
      </div>
      <div className="container main-controls">
        <div
          id="start_stop"
          onClick={
            () => console.log("stop")
            // this.props.togglePaused(this.props.paused, Date.now() / 1000)
          }
        >
          Start/Stop
        </div>
        <div
          id="reset"
          onClick={
            () => console.log("RESET")
            // this.props.reset()
          }
        >
          Reset
        </div>
      </div>
      <div className="container">
        <div className="sub-controls">
          <div id="session-label" className="length-text">
            Session Length
          </div>
          <div className="container">
            <div className="number" id="session-length">
              {/* {this.props.sLength} */}25
            </div>
            <div className="container column arrows">
              <div
                id="session-increment"
                onClick={
                  () => console.log("INCREMENT")
                  // this.props.setting(this.props.paused, true, true)
                }
              >
                <i className="fas fa-arrow-circle-up"></i>
              </div>
              <div
                id="session-decrement"
                className="arrow-background"
                onClick={
                  () => console.log("INCREMENT")
                  // this.props.setting(this.props.paused, true, false)
                }
              >
                <i className="fas fa-arrow-circle-down"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="sub-controls">
          <div id="break-label" className="length-text">
            Break Length
          </div>
          <div className="container">
            <div id="break-length" className="number">
              5 {/* {this.props.bLength} */}
            </div>
            <div className="container column arrows">
              <div
                id="break-increment"
                onClick={
                  () => console.log("INCREMENT")
                  // this.props.setting(this.props.paused, false, true)
                }
              >
                <i className="fas fa-arrow-circle-up"></i>
              </div>
              <div
                id="break-decrement"
                onClick={
                  () => console.log("INCREMENT")
                  // this.props.setting(this.props.paused, false, false)
                }
              >
                <i className="fas fa-arrow-circle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-two/household_alarm_clock_beep_tone.mp3"
      />
    </div>
  );
};

export default App;
