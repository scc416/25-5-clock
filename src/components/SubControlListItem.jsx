const SubControlListItem = () => {
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
  </div>;
};
