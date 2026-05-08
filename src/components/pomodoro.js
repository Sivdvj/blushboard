import { useState, useEffect } from "react";
import Animation from "../assets/animations";
import { Icon } from "@iconify/react";

function Pomodoro({ goto }) {
  let [running, setRunning] = useState(false);
  let [settings, showSettings] = useState(false);
  let [minutes, setMinutes] = useState(25);
  let [time, setTime] = useState(minutes * 60);

  useEffect(() => {
    if (!running) return;
    let interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    setTime(minutes * 60);
  }, [minutes]);
  let formatTime = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="absolute z-0 inset-0 bg-pink-200 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Animation count={4} duration={10} />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-screen gap-10">
        <button
          className="shadow-md absolute z-10 left-10 top-10 font-bold bg-pink-100 text-pink-500 p-4 rounded-full hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
          onClick={() => goto("home")}
        >
          <Icon icon="ph:flower-fill" className="w-10 h-10" />
        </button>
        <h2 className="absolute z-10 top-10 text-6xl font-extrabold text-pink-500 ">
          Pomodoro
        </h2>

        <div className="drop-shadow-lg font-extrabold text-pink-200 text-[80px] sm:text-[100px] md:text-[160px] lg:text-[250px]">
          {formatTime()}
        </div>
        <div className="flex gap-6 items-center justify-center">
          <button
            className="font-bold bg-pink-100/70 text-pink-500 backdrop-blur-md shadow-md p-4 rounded-full hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
            onClick={() => showSettings(!settings)}
          >
            <Icon icon="mingcute:settings-6-fill" className="w-10 h-10" />
          </button>
          <button
            className="font-bold bg-pink-100/70 text-pink-500 backdrop-blur-md shadow-md p-4 rounded-full hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
            onClick={() => setRunning(!running)}
          >
            <Icon
              icon={!running ? "mingcute:play-fill" : "mingcute:pause-fill"}
              className="w-16 h-16"
            />
          </button>
          <button
            className="font-bold bg-pink-100/70 text-pink-500 backdrop-blur-md shadow-md p-4 rounded-full hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
            onClick={() => {
              setTime(minutes * 60);
              setRunning(false);
            }}
          >
            <Icon icon="ic:round-replay" className="w-10 h-10" />
          </button>
        </div>
        {settings && (
          <div>
            <h1>Set Timer</h1>
            <input
              type="number"
              placeholder="Set Time"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Pomodoro;
