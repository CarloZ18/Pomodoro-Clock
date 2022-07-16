const Clock = ({ count, nameTimer, labelRef, timerRef }) => {
  return (
    <div id="clock">
      <div id="timer-label" ref={labelRef}>
        {nameTimer}
      </div>
      <div id="time-left" ref={timerRef}>
        {count}
      </div>
    </div>
  );
};

export default Clock;
