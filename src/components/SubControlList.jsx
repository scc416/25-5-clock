import {
  BREAK_DECREASE,
  BREAK_INCREASE,
  SESSION_DECREASE,
  SESSION_INCREASE,
} from "../constants";

import SubControlListItem from "./SubControlListItem";

const SubControlList = ({ sessionLength, breakLength, setting }) => {
  return (
    <div className="container">
      <SubControlListItem
        {...{
          setting,
          name: "Session Length",
          length: sessionLength,
          session: true,
        }}
      />
      <div className="sub-controls">
        <span>Break Length</span>
        <div className="container">
          <span>{breakLength}</span>
          <div className="container column arrows">
            <div
              className="clickable"
              onClick={() => setting(BREAK_INCREASE, false)}
            >
              <i className="fas fa-arrow-circle-up"></i>
            </div>
            <div id="clickable" onClick={() => setting(BREAK_DECREASE, false)}>
              <i className="fas fa-arrow-circle-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubControlList;
