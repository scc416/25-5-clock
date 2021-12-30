import TimeDisplay from "./TimeDisplay";
import Buttons from "./Buttons";

const MainControl = ({
  session,
  timeLeft,
  togglePaused,
  buttonText,
  reset,
  isBeeping,
  stopBeep,
}) => {
  return (
    <>
      <div>{session}</div>
      <TimeDisplay {...{ timeLeft }} />
      <Buttons {...{ togglePaused, buttonText, reset, isBeeping, stopBeep }} />
    </>
  );
};

export default MainControl;
