import { useRef, useState } from "react";

const TimeFactors = {
  Hours: "hh",
  Minutes: "mm",
  Seconds: "ss",
  MilliSeconds: "ms",
};

const Config = {
  [TimeFactors.Hours]: {
    value: "",
    factor: 60 * 60 * 1000,
    placeholder: "HH",
  },
  [TimeFactors.Minutes]: {
    value: "",
    factor: 60 * 1000,
    placeholder: "MM",
  },
  [TimeFactors.Seconds]: {
    value: "",
    factor: 1000,
    placeholder: "SS",
  },
};

const OrderOfTime = [
  TimeFactors.Hours,
  TimeFactors.Minutes,
  TimeFactors.Seconds,
];

export function Timer() {
  const [config, setConfig] = useState(structuredClone(Config));
  const [time, setTime] = useState(0);
  const [timerOver, setTimerOver] = useState(false);

  const intervalRef = useRef(null);
  const remainingTimeRef = useRef(0); // Renamed from timeSpentRef for clarity

  const handleChange = (e, orderKey) => {
    const newConfig = structuredClone(config);
    newConfig[orderKey].value = e.target.value;
    setConfig(newConfig);
  };

  function startAgain() {
    setTimerOver(false);
    handleReset();
  }

  function normalizeConfigValues() {
    const normalizedConfig = structuredClone(config);

    // Normalize seconds to minutes
    if (normalizedConfig[TimeFactors.Seconds].value >= 60) {
      const extraMinutes = Math.floor(normalizedConfig[TimeFactors.Seconds].value / 60);
      normalizedConfig[TimeFactors.Seconds].value %= 60;
      normalizedConfig[TimeFactors.Minutes].value =
        Number(normalizedConfig[TimeFactors.Minutes].value) + extraMinutes;
    }

    // Normalize minutes to hours
    if (normalizedConfig[TimeFactors.Minutes].value >= 60) {
      const extraHours = Math.floor(normalizedConfig[TimeFactors.Minutes].value / 60);
      normalizedConfig[TimeFactors.Minutes].value %= 60;
      normalizedConfig[TimeFactors.Hours].value =
        Number(normalizedConfig[TimeFactors.Hours].value) + extraHours;
    }

    return normalizedConfig;
  }

  function handleStart() {
    // Prevent multiple intervals by checking if one is already running
    if (intervalRef.current) {
      return; // Do nothing if the timer is already running
    }

    let totalTimeInMs = remainingTimeRef.current || 0; // Use remaining time if available

    if (totalTimeInMs === 0) {
      const normalizedConfig = normalizeConfigValues();
      OrderOfTime.forEach((key) => {
        const { value, factor } = normalizedConfig[key];
        if (value && !isNaN(value)) {
          totalTimeInMs += Number(value) * factor;
        }
      });
      remainingTimeRef.current = Date.now() + totalTimeInMs;
    } else {
      remainingTimeRef.current = Date.now() + totalTimeInMs;
    }

    intervalRef.current = setInterval(() => {
      const newValue = remainingTimeRef.current - new Date().getTime();

      if (newValue <= 0) {
        setTimerOver(true);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else {
        setTime(() => {
          return newValue;
        });
      }
    }, 10);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    remainingTimeRef.current = time; // Store the remaining time when paused
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    remainingTimeRef.current = 0; // Reset remaining time
    setConfig(structuredClone(Config));
  }

  function formatTime() {
    const pad = (num) => String(num).padStart(2, "0");

    const ms = Math.floor((time % 1000) / 10);
    const ss = Math.floor((time / 1000) % 60);
    const mm = Math.floor((time / (60 * 1000)) % 60);
    const hh = Math.floor((time / (60 * 60 * 1000)) % 24);

    return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ms)}`;
  }

  if (timerOver) {
    return (
      <div>
        TIMES UP !!!<button onClick={startAgain}>Start Again</button>
      </div>
    );
  }

  return (
    <div className="timer">
      <div className="text-fields">
        {OrderOfTime.map((orderKey) => {
          const data = config[orderKey];
          return (
            <div key={orderKey}>
              <input
                type="text"
                placeholder={data.placeholder}
                value={data.value}
                onChange={(e) => {
                  handleChange(e, orderKey);
                }}
                list={`${orderKey}-datalist`}
              />
              <datalist id={`${orderKey}-datalist`}>
                {orderKey === TimeFactors.Hours && (
                  <>
                    <option value="1" />
                    <option value="2" />
                    <option value="3" />
                    <option value="4" />
                    <option value="5" />
                  </>
                )}
                {orderKey === TimeFactors.Minutes && (
                  <>
                    <option value="10" />
                    <option value="20" />
                    <option value="30" />
                    <option value="40" />
                    <option value="50" />
                  </>
                )}
                {orderKey === TimeFactors.Seconds && (
                  <>
                    <option value="15" />
                    <option value="30" />
                    <option value="45" />
                    <option value="50" />
                    <option value="55" />
                  </>
                )}
              </datalist>
            </div>
          );
        })}
      </div>
      <span className="time">{formatTime()}</span>
      <div className="buttons">
        <button onClick={handleStart}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
