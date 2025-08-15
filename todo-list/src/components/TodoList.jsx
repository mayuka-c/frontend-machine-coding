import { useState } from "react";
import "./TodoList.css";

export function TodoList() {
  const [todoItems, setTodoItems] = useState([]);
  const [text, setText] = useState("");

  const handleAddItem = () => {
    if (text.trim() === "") return;

    setTodoItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(), // unique id using Web Crypto API
        text: text.trim(),
        completed: false,
      },
    ]);
    setText("");
  };

  const handleReset = () => {
    setTodoItems([]);
  };

  const handleDeleteItem = (id) => {
    setTodoItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id) => {
    if (text.trim() === "") return;
    setTodoItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: text } : item))
    );
  };

  const toggleCompleted = (id) => {
    setTodoItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="todo-container">
      <h1 className="heading">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-text"
        />
        <button onClick={handleAddItem} className="button-primary add-button">
          Add
        </button>
        <button onClick={handleReset} className="button-primary reset-button">
          Reset
        </button>
      </div>
      <ul className="todo-items-container">
        {todoItems.map((item) => {
          return (
            <li key={item.id} className="todo-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(item.id)}
                className="input-text"
              />
              <span className={item.completed ? "strikeThrough" : ""}>
                {item.text}
              </span>
              <button
                onClick={() => {
                  handleUpdateItem(item.id);
                }}
                className="button-primary update-button"
              >
                Update
              </button>
              <button
                onClick={() => {
                  handleDeleteItem(item.id);
                }}
                className="button-primary delete-button"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
