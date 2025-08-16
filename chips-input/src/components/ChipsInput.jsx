import { useState } from "react";

export function ChipsInput() {
  const [inputText, setInputText] = useState("");
  const [chips, setChips] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      setChips((prev) => [...prev, inputText]);
      setInputText("");
    }
  };

  const handleDelete = (index) => {
    setChips((prev) => prev.filter((_, i) => index !== i));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "40px 0",
        justifyContent: "center",
      }}
    >
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type a chip and press tag"
        style={{
          padding: "8px",
          width: "200px",
          border: "1px solid grey",
          borderRadius: "5px",
          backgroundColor: "#f5f5f5",
        }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div style={{ display: "flex", flexWrap: "wrap", width: "50%" }}>
        {chips.map((chip, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#d3d3d3",
              margin: "10px",
              padding: "5px",
              color: "black",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            <span>{chip}</span>
            <button
              style={{ color: "red" }}
              onClick={() => handleDelete(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
