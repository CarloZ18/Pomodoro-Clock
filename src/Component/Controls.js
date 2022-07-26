import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Controls = ({ faRefresh, startStop, reset, icon }) => {
  return (
    <div id="controls-functions">
      <button id="start_stop" onClick={startStop}>
        <FontAwesomeIcon icon={icon} />
      </button>
      <button id="reset" onClick={reset}>
        <FontAwesomeIcon icon={faRefresh} />
      </button>
    </div>
  );
};

export default Controls;
