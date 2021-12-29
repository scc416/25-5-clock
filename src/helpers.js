const displayTwoDigit = (digit) => (digit < 10 ? `0${digit}` : `${digit}`);

export const displayTime = (time) => {
  const minute = Math.floor(time / 6000);
  const second = Math.floor((time - minute * 6000) / 100);
  const millisecond = time % 60;
  // let second = Math.floor(time % 6000);
  return `${displayTwoDigit(minute)}:${displayTwoDigit(second)}:${displayTwoDigit(millisecond)}`;
};

export const displaySession = (session) => {
  if (session) {
    return "Session";
  } else {
    return "Break";
  }
};