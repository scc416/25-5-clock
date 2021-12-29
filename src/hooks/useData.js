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

import { displaySession, formatTime, beepFunctionGenerator } from "../helpers";
const { playBeep, pauseBeep } = beepFunctionGenerator();

const useData = () => {
  const reducers = {
    [TOGGLE_PAUSE]: (state) => {
      pauseBeep();
      return { ...state, paused: !state.paused };
    },
    [UPDATE]: (state) => {
      let { timeLeft, session, breakLength, sessionLength } = state;

      timeLeft--;
      if (timeLeft <= 0) {
        playBeep();
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
        timeLeft = (session ? sessionLength : breakLength) * 60 * 100;
      }
      return { ...state, sessionLength, breakLength, timeLeft };
    },
    [RESET]: () => {
      pauseBeep();
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
    if (paused) dispatch({ type: SETTINGS, change, changeSession });
  };

  useEffect(() => {
    if (!paused) {
      const updateTime = setInterval(() => dispatch({ type: UPDATE }), 10);
      return () => clearInterval(updateTime);
    }
  }, [paused]);

  const buttonText = paused ? "Start" : "Stop";

  return {
    setting,
    reset,
    togglePaused,
    sessionLength,
    breakLength,
    timeLeft: formatTime(timeLeft),
    session: displaySession(session),
    buttonText,
  };
};

export default useData;
