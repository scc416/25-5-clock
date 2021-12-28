import { useReducer } from "react";
import { START, PAUSE, UPDATE, SETTINGS, RESET } from "../constants";

const useData = () => {
  const reducers = {
    [START]: (state, action) => {
      return { ...state, paused: false };
    },
    [PAUSE]: (state, action) => {
      return { ...state };
    },
    [UPDATE]: (state, action) => {
      return { ...state };
    },
    [SETTINGS]: (state, action) => {
      return { ...state };
    },
    [RESET]: (state, action) => {
      return { ...state };
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };
  
  const [state, dispatch] = useReducer(reducer, {
    sLength: 25,
    bLength: 5,
    session: true,
    second: 25 * 60,
    paused: true,
    endTime: 0,
  });
};

export default useData;
