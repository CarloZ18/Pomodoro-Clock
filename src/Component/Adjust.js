import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown,faArrowUp } from '@fortawesome//free-solid-svg-icons'

const Adjust = ({ numBreak, numSession }) => {
  return (
    <div id="adjust">
      <div className="container-adjust">
              <p className='title-adjust'>Break Length</p>
        <div className="controls-adjust">
        <button className="adjust-button"><FontAwesomeIcon icon={faArrowDown}/></button>
        <p>{numBreak}</p>
        <button className="adjust-button"><FontAwesomeIcon icon={faArrowUp}/></button>
        </div>
      </div>

      <div className="container-adjust">
        <p className='title-adjust'>Session Length</p>
        <div className="controls-adjust">
           <button className="adjust-button"><FontAwesomeIcon icon={faArrowDown}/></button>
        <p>{numSession}</p>
        <button className="adjust-button"><FontAwesomeIcon icon={faArrowUp}/></button>  
        </div>
      </div>
    </div>
  );
};

export default Adjust;
