import { useEffect, useState } from "react";
import "./ProgressBar.css";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setProgress(50);
    }, 500);
  }, [progress]);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{
          transform: `translateX(${progress - 100}%)`,
          color: progress < 4 ? "black" : "white",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemax="100"
        aria-valuemin="0"
      >
        {progress}%
      </div>
    </div>
  );
}
