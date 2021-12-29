const displayTwoDigit = (digit) => (digit < 10 ? `0${digit}` : `${digit}`);

export const formatTime = (time) => {
  const minute = displayTwoDigit(Math.floor(time / 6000));
  const second = displayTwoDigit(Math.floor((time % 6000) / 100));
  const millisecond = displayTwoDigit(time % 60);
  return { minute, second, millisecond };
};

export const displaySession = (session) => (session ? "Session" : "Break");
