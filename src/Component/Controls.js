import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay,faRefresh } from "@fortawesome//free-solid-svg-icons";

const Controls = () => {
    return (
        <div id="controls-functions">
        <button id="start_stop"><FontAwesomeIcon icon={faPlay}/></button>
        <button id="reset"><FontAwesomeIcon icon={faRefresh}/></button>
        </div>
    );
}
export default Controls;