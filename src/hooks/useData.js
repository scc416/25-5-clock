import { useReducer, useEffect } from "react";
import {
  START,
  PAUSE,
  UPDATE,
  SETTINGS,
  RESET,
  defaultState,
  BREAK_DECREASE,
  BREAK_INCREASE,
  SESSION_DECREASE,
  SESSION_INCREASE,
} from "../constants";

import { displaySession, displayTime } from "../helpers";

const useData = () => {
  const reducers = {
    [START]: (state, { timeNow }) => {
      const endTime = timeNow + state.second;
      return { ...state, paused: false, endTime };
    },
    [PAUSE]: (state, { timeNow }) => {
      const second = state.endTime - timeNow;
      return { ...state, paused: true, second };
    },
    [UPDATE]: (state, { timeNow }) => {
      let { second, session, breakLength, sessionLength, endTime } = state;

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
          length = breakLength;
        } else {
          length = sessionLength;
        }
        second = length * 60;
        session = !session;
        endTime = timeNow + second;
      }

      return { ...state, second, session, endTime };
    },
    [SETTINGS]: (state, { change, changeSession }) => {
      let { sessionLength, breakLength, session, second } = state;
      switch (change) {
        case SESSION_INCREASE:
          if (sessionLength < 60) sessionLength++;
          break;
        case SESSION_DECREASE:
          if (sessionLength > 1) sessionLength--;
          break;
        case BREAK_INCREASE:
          if (breakLength < 60) breakLength++;
          break;
        case BREAK_DECREASE:
          if (breakLength > 1) breakLength--;
          break;
      }
      if (changeSession === session) {
        if (session) second = sessionLength * 60;
        if (!session) second = breakLength * 60;
      }
      return { ...state, sessionLength, breakLength, second };
    },
    [RESET]: () => {
      const audio = document.getElementById("beep");
      audio.pause();
      audio.currentTime = 0;
      return defaultState;
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const { session, second, sessionLength, breakLength, paused } = state;

  const togglePaused = () => {
    const timeNow = Date.now() / 1000;
    if (paused) {
      dispatch({ type: START, timeNow });
    } else {
      dispatch({ type: PAUSE, timeNow });
    }
  };

  const reset = () => dispatch({ type: RESET });

  const setting = (change, changeSession) => {
    if (paused) {
      dispatch({
        type: SETTINGS,
        change,
        changeSession,
      });
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

  return {
    setting,
    reset,
    togglePaused,
    sessionLength,
    breakLength,
    second: displayTime(second),
    session: displaySession(session),
  };
};

export default useData;
