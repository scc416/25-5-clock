import TimeDisplay from "./TimeDisplay";

const MainControl = ({
  session,
  timeLeft,
  togglePaused,
  buttonText,
  reset,
  isBeeping,
  stopBeep
}) => {
  return (
    <>
      <div>{session}</div>
      <TimeDisplay {...{timeLeft}} />
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
    </>
  );
};

export default MainControl;
