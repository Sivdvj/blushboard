import { useState, useEffect } from "react";
import Animation from "../assets/animations";
import PomodoroSettings from "../assets/pomodoroSettings";
import { Icon } from "@iconify/react";

function Pomodoro({ goto }) {
  let [running, setRunning] = useState(false);
  let [settings, showSettings] = useState(false);
  let [minutes, setMinutes] = useState(() => {
    return JSON.parse(localStorage.getItem("pomodoro"))?.minutes || 25;
  });
  let [sbreak, setSbreak] = useState(() => {
    return JSON.parse(localStorage.getItem("pomodoro"))?.sbreak || 5;
  });
  let [lbreak, setLbreak] = useState(() => {
    return JSON.parse(localStorage.getItem("pomodoro"))?.lbreak || 15;
  });
  let [laps, setLaps] = useState(() => {
    return JSON.parse(localStorage.getItem("pomodoro"))?.laps || 4;
  });
  let [tlaps, setTotalLaps] = useState(() => {
    return JSON.parse(localStorage.getItem("pomodoro"))?.tlaps || 0;
  });
  let [mode, setMode] = useState(() => {
    return JSON.parse(localStorage.getItem("pomodoro"))?.mode || "focus";
  });
  let [time, setTime] = useState(() => {
    return JSON.parse(localStorage.getItem("pomodoro"))?.time || minutes * 60;
  });
  let [goal, setGoal] = useState(() => {
    return JSON.parse(localStorage.getItem("pomodoro"))?.goal || 8;
  });

  useEffect(() => {
    localStorage.setItem(
      "pomodoro",
      JSON.stringify({
        minutes,
        sbreak,
        lbreak,
        laps,
        tlaps,
        goal,
        mode,
        time,
      }),
    );
  }, [minutes, sbreak, lbreak, laps, tlaps, goal, mode, time]);

  useEffect(() => {
    if (!running) return;
    let interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          let updatedTime;
          if (mode === "focus") {
            let updatedLaps = tlaps + 1;
            if (updatedLaps === goal) {
              setTotalLaps(0);
            } else {
              setTotalLaps(updatedLaps);
            }

            if (updatedLaps % laps === 0) {
              setMode("longBreak");
              updatedTime = lbreak * 60;
            } else {
              setMode("shortBreak");
              updatedTime = sbreak * 60;
            }
          } else {
            setMode("focus");
            updatedTime = minutes * 60;
          }
          return updatedTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, laps, tlaps, mode, goal, minutes, sbreak, lbreak]);

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
        <div className="absolute z-10 top-10 flex flex-col gap-4 items-center">
          <h2 className="text-6xl font-extrabold text-pink-500 ">
            {mode === "focus"
              ? "Pomodoro"
              : mode === "shortBreak"
                ? "Short Break"
                : "Long Break"}
          </h2>
          <div className="flex gap-3">
            {Array.from({ length: goal }).map((_, i) => (
              <div
                key={i}
                className={
                  i < tlaps + 1
                    ? "w-5 h-5 bg-pink-500 rounded-full"
                    : "w-5 h-5 border-2 border-pink-500 rounded-full"
                }
              ></div>
            ))}
          </div>
        </div>
        <div className="drop-shadow-lg font-extrabold text-pink-200 text-[80px] sm:text-[100px] md:text-[160px] lg:text-[250px]">
          {formatTime()}
        </div>
        <div className="flex gap-6 items-center justify-center">
          <button
            className={`font-bold bg-pink-100/70 text-pink-500 backdrop-blur-md shadow-md p-4 rounded-full hover:bg-pink-200 transition duration-300 ease-in-out
            ${running ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
            disabled={running}
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
            className={`font-bold bg-pink-100/70 text-pink-500 backdrop-blur-md shadow-md p-4 rounded-full hover:bg-pink-200 transition duration-300 ease-in-out
            ${running ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
            disabled={running}
            onClick={() => {
              if (mode === "focus") setTime(minutes * 60);
              else if (mode === "shortBreak") setTime(sbreak * 60);
              else if (mode === "longBreak") setTime(lbreak * 60);
              setRunning(false);
            }}
          >
            <Icon icon="ic:round-replay" className="w-10 h-10" />
          </button>
        </div>
        {settings && (
          <div className="absolute inset-10 z-20 bg-pink-300/70 backdrop-blur-md shadow-lg rounded-3xl p-6 flex flex-col justify-center items-center gap-10">
            <button
              className="absolute left-10 top-10 bg-pink-100 text-pink-500 shadow-md rounded-full p-4 hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
              onClick={() => {
                showSettings(false);
                if (mode === "focus") setTime(minutes * 60);
                else if (mode === "shortBreak") setTime(sbreak * 60);
                else if (mode === "longBreak") setTime(lbreak * 60);
              }}
            >
              <Icon icon="mingcute:close-fill" className="w-10 h-10" />
            </button>
            <PomodoroSettings
              title="Set Focus Time"
              value={minutes}
              setValue={setMinutes}
            />
            <PomodoroSettings
              title="Set Short Break"
              value={sbreak}
              setValue={setSbreak}
            />
            <PomodoroSettings
              title="Set Long Break"
              value={lbreak}
              setValue={setLbreak}
            />
            <PomodoroSettings
              title="Set Laps"
              value={laps}
              setValue={setLaps}
            />
            <PomodoroSettings
              title="Set Goal"
              value={goal}
              setValue={setGoal}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Pomodoro;
