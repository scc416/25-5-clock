export const START = "START";
export const PAUSE = "PAUSE";
export const UPDATE = "UPDATE";
export const SETTINGS = "SETTINGS";
export const RESET = "RESET";

export const defaultState = {
  sLength: 25,
  bLength: 5,
  session: true,
  second: 25 * 60,
  paused: true,
  endTime: 0,
};