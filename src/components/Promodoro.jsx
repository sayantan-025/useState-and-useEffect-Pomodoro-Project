import React, { useState, useEffect } from "react";

const App = () => {
  const [workDuration, setWorkDuration] = useState(25); // Default: 25 minutes
  const [breakDuration, setBreakDuration] = useState(5); // Default: 5 minutes
  const [workSecond, setWorkSecond] = useState(1500); // 25 minutes in seconds
  const [breakSecond, setBreakSecond] = useState(300); // 5 minutes in seconds
  const [flag, setFlag] = useState(false);
  const [type, setType] = useState("Work");

  useEffect(() => {
    let timer;
    if (flag) {
      timer = setTimeout(() => {
        if (type === "Work") {
          if (workSecond > 0) {
            setWorkSecond((prev) => prev - 1);
          } else {
            alert("Time for a break!");
            setType("Break");
            setBreakSecond(breakDuration * 60);
          }
        } else if (type === "Break") {
          if (breakSecond > 0) {
            setBreakSecond((prev) => prev - 1);
          } else {
            alert("Back to work!");
            setType("Work");
            setWorkSecond(workDuration * 60);
          }
        }
      }, 1000);
    }

    return () => clearTimeout(timer); // Cleanup timer
  }, [flag, type, workSecond, breakSecond, workDuration, breakDuration]);

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const handleReset = () => {
    setFlag(false);
    setType("Work");
    setWorkSecond(workDuration * 60);
    setBreakSecond(breakDuration * 60);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorkSecond(workDuration * 60);
    setBreakSecond(breakDuration * 60);
  };

  return (
    <div className="app">
      <h1>Pomodoro Timer</h1>

      <div className="timer-display">
        <h2>{type} Time</h2>
        <p>
          {type === "Work" ? formatTime(workSecond) : formatTime(breakSecond)}
        </p>
      </div>

      <div className="controls">
        <button onClick={() => setFlag(true)} disabled={flag}>
          Start
        </button>
        <button onClick={() => setFlag(false)} disabled={!flag}>
          Pause
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="duration-settings">
        <form onSubmit={handleSubmit}>
          <label>
            Work Duration (minutes):
            <input
              type="number"
              min="1"
              value={workDuration}
              onChange={(e) => setWorkDuration(Number(e.target.value))}
              disabled={flag}
            />
          </label>
          <label>
            Break Duration (minutes):
            <input
              type="number"
              min="1"
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
              disabled={flag}
            />
          </label>
          <button className="set-button" type="submit" disabled={flag}>
            Set
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
