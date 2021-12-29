const displayTwoDigit = (digit) => (digit < 10 ? `0${digit}` : `${digit}`);

export const formatTime = (time) => {
  return {
    minute: displayTwoDigit(Math.floor(time / 6000)),
    second: displayTwoDigit(Math.floor((time % 6000) / 100)),
    millisecond: displayTwoDigit(time % 100),
  };
};

export const displaySession = (session) => (session ? "Session" : "Break");
