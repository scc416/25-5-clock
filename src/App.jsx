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
    isBeeping,
    stopBeep,
    togglePaused,
    reset,
    setting,
    timeLeft: { minute, second, millisecond },
  } = useData();
  return (
    <>
      <div>{session}</div>
      <div className="container">
        <div>{minute}</div>:<div>{second}</div>:<div>{millisecond}</div>
      </div>
      <div className="container column main-controls">
        <div className="container main-controls">
          <div id="start_stop" className="clickable" onClick={togglePaused}>
            {buttonText}
          </div>
          <div id="reset" className="clickable" onClick={reset}>
            Reset
          </div>
        </div>

        {isBeeping && (
          <div className="clickable stop-beeping" onClick={stopBeep}>
            Stop Beeping
          </div>
        )}
      </div>
      <div className="container">
        <div className="sub-controls">
          <div className="length-text">
            Session Length
          </div>
          <div className="container">
            <div className="number">
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
              <div
                id="break-increment"
                onClick={() => setting(BREAK_INCREASE, false)}
              >
                <i className="fas fa-arrow-circle-up"></i>
              </div>
              <div
                id="break-decrement"
                onClick={() => setting(BREAK_DECREASE, false)}
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
    </>
  );
};

export default App;
