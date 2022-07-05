const Clock = ({ count, nameTimer }) => {
  return (
    <div id="clock">
      <div
        id="timer-label"
        style={count < "01:00" ? { color: "red" } : { color: "white" }}
      >
        {nameTimer}
      </div>
      <div
        id="time-left"
        style={count < "01:00" ? { color: "red" } : { color: "white" }}
      >
        {count}
      </div>
    </div>
  );
};

export default Clock;
