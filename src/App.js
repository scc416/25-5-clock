import useData from "./hooks/useData";
import {
  BREAK_DECREASE,
  BREAK_INCREASE,
  SESSION_DECREASE,
  SESSION_INCREASE,
} from "./constants";

const App = () => {
  const {
    session,
    sessionLength,
    breakLength,
    buttonText,
    togglePaused,
    reset,
    setting,
    timeLeft: { minute, second, millisecond },
  } = useData();
  return (
    <div className="container column">
      <div id="timer-label">{session}</div>
      <div id="time-left" className="timer">
        <div>{minute}</div>:<div>{second}</div>:<div>{millisecond}</div>
      </div>
      <div className="container main-controls">
        <div id="start_stop" onClick={togglePaused}>
          {buttonText}
        </div>
        <div id="reset" onClick={reset}>
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
              {sessionLength}
            </div>
            <div className="container column arrows">
              <div
                id="session-increment"
                onClick={() => setting(SESSION_INCREASE, true)}
              >
                <i className="fas fa-arrow-circle-up"></i>
              </div>
              <div
                id="session-decrement"
                className="arrow-background"
                onClick={() => setting(SESSION_DECREASE, true)}
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
              {breakLength}
            </div>
            <div className="container column arrows">
              <div id="break-increment" onClick={() => setting(BREAK_INCREASE)}>
                <i className="fas fa-arrow-circle-up"></i>
              </div>
              <div id="break-decrement" onClick={() => setting(BREAK_DECREASE)}>
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
