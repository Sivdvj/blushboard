import { useState, useEffect } from "react";
function Pomodoro({ goto }) {
  let [time, setTime] = useState(25 * 60);
  let [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    let interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  let formatTime = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <h2>Pomodoro</h2>
      <button onClick={() => goto("home")}>Back</button>

      <p>{formatTime()}</p>
      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Pause</button>
      <button onClick={() => setTime(25 * 60)}>Reset</button>
    </div>
  );
}

export default Pomodoro;
