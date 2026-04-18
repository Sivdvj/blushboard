import Header from "./components/header";
import Events from "./components/events";
import Pomodoro from "./components/pomodoro";
import Reminder from "./components/reminder";
function App() {
  return (
    <div className="App">
      <Header />
      <Events />
      <Pomodoro />
      <Reminder />
    </div>
  );
}

export default App;
