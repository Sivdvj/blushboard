import Home from "./components/home";
import Events from "./components/events";
import Pomodoro from "./components/pomodoro";
import Reminder from "./components/reminder";
import HabitTracker from "./components/habit";
import { useState } from "react";
function App() {
  let [page, goto] = useState("home");

  return (
    <div className="App">
      {page === "home" && <Home goto={goto} />}
      {page === "events" && <Events goto={goto} />}
      {page === "pomodoro" && <Pomodoro goto={goto} />}
      {page === "reminder" && <Reminder goto={goto} />}
      {page === "tracker" && <HabitTracker goto={goto} />}
    </div>
  );
}

export default App;
