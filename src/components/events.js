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
        type="text"
        placeholder="Enter date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={addEvent}>Add</button>

      {event.map((e, i) => (
        <div key={i}>
          <p>{e.name}</p>
          <p>{e.date}</p>
        </div>
      ))}
    </div>
  );
}

export default Events;
