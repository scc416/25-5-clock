import { useReducer, useEffect } from "react";
import {
  START,
  PAUSE,
  UPDATE,
  SETTINGS,
  RESET,
  defaultState,
} from "../constants";

import { displaySession, displayTime } from "../helpers";

const useData = () => {
  const reducers = {
    [START]: (state, { timeNow }) => {
      console.log(timeNow);
      const endTime = timeNow + state.second;
      console.log(endTime);
      return { ...state, paused: false, endTime };
    },
    [PAUSE]: (state, { timeNow }) => {
      const second = state.endTime - timeNow;
      return { ...state, paused: true, second };
    },
    [UPDATE]: (state, { timeNow }) => {
      console.log(timeNow);
      let { second, session, bLength, sLength, endTime, paused } = state;

      const timeLeft = endTime - timeNow;
      if (timeLeft > 0) {
        second = timeLeft;
        if (timeLeft < 1) {
          let audio = document.getElementById("beep");
          if (audio.pause) {
            audio.currentTime = 0;
            audio.play();
          }
        }
      } else {
        let length = 0;
        if (session) {
          length = bLength;
        } else {
          length = sLength;
        }
        second = length * 60;
        session = !session;
        endTime = timeNow + second;
      }

      return { ...state, second, session, endTime };
    },
    [SETTINGS]: (state, action) => {
      let { sLength, bLength, session, second } = state;
      switch (true) {
        case action.session && action.increment:
          if (sLength < 60) {
            sLength++;
          }
          break;
        case action.session && !action.increment:
          if (sLength > 1) {
            sLength--;
          }
          break;
        case !action.session && action.increment:
          if (bLength < 60) {
            bLength++;
          }
          break;
        case !action.session && !action.increment:
          if (bLength > 1) {
            bLength--;
          }
          break;
        default:
          break;
      }
      if (action.session === session) {
        if (session) {
          second = sLength * 60;
        } else {
          second = bLength * 60;
        }
      }
      return { ...state, sLength, bLength, session, second };
    },
    [RESET]: () => {
      let audio = document.getElementById("beep");
      audio.pause();
      audio.currentTime = 0;
      return defaultState;
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const { session, second, sLength, bLength, paused } = state;

  const togglePaused = () => {
    const timeNow = Date.now() / 1000;
    if (paused) {
      dispatch({ type: START, timeNow });
    } else {
      dispatch({ type: PAUSE, timeNow });
    }
  };

  useEffect(() => {
    if (!paused) {
      const updateTime = setInterval(() => {
        dispatch({ type: UPDATE, timeNow: Date.now() / 1000 });
      }, 20);
      return () => clearInterval(updateTime);
    }
  }, [paused]);

  const reset = () => dispatch({ type: RESET });

  return {
    reset,
    togglePaused,
    sLength,
    bLength,
    second: displayTime(second),
    session: displaySession(session),
  };
};

export default useData;
