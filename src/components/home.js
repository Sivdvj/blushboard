function Home({ goto }) {
  return (
    <div className="flex flex-col bg-gradient-to-br from-pink-100 to-pink-300 items-center justify-center h-screen">
      <h1 className="text-6xl font-extrabold mb-10 text-pink-500 transform hover:scale-125 transition duration-300 ease-in-out">
        BlushBoard
      </h1>
      <p className="text-gray-600 text-lg font-bold mb-10">
        Your productivity space
      </p>
      <div className="flex gap-4 font-bold text-lg">
        <button
          className="shadow-md bg-pink-100/70 backdrop-blur-md text-pink-500 p-4 rounded-2xl hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
          onClick={() => goto("events")}
        >
          Events
        </button>
        <button
          className="shadow-md bg-pink-100/70 backdrop-blur-md text-pink-500 p-4 rounded-2xl hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
          onClick={() => goto("pomodoro")}
        >
          Pomodoro
        </button>
        <button
          className="shadow-md bg-pink-100/70 backdrop-blur-md text-pink-500 p-4 rounded-2xl hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
          onClick={() => goto("reminder")}
        >
          Reminder
        </button>
        <button
          className="shadow-md bg-pink-100/70 backdrop-blur-md text-pink-500 p-4 rounded-2xl hover:bg-pink-200 hover:scale-110 transition duration-300 ease-in-out"
          onClick={() => goto("tracker")}
        >
          Tracker
        </button>
      </div>
    </div>
  );
}

export default Home;
