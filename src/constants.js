export const START = "START";
export const PAUSE = "PAUSE";
export const UPDATE = "UPDATE";
export const SETTINGS = "SETTINGS";
export const RESET = "RESET";

export const defaultState = {
  sessionLength: 25,
  breakLength: 5,
  session: true,
  second: 25 * 60,
  paused: true,
  endTime: 0,
};