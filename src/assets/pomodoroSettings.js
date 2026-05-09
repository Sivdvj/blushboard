import { Icon } from "@iconify/react";

function PomodoroSettings({ title, value, setValue }) {
  return (
    <div className="flex gap-16 items-center w-full">
      <h1 className="text-3xl font-extrabold text-pink-500 flex-1 text-right">
        {title}
      </h1>
      <div className="flex gap-6 items-center flex-1 justify-start">
        <button onClick={() => setValue((prev) => Math.max(1, prev - 1))}>
          <Icon
            icon="fluent-emoji-high-contrast:minus"
            className="w-12 h-12 shadow-md rounded-full p-2 bg-pink-100/70 text-pink-500 hover:bg-pink-200 hover:scale-105 transition ease-in-out"
          />
        </button>
        <div className="text-pink-500/90 font-bold text-6xl drop-shadow-sm">
          {value < 10 ? `0${value}` : value}
        </div>
        <button onClick={() => setValue((prev) => prev + 1)}>
          <Icon
            icon="fluent-emoji-high-contrast:plus"
            className="w-12 h-12 shadow-md rounded-full p-2 bg-pink-100/70 text-pink-500 hover:bg-pink-200 hover:scale-105 transition ease-in-out"
          />
        </button>
      </div>
    </div>
  );
}
export default PomodoroSettings;
