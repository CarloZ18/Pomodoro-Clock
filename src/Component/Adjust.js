import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome//free-solid-svg-icons";

const Adjust = ({
  numBreak,
  numSession,
  increaseBreak,
  decreaseBreak,
  increaseSession,
  decreaseSession,
}) => {
  return (
    <div id="adjust">
      <div className="container-adjust">
        <p id="break-label" className="title-adjust">
          Break Length
        </p>
        <div className="controls-adjust">
          <button id="break-decrement" className="adjust-button">
            <FontAwesomeIcon icon={faArrowDown} onClick={decreaseBreak} />
          </button>
          <p id="break-length">{numBreak}</p>
          <button id="break-increment" className="adjust-button">
            <FontAwesomeIcon icon={faArrowUp} onClick={increaseBreak} />
          </button>
        </div>
      </div>

      <div className="container-adjust">
        <p id="session-label" className="title-adjust">
          Session Length
        </p>
        <div className="controls-adjust">
          <button id="session-decrement" className="adjust-button">
            <FontAwesomeIcon icon={faArrowDown} onClick={decreaseSession} />
          </button>
          <p id="session-length">{numSession}</p>
          <button id="session-increment" className="adjust-button">
            <FontAwesomeIcon icon={faArrowUp} onClick={increaseSession} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adjust;
