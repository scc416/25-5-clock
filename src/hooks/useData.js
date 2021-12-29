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
    [START]: (state) => {
      return { ...state, paused: false };
    },
    [PAUSE]: (state) => {
      return { ...state, paused: true };
    },
    [UPDATE]: (state) => {
      let { timeLeft, session, breakLength, sessionLength } = state;

      timeLeft--;
      if (timeLeft <= 0) {
        const audio = document.getElementById("beep");
        if (audio.pause) {
          audio.currentTime = 0;
          audio.play();
        }

        let length;
        if (session) {
          length = breakLength;
        } else {
          length = sessionLength;
        }
        timeLeft = length * 6000;
        session = !session;
      }

      return { ...state, timeLeft, session };
    },
    [SETTINGS]: (state, { change, changeSession }) => {
      let { sessionLength, breakLength, session, timeLeft } = state;
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
        if (session) timeLeft = sessionLength * 60 * 100;
        if (!session) timeLeft = breakLength * 60 * 100;
      }
      return { ...state, sessionLength, breakLength, timeLeft };
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

  const { session, timeLeft, sessionLength, breakLength, paused } = state;

  const togglePaused = () => {
    dispatch({ type: paused ? START : PAUSE, timeNow });
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
        dispatch({ type: UPDATE, timeNow: Date.now() / 10 });
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
    timeLeft: displayTime(timeLeft),
    session: displaySession(session),
  };
};

export default useData;
