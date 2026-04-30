import { useState, useEffect } from "react";

function HabitTracker({ goto }) {
  const daysInMonth = 30;
  let [hname, setName] = useState("");
  let [habit, setHabit] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("habits")) || [
        { name: "Drink Water", days: Array(daysInMonth).fill(false) },
        { name: "DSA", days: Array(daysInMonth).fill(false) },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habit));
  }, [habit]);

  let addHabit = () => {
    if (!hname) return;
    let updatedHabit = [
      ...habit,
      { name: hname, days: Array(daysInMonth).fill(false) },
    ];
    setHabit(updatedHabit);
    setName("");
  };
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
      <button onClick={() => goto("home")}>Back</button>
      <input
        type="text"
        placeholder="Enter habit"
        value={hname}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addHabit}>Add</button>
      {habit.map((h, id) => (
        <div key={id}>
          <p>{h.name}</p>
          {h.days.map((d, dayid) => (
            <input
              key={dayid}
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
