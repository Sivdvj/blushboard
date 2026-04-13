import { useState } from "react";

function Events() {
  let [date, setDate] = useState("");
  let [name, setName] = useState("");
  let [event, setEvent] = useState([]);

  let addEvent = () => {
    if (!name || !date) return;

    let newEvent = { name, date };
    console.log([...event, newEvent]);
    setEvent([...event, newEvent]);
    setName("");
    setDate("");
  };

  let countDays = (d) => {
    let today = new Date();
    let eventDate = new Date(d);
    let diff = eventDate - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      <h2>Events</h2>
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

      {event.map((e, i) => {
        let daysLeft = countDays(e.date);
        return (
          <div key={i}>
            <p>{e.name}</p>
            <p>{e.date}</p>
            <p>
              {daysLeft > 0
                ? `${daysLeft} days left`
                : daysLeft === 0
                  ? "Today"
                  : "Already passed"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Events;
