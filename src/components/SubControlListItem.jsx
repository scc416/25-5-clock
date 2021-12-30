import {
  BREAK_DECREASE,
  BREAK_INCREASE,
  SESSION_DECREASE,
  SESSION_INCREASE,
} from "../constants";

const SubControlListItem = ({ name, setting, length, session }) => {
  return (
    <div className="sub-controls">
      <span>{name}</span>
      <div className="container">
        <span>{length}</span>
        <div className="container column arrows">
          <div
            className="clickable"
            onClick={() =>
              setting(session ? SESSION_INCREASE : BREAK_INCREASE, session)
            }
          >
            <i className="fas fa-arrow-circle-up"></i>
          </div>
          <div
            className="arrow-background clickable"
            onClick={() =>
              setting(session ? SESSION_DECREASE : BREAK_DECREASE, session)
            }
          >
            <i className="fas fa-arrow-circle-down"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubControlListItem;
