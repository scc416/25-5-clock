import {
  BREAK_DECREASE,
  BREAK_INCREASE,
  SESSION_DECREASE,
  SESSION_INCREASE,
} from "../constants";

const SubControlList = ({ sessionLength, breakLength, setting }) => {
  return (
    <div className="container">
      <div className="sub-controls">
        <span>Session Length</span>
        <div className="container">
          <span>{sessionLength}</span>
          <div className="container column arrows">
            <div
              className="clickable"
              onClick={() => setting(SESSION_INCREASE, true)}
            >
              <i className="fas fa-arrow-circle-up"></i>
            </div>
            <div
              className="arrow-background clickable"
              onClick={() => setting(SESSION_DECREASE, true)}
            >
              <i className="fas fa-arrow-circle-down"></i>
            </div>
          </div>
        </div>
      </div>
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
