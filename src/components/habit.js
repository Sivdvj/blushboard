import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";

function HabitTracker() {
  let navigate = useNavigate();

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
        deletedAt: null,
        progress: { [monthKey]: Array(daysInMonth).fill(false) },
      },
    ];
    setHabit(updatedHabit);
    setName("");
  };

  let deleteHabit = (id) => {
    setHabit((prev) =>
      prev.map((h, i) => (i === id ? { ...h, deletedAt: { month, year } } : h)),
    );
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

  let activeHabits = habit.filter((h) => {
    if (
      year < h.createdAt.year ||
      (year === h.createdAt.year && month < h.createdAt.month)
    )
      return false;

    if (
      h.deletedAt &&
      (year > h.deletedAt.year ||
        (year === h.deletedAt.year && month >= h.deletedAt.month))
    )
      return false;

    return true;
  }).length;

  let totalChecks = 0;
  let completedChecks = 0;

  habit.forEach((h) => {
    if (
      year < h.createdAt.year ||
      (year === h.createdAt.year && month < h.createdAt.month)
    )
      return;

    if (
      h.deletedAt &&
      (year > h.deletedAt.year ||
        (year === h.deletedAt.year && month >= h.deletedAt.month))
    )
      return;

    (h.progress[monthKey] || []).forEach((d, dayid) => {
      let beforeCreation =
        year === h.createdAt.year &&
        month === h.createdAt.month &&
        dayid + 1 < h.createdAt.day;
      if (beforeCreation) return;
      totalChecks++;
      if (d) {
        completedChecks++;
      }
    });
  });

  let perfectDays = 0;
  for (let dayid = 0; dayid < daysInMonth; dayid++) {
    let totalActive = 0;
    let totalCompleted = 0;

    habit.forEach((h) => {
      if (
        year < h.createdAt.year ||
        (year === h.createdAt.year && month < h.createdAt.month)
      )
        return;

      if (
        h.deletedAt &&
        (year > h.deletedAt.year ||
          (year === h.deletedAt.year && month >= h.deletedAt.month))
      )
        return;

      let beforeCreation =
        year === h.createdAt.year &&
        month === h.createdAt.month &&
        dayid + 1 < h.createdAt.day;
      if (beforeCreation) return;
      totalActive++;
      if (h.progress[monthKey]?.[dayid]) {
        totalCompleted++;
      }
    });

    if (totalActive > 0 && totalActive === totalCompleted) perfectDays++;
  }

  return (
    <div className="absolute z-0 bg-pink-200 inset-0">
      <div className="relative flex flex-col gap-6 h-screen justify-start pt-72 items-center z-10">
        <button
          className="p-4 rounded-full shadow-md absolute left-10 top-10 bg-pink-100 text-pink-500 hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
          onClick={() => navigate("/")}
        >
          <Icon icon="ph:flower-fill" className="w-10 h-10" />
        </button>

        <div className="absolute top-14 right-40 w-80 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
          <h3 className="text-pink-400 text-2xl font-bold mb-4 text-center tracking-wide">
            Monthly Glance
          </h3>

          <div className="px-4 flex flex-col gap-3 text-sm text-pink-500 font-bold uppercase tracking-wider">
            <div className="flex justify-between">
              <p className="flex gap-2 items-center">
                <Icon icon="tabler:flower-filled" className="w-4 h-4" /> Habits:
              </p>
              <p>{activeHabits}</p>
            </div>
            <div className="flex justify-between">
              <p className="flex gap-2 items-center">
                <Icon icon="tabler:flower-filled" className="w-4 h-4" />
                Completion:
              </p>
              <p>
                {completedChecks} / {totalChecks}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="flex gap-2 items-center">
                <Icon icon="tabler:flower-filled" className="w-4 h-4" />
                Perfect Days:
              </p>
              <p>{perfectDays}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-20 flex flex-col gap-10 items-center justify-center">
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
            <h2 className="text-4xl font-bold text-pink-500 drop-shadow-md w-80 text-center">
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
        <div className="w-[85%] max-h-[95%] overflow-y-auto bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-8 flex flex-col gap-6 [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-pink-400/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-pink-500/50 [&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding">
          <div className="flex gap-10 items-center">
            <div className="w-[20%]"></div>

            <div className="flex flex-1 gap-4 items-center justify-start">
              {Array.from({ length: daysInMonth }, (_, i) => {
                let isToday =
                  i + 1 === new Date().getDate() &&
                  month === currentMonth &&
                  year === currentyear;
                return (
                  <div key={i} className="flex items-center justify-center">
                    <div
                      className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full text-pink-400 ${isToday ? "bg-pink-300 shadow-md" : "w-5 h-5"}`}
                    >
                      {i + 1}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-12 text-center text-xs font-bold text-pink-500 uppercase drop-shadow-sm">
              Done
            </div>
          </div>
          {habit.map((h, id) => {
            if (
              year < h.createdAt.year ||
              (year === h.createdAt.year && month < h.createdAt.month)
            ) {
              return null;
            }

            if (
              h.deletedAt &&
              (year > h.deletedAt.year ||
                (year === h.deletedAt.year && month >= h.deletedAt.month))
            ) {
              return null;
            }

            let validDays = (h.progress[monthKey] || []).filter((_, i) => {
              let beforeCreation =
                year === h.createdAt.year &&
                month === h.createdAt.month &&
                i + 1 < h.createdAt.day;

              return !beforeCreation;
            });

            let completedDays = validDays.filter((d) => d).length;

            let percentage =
              validDays.length === 0
                ? 0
                : Math.round((completedDays / validDays.length) * 100);

            return (
              <div key={id} className="flex gap-10 w-full items-center">
                <div className="flex w-[20%] justify-between items-center">
                  <button
                    onClick={() => deleteHabit(id)}
                    className="p-2 rounded-full shadow-md bg-pink-100 text-pink-500 hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
                  >
                    <Icon icon="mingcute:delete-2-line" className="w-6 h-6" />
                  </button>
                  <p className="text-pink-500 drop-shadow-md text-xl font-bold capitalize">
                    {h.name}
                  </p>
                </div>
                <div className="flex flex-1 gap-4 items-center justify-start">
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
                <div className="w-12 flex justify-center">
                  <p className="text-pink-400 font-bold text-lg drop-shadow-sm">
                    {percentage}%
                  </p>
                </div>
              </div>
            );
          })}

          {habit.length > 0 && (
            <div className="flex gap-10 items-center mt-2 pt-4 pb-8 px-8 -mx-8 -mb-8 border-t-2 border-white/40 sticky -bottom-8 bg-pink-200 backdrop-blur-md z-10">
              <div className="w-[20%] justify-end flex flex-col gap-2">
                <p className="text-pink-500/80 drop-shadow-sm text-sm font-bold uppercase tracking-wider">
                  Completed
                </p>
                <p className="text-pink-500/80 drop-shadow-sm text-sm font-bold uppercase tracking-wider">
                  Not Completed
                </p>
              </div>
              <div className="flex flex-1 gap-4 items-center justify-start">
                {Array.from({ length: daysInMonth }, (_, dayid) => {
                  let totalActive = 0;
                  let totalCompleted = 0;

                  habit.forEach((h) => {
                    if (
                      year < h.createdAt.year ||
                      (year === h.createdAt.year && month < h.createdAt.month)
                    )
                      return;

                    if (
                      h.deletedAt &&
                      (year > h.deletedAt.year ||
                        (year === h.deletedAt.year &&
                          month >= h.deletedAt.month))
                    )
                      return;

                    if (
                      year === h.createdAt.year &&
                      month === h.createdAt.month &&
                      dayid + 1 < h.createdAt.day
                    )
                      return;
                    totalActive++;
                    if (h.progress[monthKey]?.[dayid]) {
                      totalCompleted++;
                    }
                  });

                  if (totalActive === 0) {
                    return (
                      <div
                        key={dayid}
                        className="w-5 h-5 flex items-center justify-center text-md font-bold text-pink-400/40"
                      >
                        -
                      </div>
                    );
                  }

                  return (
                    <div
                      key={dayid}
                      className="w-5 h-5 flex flex-col gap-2 items-center justify-center text-sm font-bold text-pink-500/80"
                    >
                      <p>{totalCompleted}</p>
                      <p>{totalActive - totalCompleted}</p>
                    </div>
                  );
                })}
              </div>
              <div className="w-12"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HabitTracker;
