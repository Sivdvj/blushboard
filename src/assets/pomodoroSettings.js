function PomodoroSettings({ title, value, setValue }) {
  return (
    <div className="flex justify-center gap-6">
      <h1 className="text-3xl font-extrabold text-pink-500">{title}</h1>
      <div className="flex gap-6 items-center">
        <button onClick={() => setValue((prev) => Math.max(1, prev - 1))}>
          -
        </button>
        <div>{value}</div>
        <button onClick={() => setValue((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
}
export default PomodoroSettings;
