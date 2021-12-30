import Button from "./Button";

const Buttons = ({ togglePaused, buttonText, reset, isBeeping, stopBeep }) => {
  return (
    <div className="container column main-controls">
      <div className="container">
        <Button clickHandler={togglePaused} text={buttonText} />
        <Button clickHandler={reset} text="Reset" />
      </div>
      {isBeeping && <Button clickHandler={stopBeep} text="Stop Beeping" />}
    </div>
  );
};

export default Buttons;
