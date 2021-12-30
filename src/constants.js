export const TOGGLE_PAUSE = "TOGGLE_PAUSE";
export const UPDATE = "UPDATE";
export const SETTINGS = "SETTINGS";
export const RESET = "RESET";
export const STOP_BEEP = "STOP_BEEP";

export const BREAK_INCREASE = "BREAK_INCREASE";
export const BREAK_DECREASE = "BREAK_DECREASE";
export const SESSION_INCREASE = "SESSION_INCREASE";
export const SESSION_DECREASE = "SESSION_DECREASE";

export const defaultState = {
  sessionLength: 25,
  breakLength: 5,
  session: true,
  timeLeft: 25 * 60 * 1000,
  paused: true,
  isBeeping: false,
  endTime: null,
};
