import { useState, useEffect } from "react";

function HabitTracker({ goto }) {
  let currentMonth = new Date().getMonth();
  let currentyear = new Date().getFullYear();

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
    <div>
      <h2>Habit Tracker</h2>
      <button
        onClick={() => {
          if (month === 0) {
            setMonth(11);
            setYear((prev) => prev - 1);
          } else {
            setMonth((prev) => prev - 1);
          }
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (month === 11) {
            setMonth(0);
            setYear((prev) => prev + 1);
          } else {
            setMonth((prev) => prev + 1);
          }
        }}
      >
        Next
      </button>
      <button onClick={() => goto("home")}>Back</button>
      <input
        type="text"
        placeholder="Enter habit"
        value={hname}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addHabit}>Add</button>
      <h2>{month}</h2>
      {habit.map((h, id) => {
        if (
          year < h.createdAt.year ||
          (year === h.createdAt.year && month < h.createdAt.month)
        ) {
          return null;
        }
        return (
          <div key={id}>
            <p>{h.name}</p>
            {(h.progress[monthKey] || []).map((d, dayid) => {
              let beforeCreation =
                year === h.createdAt.year &&
                month === h.createdAt.month &&
                dayid + 1 < h.createdAt.day;
              if (beforeCreation) {
                return <input key={dayid} type="checkbox" disabled />;
              }
              return (
                <input
                  key={dayid}
                  type="checkbox"
                  checked={d}
                  onChange={() => toggleDay(id, dayid)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default HabitTracker;
