const displayTwoDigit = (digit) => (digit < 10 ? `0${digit}` : `${digit}`);

export const displayTime = (time) => {
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  return `${displayTwoDigit(minute)}:${displayTwoDigit(second)}`;
};

export const displaySession = (session) => {
  if (session) {
    return "Session";
  } else {
    return "Break";
  }
};