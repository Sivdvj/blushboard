import Header from "./components/header";
import Events from "./components/events";
import Pomodoro from "./components/pomodoro";
import Reminder from "./components/reminder";
import HabitTracker from "./components/habit";
function App() {
  return (
    <div className="App">
      <Header />
      <Events />
      <Pomodoro />
      <Reminder />
      <HabitTracker />
    </div>
  );
}

export default App;
