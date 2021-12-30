const TimeDisplay = ({ timeLeft: { minute, second, millisecond } }) => {
  return (
    <div className="container">
      <div>{minute}</div>:<div>{second}</div>:<div>{millisecond}</div>
    </div>
  );
};

export default TimeDisplay;
