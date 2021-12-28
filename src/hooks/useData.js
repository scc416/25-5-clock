import { useReducer } from "react";
import {
  START,
  PAUSE,
  UPDATE,
  SETTINGS,
  RESET,
  defaultState,
} from "../constants";

const useData = () => {
  const reducers = {
    [START]: (state, { timeNow }) => {
      const endTime = timeNow + state.second;
      return { ...state, paused: false, endTime };
    },
    [PAUSE]: (state, { timeNow }) => {
      const second = state.entTime - timeNow;
      return { ...state, paused: true, second };
    },
    [UPDATE]: (state, { timeNow }) => {
      let { second, session, bLength, sLength, endTime } = state;
      if (state.paused) {
        const timeLeft = state.endTime - timeNow;
        if (timeLeft > 0) {
          second = timeLeft;
          if (timeLeft < 1) {
            let audio = document.getElementById("beep");
            if (audio.pause) {
              audio.currentTime = 0;
              audio.play();
            }
          }
        }
      }
      if (!state.paused) {
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
};

export default useData;
