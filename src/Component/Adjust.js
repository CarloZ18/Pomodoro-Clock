import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Adjust = ({
 breakLength,
  sessionLength,
  breakHandler,
  sessionHandler,
  faArrowDown,
  faArrowUp,
}) => {
  return (
    <div id="adjust">
      <div className="container-adjust">
        <p id="break-label" className="title-adjust">
          Break Length
        </p>
        <div className="controls-adjust">
          <button
            id="break-decrement"
            value="-"
            className="adjust-button"
            onClick={breakHandler}
          >
            <FontAwesomeIcon icon={faArrowDown}  />
          </button>
          <p id="break-length">{breakLength}</p>
          <button
            id="break-increment"
            value="+"
            className="adjust-button"
            onClick={breakHandler}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>

      <div className="container-adjust">
        <p id="session-label" className="title-adjust">
          Session Length
        </p>
        <div className="controls-adjust">
          <button
            id="session-decrement"
            value="-"
            className="adjust-button"
            onClick={sessionHandler}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <p id="session-length">{sessionLength}</p>
          <button
            id="session-increment"
            value="+"
            className="adjust-button"
            onClick={sessionHandler}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adjust;
