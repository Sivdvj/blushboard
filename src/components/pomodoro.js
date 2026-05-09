import { useState, useEffect, useRef } from "react";
import Animation from "../assets/animations";
import { Icon } from "@iconify/react";

function Pomodoro({ goto }) {
  let firstLoad = useRef(true);

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
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    if (mode === "focus") {
      setTime(minutes * 60);
    } else if (mode === "shortBreak") {
      setTime(sbreak * 60);
    } else if (mode === "longBreak") {
      setTime(lbreak * 60);
    }
  }, [mode, minutes, sbreak, lbreak]);

  useEffect(() => {
    if (!running) return;
    let interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          if (mode === "focus") {
            setTotalLaps((prev) => {
              let updatedLaps = prev + 1;
              if (updatedLaps === goal) {
                setTotalLaps(0); // TODO: what to do after 8 laps
              }
              if (updatedLaps % laps === 0) {
                setMode("longBreak");
              } else {
                setMode("shortBreak");
              }
              return updatedLaps;
            });
          } else {
            setMode("focus");
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, laps, mode, goal]);

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
          <h3 className="text-pink-500 font-extrabold text-4xl">
            {tlaps} / {goal}
          </h3>
        </div>
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
              onClick={() => showSettings(false)}
            >
              <Icon icon="mingcute:close-fill" className="w-10 h-10" />
            </button>
            <h1 className="text-5xl font-extrabold text-pink-500">
              Set Focus Time
            </h1>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="w-40 mt-4 px-6 py-3 rounded-2xl outline-none bg-pink-100/70 text-pink-500 hover:scale-110 transition"
            />
            <h1 className="text-5xl font-extrabold text-pink-500">
              Set Short Break
            </h1>
            <input
              type="number"
              value={sbreak}
              onChange={(e) => setSbreak(Number(e.target.value))}
              className="w-40 mt-4 px-6 py-3 rounded-2xl outline-none bg-pink-100/70 text-pink-500 hover:scale-110 transition"
            />
            <h1 className="text-5xl font-extrabold text-pink-500">
              Set Long Break
            </h1>
            <input
              type="number"
              value={lbreak}
              onChange={(e) => setLbreak(Number(e.target.value))}
              className="w-40 mt-4 px-6 py-3 rounded-2xl outline-none bg-pink-100/70 text-pink-500 hover:scale-110 transition"
            />
            <h1 className="text-5xl font-extrabold text-pink-500">Set laps</h1>
            <input
              type="number"
              value={laps}
              onChange={(e) => setLaps(e.target.value)}
              className="w-40 mt-4 px-6 py-3 rounded-2xl outline-none bg-pink-100/70 text-pink-500 hover:scale-110 transition"
            />
            <h1 className="text-5xl font-extrabold text-pink-500">
              Set Daily Goal
            </h1>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-40 mt-4 px-6 py-3 rounded-2xl outline-none bg-pink-100/70 text-pink-500 hover:scale-110 transition"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Pomodoro;
