import { useEffect, useState } from "react";

function Reminder({ goto }) {
  let [reminder, setReminder] = useState(() => {
    return JSON.parse(localStorage.getItem("reminder")) || [];
  });
  let [name, setName] = useState("");

  useEffect(() => {
    localStorage.setItem("reminder", JSON.stringify(reminder));
  }, [reminder]);

  let addReminder = () => {
    if (!name) return;
    let newReminder = { id: Date.now(), name };
    setReminder([...reminder, newReminder]);
    setName("");
  };

  let deleteReminder = (id) => {
    let updatedReminder = reminder.filter((e) => e.id !== id);
    setReminder(updatedReminder);
  };

  return (
    <div>
      <h2>Reminders</h2>
      <button onClick={() => goto("home")}>Back</button>

      <input
        type="text"
        placeholder="Enter reminder"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addReminder}>Add</button>
      {reminder.map((e) => (
        <div key={e.id}>
          <p>{e.name}</p>
          <button onClick={() => deleteReminder(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default Reminder;
