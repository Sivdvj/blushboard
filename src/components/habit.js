import { useState, useEffect } from "react";

function HabitTracker() {
  let [habit, setHabit] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("habits")) || [
        { name: "Drink Water", days: [false, false, false] },
        { name: "DSA", days: [false, false, false] },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habit));
  }, [habit]);

  let toggleDay = (id, dayid) => {
    let updatedHabits = habit.map((h, i) => {
      if (i !== id) return h;

      return {
        ...h,
        days: h.days.map((d, j) => (j === dayid ? !d : d)),
      };
    });

    setHabit(updatedHabits);
  };
  return (
    <div>
      <h2>Habit Tracker</h2>
      {habit.map((h, id) => (
        <div key={id}>
          <p>{h.name}</p>
          {h.days.map((d, dayid) => (
            <input
              key="dayid"
              type="checkbox"
              checked={d}
              onChange={() => toggleDay(id, dayid)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default HabitTracker;
