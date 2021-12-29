import { useReducer, useEffect } from "react";
import {
  TOGGLE_PAUSE,
  UPDATE,
  SETTINGS,
  RESET,
  defaultState,
  BREAK_DECREASE,
  BREAK_INCREASE,
  SESSION_DECREASE,
  SESSION_INCREASE,
} from "../constants";

import { displaySession, formatTime } from "../helpers";

const useData = () => {
  const reducers = {
    [TOGGLE_PAUSE]: (state) => {
      return { ...state, paused: !state.paused };
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
        timeLeft = (session ? breakLength : sessionLength) * 6000;
        session = !session;
      }

      return { ...state, timeLeft, session };
    },
    [SETTINGS]: (state, { change, changeSession }) => {
      let { sessionLength, breakLength, session, timeLeft } = state;

      const settingReducer = {
        [SESSION_INCREASE]: () => {
          if (sessionLength < 60) sessionLength++;
        },
        [SESSION_DECREASE]: () => {
          if (sessionLength > 1) sessionLength--;
        },
        [BREAK_INCREASE]: () => {
          if (breakLength < 60) breakLength++;
        },
        [BREAK_DECREASE]: () => {
          if (breakLength > 1) breakLength--;
        },
      };

      settingReducer[change]();

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

  const togglePaused = () => dispatch({ type: TOGGLE_PAUSE });

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
      const updateTime = setInterval(() => dispatch({ type: UPDATE }), 10);
      return () => clearInterval(updateTime);
    }
  }, [paused]);

  return {
    setting,
    reset,
    togglePaused,
    sessionLength,
    breakLength,
    timeLeft: formatTime(timeLeft),
    session: displaySession(session),
  };
};

export default useData;
