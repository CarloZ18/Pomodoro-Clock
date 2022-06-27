import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome//free-solid-svg-icons";

const Controls = ({ startStop,reset, playPause, changeIcon }) => {
  return (
    <div id="controls-functions">
      <button id="start_stop">
        <FontAwesomeIcon
          ref={playPause}
          icon={changeIcon}
          onClick={startStop}
        />
      </button>
      <button id="reset">
        <FontAwesomeIcon icon={faRefresh} onClick={reset} />
      </button>
    </div>
  );
};
export default Controls;
