import { useState, useEffect } from "react";

function Events({ goto }) {
  let [date, setDate] = useState("");
  let [name, setName] = useState("");
  let [event, setEvent] = useState(() => {
    return JSON.parse(localStorage.getItem("events")) || [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(event));
  }, [event]);

  let addEvent = () => {
    if (!name || !date) return;

    let newEvent = { id: Date.now(), name, date };
    let updatedEvents = [...event, newEvent];
    setEvent(updatedEvents);
    setName("");
    setDate("");
  };

  let countDays = (d) => {
    let today = new Date();
    let eventDate = new Date(d);
    let diff = eventDate - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  let deleteEvent = (id) => {
    const updatedEvents = event.filter((e) => e.id !== id);
    setEvent(updatedEvents);
  };

  return (
    <div>
      <h2>Events</h2>
      <button onClick={() => goto("home")}>Back</button>

      <input
        type="text"
        placeholder="Enter event name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Enter date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={addEvent}>Add</button>

      {event.map((e) => {
        let daysLeft = countDays(e.date);
        return (
          <div key={e.id}>
            <p>{e.name}</p>
            <p>{e.date}</p>
            <p>
              {daysLeft > 0
                ? `${daysLeft} days left`
                : daysLeft === 0
                  ? "Today"
                  : "Already passed"}
            </p>
            <button onClick={() => deleteEvent(e.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Events;
