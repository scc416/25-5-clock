const displayTwoDigitFloor = (digit) => {
  const floor = Math.floor(digit);
  const str = floor < 10 ? "0" + floor : floor;
  return str;
};

export const formatTime = (time) => {
  return {
    minute: displayTwoDigitFloor(time / 6000),
    second: displayTwoDigitFloor((time % 6000) / 100),
    millisecond: displayTwoDigitFloor(time % 100),
  };
};

export const displaySession = (session) => (session ? "Session" : "Break");
