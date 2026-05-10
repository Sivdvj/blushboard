import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
function HabitTracker({ goto }) {
  let currentMonth = new Date().getMonth();
  let currentyear = new Date().getFullYear();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let [month, setMonth] = useState(new Date().getMonth());
  let [year, setYear] = useState(new Date().getFullYear());
  let [hname, setName] = useState("");
  let monthKey = `${year}-${month}`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let [habit, setHabit] = useState(() => {
    return JSON.parse(localStorage.getItem("habits")) || [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habit));
  }, [habit]);

  useEffect(() => {
    setHabit((prev) =>
      prev.map((h) => {
        if (!h.progress[monthKey]) {
          return {
            ...h,
            progress: {
              ...h.progress,
              [monthKey]: Array(daysInMonth).fill(false),
            },
          };
        }
        return h;
      }),
    );
  }, [monthKey, daysInMonth]);

  let createdDay =
    month === currentMonth && year === currentyear ? new Date().getDate() : 1;

  let addHabit = () => {
    if (!hname) return;
    let updatedHabit = [
      ...habit,
      {
        name: hname,
        createdAt: { month: month, year: year, day: createdDay },
        progress: { [monthKey]: Array(daysInMonth).fill(false) },
      },
    ];
    setHabit(updatedHabit);
    setName("");
  };

  let toggleDay = (id, dayid) => {
    let updatedHabits = habit.map((h, i) => {
      if (i !== id) return h;

      return {
        ...h,
        progress: {
          ...h.progress,
          [monthKey]: h.progress[monthKey].map((d, j) =>
            j === dayid ? !d : d,
          ),
        },
      };
    });

    setHabit(updatedHabits);
  };
  return (
    <div className="absolute z-0 bg-pink-200 inset-0">
      <div className="relative flex flex-col gap-6 h-screen justify-center items-center z-10">
        <button
          className="p-4 rounded-full shadow-md absolute left-10 top-10 bg-pink-100 text-pink-500 hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
          onClick={() => goto("home")}
        >
          <Icon icon="ph:flower-fill" className="w-10 h-10" />
        </button>

        <div className="absolute top-20 flex flex-col gap-10 items-center justify-center">
          <h2 className="text-6xl font-extrabold text-pink-500">
            Habit Tracker
          </h2>
          <div className="flex gap-20 items-center justify-center">
            <button
              className="p-2 rounded-full shadow-md bg-pink-100 text-pink-500 hover:bg-pink-200 hover:scale-110 transition duratiion-300 ease-in-out"
              onClick={() => {
                if (month === 0) {
                  setMonth(11);
                  setYear((prev) => prev - 1);
                } else {
                  setMonth((prev) => prev - 1);
                }
              }}
            >
              <Icon icon="ic:round-navigate-before" className="w-12 h-12" />
            </button>
            <h2>
              {months[month]} {year}
            </h2>
            <button
              className="p-2 rounded-full shadow-md bg-pink-100 text-pink-500 hover:bg-pink-200 hover:scale-110 transition duratiion-300 ease-in-out"
              onClick={() => {
                if (month === 11) {
                  setMonth(0);
                  setYear((prev) => prev + 1);
                } else {
                  setMonth((prev) => prev + 1);
                }
              }}
            >
              <Icon icon="ic:round-navigate-next" className="w-12 h-12" />
            </button>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <input
              className="px-6 py-4 text-lg rounded-3xl shadow-md bg-pink-100 text-pink-500 placeholder-pink-300/40 outline-none font-semibold"
              type="text"
              placeholder="Enter habit"
              value={hname}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className=" drop-shadow px-6 py-4 bg-pink-100 text-pink-500 font-semibold text-lg rounded-3xl hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
              onClick={addHabit}
            >
              Add
            </button>
          </div>
        </div>

        {habit.map((h, id) => {
          if (
            year < h.createdAt.year ||
            (year === h.createdAt.year && month < h.createdAt.month)
          ) {
            return null;
          }
          return (
            <div key={id} className="flex gap-10 w-full items-center">
              <div className="flex w-1/4 justify-end">
                <p className="text-pink-500 drop-shadow-md text-xl font-bold capitalize">
                  {h.name}
                </p>
              </div>
              <div className="flex w-3/4 gap-4 items-center justify-start">
                {(h.progress[monthKey] || []).map((d, dayid) => {
                  let beforeCreation =
                    year === h.createdAt.year &&
                    month === h.createdAt.month &&
                    dayid + 1 < h.createdAt.day;
                  if (beforeCreation) {
                    return (
                      <div
                        key={dayid}
                        className="w-5 h-5 rounded-full bg-pink-400 opacity-30"
                      />
                    );
                  }
                  return (
                    <div
                      key={dayid}
                      onClick={() => toggleDay(id, dayid)}
                      className={`w-5 h-5 rounded-full cursor-pointer
                      ${d ? "bg-pink-500 scale-105 shadow-md" : "bg-pink-100 border border-pink-500 hover:bg-pink-400 hover:scale-110 transition duration-300 ease-in-out"}`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitTracker;
