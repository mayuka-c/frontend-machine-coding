import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "./OtpInput.css";

const OTP_DIGITS_COUNT = 6;

export function OtpInput() {
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill("")
  );
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleInputChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    if (e.target.value.length > 1) return;
    setInputArr((prev) =>
      prev.map((value, i) => (i === index ? e.target.value : value))
    );
    e.target.value.trim() && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  const handleReset = () => {
    setInputArr(new Array(OTP_DIGITS_COUNT).fill(""));
    refArr.current[0]?.focus();
  };

  return (
    <div className="otp-container">
      <h1 style={{ color: "green" }}>Validate OTP</h1>
      <div className="input-container">
        {inputArr.map((item, index) => (
          <input
            key={index}
            type="text"
            className="otp-input"
            value={item}
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
          />
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
