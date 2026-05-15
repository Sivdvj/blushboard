import Home from "./components/home";
import Events from "./components/events";
import Pomodoro from "./components/pomodoro";
import Reminder from "./components/reminder";
import HabitTracker from "./components/habit";
import { Route, Routes } from "react-router";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pomodoro" element={<Pomodoro />} />
      <Route path="/tracker" element={<HabitTracker />} />
      <Route path="/events" element={<Events />} />
      <Route path="/reminder" element={<Reminder />} />
    </Routes>
  );
}

export default App;
