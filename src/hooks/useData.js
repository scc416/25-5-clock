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
  STOP_BEEP,
} from "../constants";

import { displaySession, formatTime, beepFunctionGenerator } from "../helpers";
const { playBeep, pauseBeep } = beepFunctionGenerator();

const useData = () => {
  const reducers = {
    [TOGGLE_PAUSE]: (state) => {
      let { timeLeft, endTime, paused } = state;

      if (paused) endTime = Date.now() + timeLeft;
      if (!paused) timeLeft = endTime - Date.now();

      return { ...state, timeLeft, endTime, paused: !state.paused };
    },
    [STOP_BEEP]: (state) => {
      pauseBeep();
      return { ...state, isBeeping: false };
    },
    [UPDATE]: (state) => {
      let {
        timeLeft,
        session,
        breakLength,
        sessionLength,
        isBeeping,
        endTime,
      } = state;

      timeLeft = endTime - Date.now();

      if (timeLeft <= 0) {
        playBeep();
        isBeeping = true;
        timeLeft = (session ? breakLength : sessionLength) * 60000;
        endTime = Date.now() + timeLeft;
        session = !session;
      }

      return { ...state, timeLeft, session, isBeeping, endTime };
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
        timeLeft = (session ? sessionLength : breakLength) * 60 * 1000;
      }
      return { ...state, sessionLength, breakLength, timeLeft };
    },
    [RESET]: () => {
      return defaultState;
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const {
    session,
    timeLeft,
    sessionLength,
    breakLength,
    paused,
    isBeeping,
    endTime,
  } = state;

  const stopBeep = () => dispatch({ type: STOP_BEEP });

  const togglePaused = () => {
    dispatch({ type: TOGGLE_PAUSE });
    stopIfBeeping();
  };

  const stopIfBeeping = () => {
    if (isBeeping) dispatch({ type: STOP_BEEP });
  };

  const reset = () => {
    dispatch({ type: RESET });
    stopIfBeeping();
  };

  const setting = (change, changeSession) => {
    if (paused) dispatch({ type: SETTINGS, change, changeSession });
  };

  useEffect(() => {
    if (!paused) {
      const updateTime = setInterval(() => dispatch({ type: UPDATE }), 10);
      return () => clearInterval(updateTime);
    }
  }, [paused]);

  useEffect(() => {
    if(isBeeping) {
      const stopBeep = setTimeout(() => dispatch({ type: STOP_BEEP }), 7300);
      return () => clearInterval(stopBeep);
    }
  }, [isBeeping]);

  return {
    setting,
    reset,
    togglePaused,
    stopBeep,
    isBeeping,
    sessionLength,
    breakLength,
    timeLeft: formatTime(timeLeft),
    session: displaySession(session),
    buttonText: paused ? "Start" : "Stop",
  };
};

export default useData;
