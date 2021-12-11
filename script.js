// Redux:
const START = "START";
const PAUSE = "PAUSE";
const UPDATE = "UPDATE";
const SETTINGS = "SETTINGS";
const RESET = "RESET";

const actionStart = timeNow => ({ type: START, timeNow: timeNow });
const actionPause = timeNow => ({ type: PAUSE, timeNow: timeNow });
const actionUpdate = timeNow => ({ type: UPDATE, timeNow: timeNow });
const actionReset = { type: RESET };
const actionSetting = (session, increment) => ({
  type: SETTINGS,
  session: session,
  increment: increment });


const defaultState = {
  sLength: 25,
  bLength: 5,
  session: true,
  second: 25 * 60,
  paused: true,
  endTime: 0 };


const reducer = (state = defaultState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case START:
      newState.paused = false;
      newState.endTime = action.timeNow + newState.second;
      return newState;
      break;
    case PAUSE:
      newState.paused = true;
      newState.second = newState.endTime - action.timeNow;
      return newState;
      break;
    case UPDATE:
      if (!newState.paused) {
        const timeLeft = newState.endTime - action.timeNow;
        if (timeLeft > 0) {
          newState.second = timeLeft;
          if (timeLeft < 1) {
            let audio = document.getElementById("beep");
            if (audio.pause) {
              audio.currentTime = 0;
              audio.play();
            }
          }
        } else {
          let length = 0;
          if (newState.session) {
            length = newState.bLength;
          } else {
            length = newState.sLength;
          }
          newState.second = length * 60;
          newState.session = !newState.session;
          newState.endTime = action.timeNow + newState.second;
        }
      }
      return newState;
      break;
    case RESET:
      let audio = document.getElementById("beep");
      audio.pause();
      audio.currentTime = 0;
      return defaultState;
      break;
    case SETTINGS:
      switch (true) {
        case action.session && action.increment:
          if (newState.sLength < 60) {
            newState.sLength++;
          }
          break;
        case action.session && !action.increment:
          if (newState.sLength > 1) {
            newState.sLength--;
          }
          break;
        case !action.session && action.increment:
          if (newState.bLength < 60) {
            newState.bLength++;
          }
          break;
        case !action.session && !action.increment:
          if (newState.bLength > 1) {
            newState.bLength--;
          }
          break;}

      if (action.session === newState.session) {
        if (newState.session) {
          newState.second = newState.sLength * 60;
        } else {
          newState.second = newState.bLength * 60;
        }
      }
      return newState;
      break;
    default:
      return newState;}

};

const store = Redux.createStore(reducer);

const displaySession = session => {
  if (session) {
    return "Session";
  } else {
    return "Break";
  }
};

const displayTwoDigit = digit => digit < 10 ? `0${digit}` : `${digit}`;

const displayTime = time => {
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  return `${displayTwoDigit(minute)}:${displayTwoDigit(second)}`;
};

// React:
class TopLevel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (!this.props.paused) {
      this.timerID = setTimeout(() => this.props.update(Date.now() / 1000), 1);
    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "container column" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, displaySession(this.props.session)), /*#__PURE__*/
      React.createElement("div", {
        id: "time-left",
        className: "timer" },
      displayTime(this.props.second)), /*#__PURE__*/

      React.createElement("div", { className: "container main-controls" }, /*#__PURE__*/
      React.createElement("div", {
        id: "start_stop",
        onClick: () =>
        this.props.togglePaused(this.props.paused, Date.now() / 1000) }, "Start/Stop"), /*#__PURE__*/




      React.createElement("div", { id: "reset", onClick: () => this.props.reset() }, "Reset")), /*#__PURE__*/



      React.createElement("div", { className: "container" }, /*#__PURE__*/
      React.createElement("div", { className: "sub-controls" }, /*#__PURE__*/
      React.createElement("div", {
        id: "session-label",
        className: "length-text" }, "Session Length"), /*#__PURE__*/
      React.createElement("div", {
        className: "container" }, /*#__PURE__*/
      React.createElement("div", {
        className: "number",
        id: "session-length" }, this.props.sLength), /*#__PURE__*/
      React.createElement("div", {
        className: "container column arrows" }, /*#__PURE__*/
      React.createElement("div", {
        id: "session-increment",
        onClick: () => this.props.setting(this.props.paused, true, true) }, /*#__PURE__*/

      React.createElement("i", { class: "fas fa-arrow-circle-up" })), /*#__PURE__*/

      React.createElement("div", {
        id: "session-decrement",
        className: "arrow-background",
        onClick: () => this.props.setting(this.props.paused, true, false) }, /*#__PURE__*/

      React.createElement("i", { class: "fas fa-arrow-circle-down" }))))), /*#__PURE__*/




      React.createElement("div", { className: "sub-controls" }, /*#__PURE__*/
      React.createElement("div", {
        id: "break-label",
        className: "length-text" }, "Break Length"), /*#__PURE__*/
      React.createElement("div", {
        className: "container" }, /*#__PURE__*/
      React.createElement("div", {
        id: "break-length",
        className: "number" }, this.props.bLength), /*#__PURE__*/
      React.createElement("div", {
        className: "container column arrows" }, /*#__PURE__*/
      React.createElement("div", {
        id: "break-increment",
        onClick: () => this.props.setting(this.props.paused, false, true) }, /*#__PURE__*/

      React.createElement("i", { class: "fas fa-arrow-circle-up" })), /*#__PURE__*/

      React.createElement("div", {
        id: "break-decrement",
        onClick: () =>
        this.props.setting(this.props.paused, false, false) }, /*#__PURE__*/


      React.createElement("i", { class: "fas fa-arrow-circle-down" })))))), /*#__PURE__*/





      React.createElement("audio", {
        id: "beep",
        src: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-two/household_alarm_clock_beep_tone.mp3" })));



  }}


// React-Redux
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = state => {
  return {
    sLength: state.sLength,
    bLength: state.bLength,
    second: state.second,
    paused: state.paused,
    session: state.session };

};

const mapDispatchToProps = dispatch => {
  return {
    togglePaused: (paused, timeNow) => {
      if (paused) {
        dispatch(actionStart(timeNow));
      } else {
        dispatch(actionPause(timeNow));
      }
    },
    update: timeNow => dispatch(actionUpdate(timeNow)),
    reset: () => dispatch(actionReset),
    setting: (paused, session, increment) => {
      if (paused) {
        dispatch(actionSetting(session, increment));
      }
    } };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(TopLevel);

class AppWrapper extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement(Container, null)));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById("app"));