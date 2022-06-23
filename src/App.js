import { useState } from "react";
import Adjust from "./Component/Adjust";
import Clock from "./Component/Clock";
function App() {
const [numBreak, setNumBreak] = useState(5);
const [numSession, setNumSession] = useState(25);

  return (
    <div id="pomodoro-clock">
      <h1>Excercises Timer</h1>
      <Adjust numBreak={numBreak} numSession={numSession} />
      <Clock />
    </div>
  );
}

export default App;
