import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome//free-solid-svg-icons";

const Adjust = ({
  numBreak,
  numSession,
  breakHandler,
  sessionHandler
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
            className="adjust-button"
            onClick={breakHandler}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <p id="break-length">{numBreak}</p>
          <button
            id="break-increment"
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
            className="adjust-button"
            onClick={sessionHandler}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <p id="session-length">{numSession}</p>
          <button
            id="session-increment"
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
