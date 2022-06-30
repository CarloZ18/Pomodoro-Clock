import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome//free-solid-svg-icons";

const Controls = ({ startStop, reset, playPause, changeIcon }) => {
  return (
    <div id="controls-functions">
      <button id="start_stop" onClick={startStop}>
        <FontAwesomeIcon ref={playPause} icon={changeIcon} />
      </button>
      <button id="reset" onClick={reset}>
        <FontAwesomeIcon icon={faRefresh} />
      </button>
    </div>
  );
};

export default Controls;
