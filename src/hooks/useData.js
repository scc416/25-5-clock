import { useReducer } from "react";

const useData = () => {
  const reducers = {
    // [UPDATE_VALUE]: (state, { value, calculations }) => {
    //   return { value, calculations, enter: false };
    // },
    // [CLEAR]: () => {
    //   return { value: "0", calculations: [], enter: false };
    // },
    // [ENTER]: (state, { calculations, value }) => {
    //   return { value, calculations, enter: true };
    // },
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
    endTime: 0
  });
}

export default useData;