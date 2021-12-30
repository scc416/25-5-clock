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
        <div className="container">
          <div className="clickable" onClick={togglePaused}>
            {buttonText}
          </div>
          <div className="clickable" onClick={reset}>
            Reset
          </div>
        </div>

        {isBeeping && (
          <div className="clickable" onClick={stopBeep}>
            Stop Beeping
          </div>
        )}
      </div>
      <div className="container">
        <div className="sub-controls">
          <span>Session Length</span>
          <div className="container">
            <span>{sessionLength}</span>
            <div className="container column arrows">
              <div
                className="clickable"
                onClick={() => setting(SESSION_INCREASE, true)}
              >
                <i className="fas fa-arrow-circle-up"></i>
              </div>
              <div
                className="arrow-background clickable"
                onClick={() => setting(SESSION_DECREASE, true)}
              >
                <i className="fas fa-arrow-circle-down"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="sub-controls">
          <span>Break Length</span>
          <div className="container">
            <span>{breakLength}</span>
            <div className="container column arrows">
              <div
                className="clickable"
                onClick={() => setting(BREAK_INCREASE, false)}
              >
                <i className="fas fa-arrow-circle-up"></i>
              </div>
              <div
                id="clickable"
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
