const displayTwoDigit = (digit) => digit < 10 ? "0" + digit : digit;

const displayTwoDigitFloor = (digit) => {
  const floor = Math.floor(digit);
  const str = displayTwoDigit(floor);
  return str;
};

export const formatTime = (time) => {
  return {
    minute: displayTwoDigitFloor(time / 6000),
    second: displayTwoDigitFloor((time % 6000) / 100),
    millisecond: displayTwoDigit(time % 100),
  };
};

export const displaySession = (session) => (session ? "Session" : "Break");
