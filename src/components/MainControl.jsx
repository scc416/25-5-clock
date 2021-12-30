const MainControl = ({
  session,
  timeLeft: { minute, second, millisecond },
  togglePaused,
  buttonText,
  reset,
  isBeeping,
  stopBeep
}) => {
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
    </>
  );
};

export default MainControl;
