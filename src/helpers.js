const displayTwoDigit = (digit) => (digit < 10 ? "0" + digit : digit);

const displayTwoDigitFloor = (digit) => {
  const floor = Math.floor(digit);
  const str = displayTwoDigit(floor);
  return str;
};

export const formatTime = (time) => {
  return {
    minute: displayTwoDigitFloor(time / 60000),
    second: displayTwoDigitFloor((time % 60000) / 1000),
    millisecond: displayTwoDigitFloor((time % 1000) / 10),
  };
};

export const displaySession = (session) => (session ? "Session" : "Break");

export const beepFunctionGenerator = () => {

  const getAudio = () => document.getElementById("beep");;
  const playBeep = () => {
    const audio = getAudio();
    if (audio.pause) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const pauseBeep = () => {
    const audio = getAudio();
    audio.pause();
  };

  return { playBeep, pauseBeep };
};
