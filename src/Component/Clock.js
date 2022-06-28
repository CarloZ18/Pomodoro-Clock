const Clock = ({ count, nameTimer }) => {
  console.log(count);
  return (
    <div id="clock">
      <div
        id="timer-label"
        className="info"
        style={count < "01:00" ? { color: "red" } : { color: "white" }}
      >
        {nameTimer}
      </div>
      <div
        id="time-left"
        className="info"
        style={count < "01:00" ? { color: "red" } : { color: "white" }}
      >
        {count}
      </div>
    </div>
  );
};

export default Clock;
