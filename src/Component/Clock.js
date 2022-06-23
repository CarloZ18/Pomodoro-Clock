const Clock = ({ count }) => {
  return (
    <div id="clock">
        <p id="timer-label">Session </p>
        <p id="time-left">{count}25:00</p>
    </div>
  );
};

export default Clock;
